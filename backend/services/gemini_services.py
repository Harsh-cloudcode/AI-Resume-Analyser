


import google.generativeai as genai
import json
import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-3.6-flash")


def analyze_resume(resume_text, questions_text):

#     prompt = f"""
# You are an expert ATS Resume Analyzer.

# Resume:
# {resume_text}

# Questions and Evaluation Criteria:
# {questions_text}

# For EACH question:
# 1. Answer using information from the resume.
# 2. Give score out of 100.
# 3. Explain the score.
# 4. Give improvement suggestions.

# Return ONLY valid JSON.
# """


    prompt = f"""
You are an expert ATS Resume Analyzer.

Analyze the following resume:

Resume:
{resume_text}

Evaluation Criteria:
{questions_text}

IMPORTANT RULES:

1. Use ONLY the questions provided under "EXACT EVALUATION QUESTIONS".
2. DO NOT create new questions.
3. DO NOT generate interview questions.
4. DO NOT rewrite or modify the questions.
5. Evaluate EVERY provided question.
6. Return exactly the same number of questions as provided.
7. For every question:
   - Return the exact original question.
   - Provide an answer based ONLY on the resume.
   - Give a score from 0 to 100.
   - Give clear AI feedback explaining the score.
8. If the resume does not contain enough information, say:
   "Information not available in the resume."
9. Never invent experience, skills, projects, achievements, education, or other facts.
10. Return ONLY valid JSON.
11. Do not use markdown code blocks.

Return JSON using exactly this structure:

{{
    "candidate": {{
        "name": "",
        "email": "",
        "phone": "",
        "role": "",
        "experience": "",
        "location": "",
        "linkedIn": ""
    }},

    "overall_score": 0,

    "score_breakdown": [],

    "recommendation": {{
        "status": "",
        "summary": "",
        "key_insight": ""
    }},

    "strengths": [],

    "weaknesses": [],

    "questions": [
        {{
            "question": "",
            "answer": "",
            "score": 0,
            "feedback": ""
        }}
    ]
}}
"""

    response = model.generate_content(prompt)

    clean_json = (
        response.text
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    return json.loads(clean_json)
