  

from services.gemini_services import analyze_resume
from services.services_parser import extract_text_from_file
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import json
from typing import List

from database import candidates_collection
from bson import ObjectId

from fastapi import HTTPException

from services.gemini_services import analyze_resume
from services.services_parser import extract_text_from_file

app = FastAPI()

# ---------------- CORS ----------------
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173", "http://127.0.0.1:8000/"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://ai-resume-analyser-brown-sigma.vercel.app/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- HOME ----------------
# @app.get("/")
# def home():
#     return {"message": "Resume Analyzer API Running 🚀"}



# @app.post("/upload")
# async def upload_and_analyze_resume(
#     file: UploadFile = File(...)
# ):

#     resume_text = extract_text_from_file(file)

#     with open("questions.json", "r", encoding="utf-8") as f:
#         questions_data = json.load(f)

#     questions_list = questions_data.get("questions", [])

#     questions_text = ""

#     for item in questions_list:
#         questions_text += (
#             f"Category: {item.get('category', 'General')}\n"
#             f"Question: {item.get('question', '')}\n"
#             f"Weight: {item.get('weight', 10)}%\n\n"
#         )

#     result = analyze_resume(
#         resume_text,
#         questions_text
#     )

#     return {
#         "filename": file.filename,
#         "analysis_report": result,
        
        
#     }

@app.get("/")
def home():
    return {"message": "Resume Analyzer API Running 🚀"}


@app.post("/upload")
async def upload_and_analyze_resume(
    file: UploadFile = File(...)
):

    resume_text = extract_text_from_file(file)

    with open("questions.json", "r", encoding="utf-8") as f:
        questions_data = json.load(f)

    questions_list = questions_data.get("questions", [])

    questions_text = ""

    for index, item in enumerate(questions_list, start=1):
        questions_text += (
            f"Question {index}:\n"
            f"Category: {item.get('category', 'General')}\n"
            f"Question: {item.get('question', '')}\n"
            f"Weight: {item.get('weight', 10)}%\n\n"
        )

    # result = analyze_resume(
    #     resume_text,
    #     questions_text
    # )

    # print("QUESTIONS SENT TO GEMINI:")
    # print(questions_text)

    # # Add weight from questions.json to Gemini results
    # if "questions" in result:
    #     for result_item, question_item in zip(
    #         result["questions"],
    #         questions_list
    #     ):
    #         result_item["weight"] = question_item.get("weight", 0)

    # return {
    #     "filename": file.filename,
    #     "analysis_report": result,
    # }
    result = analyze_resume(
        resume_text,
        questions_text
        )

    print("QUESTIONS SENT TO GEMINI:")
    print(questions_text)


# Add weight from questions.json
    if "questions" in result:
        for result_item, question_item in zip(
            result["questions"],
            questions_list
    ):
            result_item["weight"] = question_item.get("weight", 0)


# ---------------- SAVE CANDIDATE TO MONGODB ----------------

    candidate_document = {
        "filename": file.filename,
        "analysis_report": result
}

    insert_result = candidates_collection.insert_one(candidate_document)

    candidate_id = str(insert_result.inserted_id)

    print("Candidate saved:", candidate_id)


# ---------------- SEND RESPONSE TO FRONTEND ----------------

    return {
         "candidate_id": candidate_id,
        "filename": file.filename,
        "analysis_report": result
}

# ADD THESE BELOW /upload

@app.get("/questions")
def get_questions():

    with open("questions.json", "r", encoding="utf-8") as f:
        questions_data = json.load(f)

    return questions_data


@app.post("/save-questions")
async def save_questions(data: dict):

    with open("questions.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    return {
        "message": "Questions saved successfully",
        "data": data
    }
    
@app.get("/candidates")
def get_candidates():
    candidates = list(candidates_collection.find())

    for candidate in candidates:
        candidate["_id"] = str(candidate["_id"])

    return candidates


@app.get("/candidates/{candidate_id}")
def get_candidate(candidate_id: str):
    try:
        candidate = candidates_collection.find_one(
            {"_id": ObjectId(candidate_id)}
        )

        if not candidate:
            raise HTTPException(
                status_code=404,
                detail="Candidate not found"
            )

        candidate["_id"] = str(candidate["_id"])

        return candidate

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
