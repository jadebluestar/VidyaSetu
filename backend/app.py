from flask import Flask, request, jsonify, Response, stream_with_context
from flask_cors import CORS
import json
import os
import re
import requests

app = Flask(__name__)
CORS(app)
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_MODEL = os.getenv("OPENROUTER_MODEL", "openai/gpt-4o-mini")
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"


def parse_model_json(raw_text):
    cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", raw_text.strip(), flags=re.MULTILINE)
    return json.loads(cleaned)


def _openrouter_headers():
    if not OPENROUTER_API_KEY:
        raise RuntimeError("Missing OPENROUTER_API_KEY. Set it in your environment.")
    return {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }


def generate_with_openrouter(prompt, stream=False):
    payload = {
        "model": OPENROUTER_MODEL,
        "messages": [{"role": "user", "content": prompt}],
        "stream": stream,
    }
    response = requests.post(
        OPENROUTER_API_URL,
        headers=_openrouter_headers(),
        json=payload,
        timeout=90,
        stream=stream,
    )
    response.raise_for_status()
    return response


def extract_response_text(response_json):
    choices = response_json.get("choices", [])
    if not choices:
        raise RuntimeError("OpenRouter returned no choices.")
    message = choices[0].get("message", {})
    text = message.get("content", "")
    if not text:
        raise RuntimeError("OpenRouter response content was empty.")
    return text


def generate_json_response(prompt):
    try:
        response = generate_with_openrouter(prompt, stream=False)
        return jsonify(parse_model_json(extract_response_text(response.json())))
    except Exception as error:
        return jsonify({"error": f"OpenRouter request failed: {str(error)}"}), 502

@app.route('/api/future-self', methods=['POST'])
def future_self():
    profile = request.json
    prompt = f"""You are an Indian career counselor with deep knowledge of Indian and global job markets.
Given this student profile: {json.dumps(profile)}

Simulate realistic career trajectories at ages 25, 28, 32 for TWO paths.
Path A: {profile.get('course')} from {profile.get('country')}
Path B: Similar field but staying in India

For each age and path return:
* job_title: specific realistic title
* city: real city name (e.g. "Bengaluru", "San Jose, CA")
* salary_lpa: number in Indian LPA (e.g. 18.5 for ₹18.5 LPA). For abroad, convert to INR equivalent.
* loan_status: one of "In moratorium" / "Repaying (₹X/month)" / "Paid off" / "N/A"
* lifestyle: one factual sentence, no adjectives like "comfortable" or "great"

Return ONLY valid JSON, no markdown:
{{
  "abroad": {{
    "age_25": {{"job_title":"","city":"","salary_lpa":0,"loan_status":"","lifestyle":""}},
    "age_28": {{"job_title":"","city":"","salary_lpa":0,"loan_status":"","lifestyle":""}},
    "age_32": {{"job_title":"","city":"","salary_lpa":0,"loan_status":"","lifestyle":""}}
  }},
  "india": {{
    "age_25": {{"job_title":"","city":"","salary_lpa":0,"loan_status":"","lifestyle":""}},
    "age_28": {{"job_title":"","city":"","salary_lpa":0,"loan_status":"","lifestyle":""}},
    "age_32": {{"job_title":"","city":"","salary_lpa":0,"loan_status":"","lifestyle":""}}
  }},
  "comparison": {{
    "total_loan_cost_abroad": "₹XL",
    "total_loan_cost_india": "₹XL",
    "peak_emi_abroad": "₹X,XXX/month",
    "peak_emi_india": "₹X,XXX/month",
    "loan_free_year_abroad": "20XX",
    "loan_free_year_india": "20XX"
  }}
}}"""

    return generate_json_response(prompt)

@app.route('/api/visa-risk', methods=['POST'])
def visa_risk():
    data = request.json
    prompt = f"""You are an expert on student visa requirements for Indian applicants.
Analyse this applicant profile: {json.dumps(data)}

Return ONLY valid JSON:
{{
  "score": <integer 0-100, higher = more risk>,
  "risk_level": "Low" | "Moderate" | "High",
  "red_flags": [
    {{"flag": "short description", "explanation": "one sentence why this is a risk"}},
    {{"flag": "...", "explanation": "..."}},
    {{"flag": "...", "explanation": "..."}}
  ],
  "fixes": [
    {{"action": "specific action", "detail": "one sentence how to do this"}},
    {{"action": "...", "detail": "..."}},
    {{"action": "...", "detail": "..."}}
  ]
}}"""

    return generate_json_response(prompt)

@app.route('/api/sop', methods=['POST'])
def generate_sop():
    data = request.json
    word_count = data.get('word_count', 500)

    prompt = f"""Write a Statement of Purpose for an Indian student applying to a {data.get('course')} program.

Student answers:
* Why this course: {data.get('why_course')}
* Why this country: {data.get('why_country')}
* Career goal: {data.get('career_goal')}
* Achievement: {data.get('achievement')}
* Financial plan: {data.get('financial_plan')}

Requirements:
* Exactly {word_count} words
* Formal academic tone, no casual language
* No clichés like "ever since I was young" or "passionate about"
* Concrete specifics, not vague statements
* Structure: Hook opening → Academic background → Why this course → Career plan → Why this university → Closing
* Do not use bullet points"""

    def generate():
        stream_response = generate_with_openrouter(prompt, stream=True)
        for raw_line in stream_response.iter_lines(decode_unicode=True):
            if not raw_line or not raw_line.startswith("data: "):
                continue
            data = raw_line[6:]
            if data == "[DONE]":
                break
            try:
                event = json.loads(data)
                delta = event.get("choices", [{}])[0].get("delta", {})
                text = delta.get("content", "")
                if text:
                    yield f"data: {json.dumps({'text': text})}\\n\\n"
            except json.JSONDecodeError:
                continue
        yield "data: [DONE]\\n\\n"

    return Response(stream_with_context(generate()), mimetype='text/event-stream')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
