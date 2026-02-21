const { PDFDocument, rgb } = PDFLib;

const dropZone = document.getElementById('drop-zone');
const statusArea = document.getElementById('status-area');

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('border-blue-500');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('border-blue-500');
});

dropZone.addEventListener('drop', async (e) => {
    e.preventDefault();
    dropZone.classList.remove('border-blue-500');
    
    const files = e.dataTransfer.files;
    for (const file of files) {
        if (file.type === 'application/pdf') {
            processFile(file);
        } else {
            addStatus(`Skipping non-PDF: ${file.name}`, 'text-red-400');
        }
    }
});

function addStatus(message, colorClass = 'text-gray-300') {
    const div = document.createElement('div');
    div.className = `p-3 bg-gray-900 rounded border border-gray-700 text-xs font-mono ${colorClass}`;
    div.innerText = `> ${message}`;
    statusArea.prepend(div);
}

async function processFile(file) {
    addStatus(`Ingesting: ${file.name}`);
    
    try {
        const arrayBuffer = await file.arrayBuffer();
        const srcDoc = await PDFDocument.load(arrayBuffer);
        const outDoc = await PDFDocument.create();
        
        // Geometric Constants (Based on Manual Research Ground Truth)
        // Target: 4x6 inches = 288x432 points
        const targetW = 288;
        const targetH = 432;
        
        const pages = srcDoc.getPages();
        for (let i = 0; i < pages.length; i++) {
            const srcPage = pages[i];
            const { width, height } = srcPage.getSize();
            
            // Log original size
            addStatus(`Source Dim: ${Math.round(width)}x${Math.round(height)} pts`);

            // THE SURGICAL CROP (v1.2 Anchor-Point Detection Logic)
            // Phase 1: Scan for Carrier Logo (USPS/UPS/FedEx)
            // Phase 2: Scan for Tracking Barcode (Code 128 / IMpb)
            // Phase 3: Define Bounding Box around high-density zone
            
            // Temporary Implementation (Estimated TikTok A4 quadrant layout)
            const cropX = 40; 
            const cropY = height - 390; 
            const cropW = 515;
            const cropH = 350;

            const newPage = outDoc.addPage([targetW, targetH]);
            
            // Embed and Scale (0.67x)
            const embeddedPage = await outDoc.embedPage(srcPage);
            
            // Draw into 4x6 canvas with transform
            // Scaling logic to fit the 515-point wide label into 288-point canvas
            const scaleFactor = targetW / cropW; 
            
            newPage.drawPage(embeddedPage, {
                x: 0,
                y: 0,
                width: width * scaleFactor,
                height: height * scaleFactor,
                xOffset: -cropX * scaleFactor,
                yOffset: -cropY * scaleFactor
            });

            // PII REDACTION LAYER (v1.3 - Strategic Privacy Hook)
            // Based on User Manual Research PII Target Map
            const redactionColor = rgb(0, 0, 0); // Blackout
            
            // 1. Redact Recipient Area (Middle-Left of the label)
            // Coordinates relative to the NEW 4x6 canvas
            newPage.drawRectangle({
                x: 20, 
                y: 180,
                width: 180,
                height: 60,
                color: redactionColor,
            });

            // 2. Redact Return Address Street (Top-Left)
            newPage.drawRectangle({
                x: 20,
                y: 350,
                width: 120,
                height: 30,
                color: redactionColor,
            });
        }

        const pdfBytes = await outDoc.save();
        download(pdfBytes, `4x6_${file.name}`, "application/pdf");
        addStatus(`SUCCESS: ${file.name} transformed.`, 'text-green-400');
        
    } catch (err) {
        addStatus(`ERROR: ${err.message}`, 'text-red-500');
        console.error(err);
    }
}

function download(data, filename, type) {
    const file = new Blob([data], {type: type});
    const a = document.createElement("a"),
            url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0); 
}
