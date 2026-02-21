/**
 * TikTok Label Bridge - Core Processor v2.0
 * Client-side PDF transformation (A4/Letter -> 4x6 thermal)
 * Uses pdf-lib's embedPage() with bounding box for proper cropping.
 *
 * Carrier crop profiles define the label region on the A4/Letter source.
 * Coordinates are in PDF points (1pt = 1/72 inch), origin at bottom-left.
 */

const CARRIER_PROFILES = {
  usps: {
    name: "USPS (TikTok Shipping)",
    cropBox: { left: 30, bottom: 420, right: 565, top: 800 },
    description: "USPS Ground Advantage / Priority labels from TikTok Seller Center"
  },
  ups: {
    name: "UPS",
    cropBox: { left: 30, bottom: 400, right: 565, top: 800 },
    description: "UPS labels from TikTok Seller Center"
  },
  fedex: {
    name: "FedEx",
    cropBox: { left: 30, bottom: 400, right: 565, top: 800 },
    description: "FedEx labels from TikTok Seller Center"
  },
  auto: {
    name: "Auto-detect",
    cropBox: null,
    description: "Attempts to detect label boundaries automatically"
  }
};

const THERMAL_4x6 = { width: 288, height: 432 }; // 4x6 inches at 72 DPI

function isA4OrLetter(width, height) {
  const a4 = (width > 580 && width < 610 && height > 830 && height < 855);
  const letter = (width > 600 && width < 620 && height > 780 && height < 800);
  const a4Landscape = (height > 580 && height < 610 && width > 830 && width < 855);
  const letterLandscape = (height > 600 && height < 620 && width > 780 && width < 800);
  return a4 || letter || a4Landscape || letterLandscape;
}

function isAlready4x6(width, height) {
  const portrait = (width > 280 && width < 300 && height > 420 && height < 445);
  const landscape = (height > 280 && height < 300 && width > 420 && width < 445);
  return portrait || landscape;
}

function autoCropBox(pageWidth, pageHeight) {
  const centerX = pageWidth / 2;
  const labelWidth = 535;
  const labelHeight = 380;
  return {
    left: centerX - labelWidth / 2,
    bottom: pageHeight - labelHeight - 40,
    right: centerX + labelWidth / 2,
    top: pageHeight - 40
  };
}

async function transformLabel(PDFDocument, srcBytes, carrier = "auto") {
  const srcDoc = await PDFDocument.load(srcBytes, { ignoreEncryption: true });
  const pageCount = srcDoc.getPageCount();
  const results = [];

  for (let i = 0; i < pageCount; i++) {
    const srcPage = srcDoc.getPage(i);
    const { width, height } = srcPage.getSize();

    if (isAlready4x6(width, height)) {
      const passthrough = await PDFDocument.create();
      const [copied] = await passthrough.copyPages(srcDoc, [i]);
      passthrough.addPage(copied);
      results.push({
        index: i,
        status: "passthrough",
        message: "Already 4x6 — no transformation needed",
        bytes: await passthrough.save()
      });
      continue;
    }

    if (!isA4OrLetter(width, height)) {
      results.push({
        index: i,
        status: "skipped",
        message: `Unexpected page size (${Math.round(width)}x${Math.round(height)} pts). Expected A4 or Letter.`,
        bytes: null
      });
      continue;
    }

    const profile = CARRIER_PROFILES[carrier] || CARRIER_PROFILES.auto;
    const crop = profile.cropBox || autoCropBox(width, height);

    const clampedCrop = {
      left: Math.max(0, crop.left),
      bottom: Math.max(0, crop.bottom),
      right: Math.min(width, crop.right),
      top: Math.min(height, crop.top)
    };

    const outDoc = await PDFDocument.create();
    const embedded = await outDoc.embedPage(srcPage, clampedCrop);

    const outPage = outDoc.addPage([THERMAL_4x6.width, THERMAL_4x6.height]);
    const scale = Math.min(
      THERMAL_4x6.width / embedded.width,
      THERMAL_4x6.height / embedded.height
    );
    const drawWidth = embedded.width * scale;
    const drawHeight = embedded.height * scale;
    const x = (THERMAL_4x6.width - drawWidth) / 2;
    const y = (THERMAL_4x6.height - drawHeight) / 2;

    outPage.drawPage(embedded, { x, y, width: drawWidth, height: drawHeight });

    results.push({
      index: i,
      status: "transformed",
      message: `Page ${i + 1}: ${Math.round(width)}x${Math.round(height)} → 4x6`,
      bytes: await outDoc.save()
    });
  }

  return results;
}

async function mergeResults(PDFDocument, results) {
  const merged = await PDFDocument.create();
  for (const r of results) {
    if (!r.bytes) continue;
    const doc = await PDFDocument.load(r.bytes);
    const pages = await merged.copyPages(doc, doc.getPageIndices());
    for (const page of pages) {
      merged.addPage(page);
    }
  }
  return await merged.save();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { transformLabel, mergeResults, CARRIER_PROFILES, THERMAL_4x6 };
}
