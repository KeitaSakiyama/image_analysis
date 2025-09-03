from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from io import BytesIO
import pytesseract

app = FastAPI()

# CORS設定（Reactフロントエンドと通信するため）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze/")
async def analyze_image(file: UploadFile = File(...)):
    contents = await file.read()
    try:
        image = Image.open(BytesIO(contents))
    except Exception as e:
        return {"error": f"Cannot open image: {e}"}
    width, height = image.size
    format = image.format
    return {"filename": file.filename, "width": width, "height": height, "format": format}


@app.post("/ocr/")
async def ocr_image(file: UploadFile = File(...), lang: str = Form('eng')):
    """Extract text from the uploaded image using Tesseract.

    lang: Tesseract language code (e.g. 'eng', 'jpn'). Default is 'eng'.
    """
    contents = await file.read()
    try:
        image = Image.open(BytesIO(contents))
    except Exception as e:
        return {"error": f"Cannot open image: {e}"}

    # Convert to RGB for tesseract compatibility
    try:
        if image.mode != "RGB":
            image = image.convert("RGB")
    except Exception as e:
        return {"error": f"Image conversion to RGB failed: {e}"}

    # specify language for pytesseract
    try:
        text = pytesseract.image_to_string(image, lang=lang)
    except Exception as e:
        # common cause: requested language not installed in tesseract
        return {"error": f"OCR failed (language '{lang}' may be missing): {e}"}

    # include metadata so frontend can show size/format alongside OCR text
    try:
        width, height = image.size
        fmt = image.format
    except Exception:
        width = None
        height = None
        fmt = None

    return {"filename": file.filename, "width": width, "height": height, "format": fmt, "text": text}
