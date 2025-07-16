from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import NamingRequest, NamingResponse
from app.openai_client import get_naming_suggestions

app = FastAPI()

# Permite peticiones desde cualquier origen (ajusta en producción)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/naming", response_model=NamingResponse)
async def naming_endpoint(payload: NamingRequest):
    try:
        suggestions = await get_naming_suggestions(payload.ideas, payload.creatividad)
        return {"resultados": suggestions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
