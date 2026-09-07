# import google.generativeai as genai
# import json



# model = genai.GenerativeModel("gemini-2.5-flash")

# def analyze_resume(resume_text, questions_text):

#     prompt = f"""
# You are an expert ATS Resume Analyzer.

# Analyze the resume below.

# Resume:
# {resume_text}

# Evaluation Criteria:
# {questions_text}

# For each category:
# 1. Give a score out of 100
# 2. Explain the score
# 3. Give improvement suggestions

# Also provide:
# - Overall ATS Score
# - Strengths
# - Weaknesses
# - Missing Skills
# - Recommended Job Roles

# Return valid JSON only.
# """

#     response = model.generate_content(prompt)

#     return response.text





# def analyze_resume(resume_text, questions_text):

#     prompt = f"""
# You are an expert ATS Resume Analyzer.

# Resume:
# {resume_text}

# Questions and Evaluation Criteria:
# {questions_text}

# Instructions:

# For EACH question:

# 1. Read the resume carefully.
# 2. Answer the question using only information found in the resume.
# 3. Give a score out of 100.
# 4. Explain the score.
# 5. Provide improvement suggestions.

# Also provide:

# - Overall ATS Score
# - Strengths
# - Weaknesses
# - Missing Skills
# - Recommended Job Roles

# Return ONLY valid JSON in the following format:

# {{
#   "overall_score": 0,
#   "strengths": [],
#   "weaknesses": [],
#   "missing_skills": [],
#   "recommended_roles": [],
#   "evaluations": [
#     {{
#       "category": "",
#       "question": "",
#       "answer": "",
#       "score": 0,
#       "explanation": "",
#       "suggestion": ""
#     }}
#   ]
# }}
# """

    # response = model.generate_content(prompt)

    # return response.text




# prompt = f"""
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

#     response = model.generate_content(prompt)

#     clean_json = (
#         response.text
#         .replace("```json", "")
#         .replace("```", "")
#         .strip()
#     )

#     return json.loads(clean_json)



# import google.generativeai as genai

# import json

# genai.configure(api_key="YOUR_API_KEY")

# model = genai.GenerativeModel("gemini-2.5-flash")


# def analyze_resume(resume_text, questions_text):



import google.generativeai as genai
import json
import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-3.6-flash")


def analyze_resume(resume_text, questions_text):

    prompt = f"""
You are an expert ATS Resume Analyzer.

Analyze the following resume:

Resume:
{resume_text}

Evaluation Criteria:
{questions_text}

Return ONLY valid JSON.

The JSON must have exactly this structure:

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

    "score_breakdown": [
        {{
            "category": "Technical Skills",
            "score": 0,
            "weight": 40
        }},
        {{
            "category": "Experience",
            "score": 0,
            "weight": 30
        }},
        {{
            "category": "Communication",
            "score": 0,
            "weight": 20
        }},
        {{
            "category": "Growth Potential",
            "score": 0,
            "weight": 10
        }}
    ],

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
            "feedback": "",
           
        }}
    ]
}}

IMPORTANT RULES:

1. Use ONLY the questions provided under "EXACT EVALUATION QUESTIONS".
2. DO NOT create new questions.
3. DO NOT generate interview questions based on the resume.
4. DO NOT rewrite, modify, or expand the provided questions.
5. Evaluate every provided question.
6. The output must contain exactly the same number of questions as provided.
7. For each question, provide:
   - the exact original question
   - answer based only on the resume
   - score from 0 to 100
   - explanation/feedback
8. If the resume does not contain enough information to answer a question, clearly say that the information is not available in the resume.
9. Do not invent candidate experience, projects, achievements, or facts.

Return ONLY valid JSON in this exact structure:

{{
  "questions": [
    {{
      "question": "EXACT QUESTION FROM THE INPUT",
      "answer": "Answer based on the resume",
      "score": 0,
       "feedback": "Explanation of the score"
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
