from pydantic import BaseModel
from typing import List

class NamingRequest(BaseModel):
    ideas: str
    creatividad: float = 0.5  # 0 = formalidad clásica, 1 = creatividad máxima

class NamingSuggestion(BaseModel):
    nombre: str
    slogan: str
    descripcion: str
    colores: list[str]

class NamingResponse(BaseModel):
    resultados: List[NamingSuggestion]
