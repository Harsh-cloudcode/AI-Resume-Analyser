from fastapi import APIRouter, UploadFile, File, Form
from services.resume_parser import extract_text
from services.gemini_service import analyze_resume

router = APIRouter()

@router.post("/analyze")
async def analyze(
    file: UploadFile = File(...),
    questions: str = Form(...)
):
    resume_text = await extract_text(file)

    result = analyze_resume(resume_text, questions)

    return {
        "status": "success",
        "data": result
    }