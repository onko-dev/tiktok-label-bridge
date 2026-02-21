# TikTok Label Bridge - Logic Specification v1.1

## Goal
Transform a TikTok Shop A4/Letter PDF (595x842 pts) into Thermal-optimized outputs (Label + Packing Slip).

## Phase 1: Document Classification
1. **Input:** PDF from TikTok Seller Center (A4/Letter).
2. **Analysis:** Identify if the document is a "Standalone Label" or an "Integrated Label + Packing Slip".
   - Standalone: Single 4x6 area on A4.
   - Integrated: 4x6 Label area + structured text/grid area (Packing Slip).

## Phase 2: Anchor Point Detection (Vision-Logic)
Instead of fixed coordinates, use "Anchors" to handle layout drift:
1. **USPS Anchor:** Detect the "Service Indicator" box (top-left 'G', 'P', or 'F') and the Intelligent Mail Barcode (IMpb).
2. **UPS Anchor:** Detect the "UPS Shield" logo and the MaxiCode (hexagonal 2D barcode).
3. **Packing Slip Anchor:** Detect the "Order ID" text block and the table grid lines.

## Phase 3: Transformation (The "Surgical Split")
1. **Extraction (Label):**
   - Define Bounding Box based on detected Carrier Anchors.
   - Crop to 4x6 area (typically ~288x432 pts).
2. **Extraction (Packing Slip):**
   - If present, crop the remaining structured data area.
   - Rotate/Scale to fit a secondary 4x6 thermal sheet.
3. **Redaction (Optional Privacy Mode):**
   - Apply blackout masks over `Recipient Name` and `Street Address` fields based on relative coordinates from the "Return Address" anchor.

## Phase 4: Output Rendering
- **Format:** PDF or high-resolution PNG (300 DPI).
- **Optimization:** Flatten layers to ensure zero "hidden text" remains (essential for PII privacy).
- **Batching:** Merge all extracted labels into a single continuous PDF for rapid thermal printing.

## Implementation Details
- **Engine:** `pdf-lib` for structural manipulation.
- **OCR/Detection (Optional/Fallback):** `tesseract.js` or `canvas`-based pixel scanning for logo/barcode anchor confirmation.
