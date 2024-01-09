export OPENAI_API_KEY='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'

cd src/backend/app
uvicorn main:app --reload --port 8000
