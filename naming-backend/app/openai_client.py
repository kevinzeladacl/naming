import os
import httpx
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"

SYSTEM_PROMPT = (
	"Eres un experto en branding y naming. Dado una lista de ideas, "
	"devuelve sugerencias de nombres creativos para un proyecto, cada uno con un slogan, "
	"una breve descripción y una paleta de 2-4 colores en formato HEX."
)

async def get_naming_suggestions(ideas: str, creatividad: float = 0.5) -> list[dict]:
	creatividad = max(0.0, min(1.0, creatividad))  # Clamp entre 0 y 1
	grado = "máxima creatividad, nombres disruptivos y poco convencionales" if creatividad > 0.7 else ("equilibrio entre creatividad y formalidad" if creatividad > 0.3 else "nombres clásicos, formales y profesionales")
	prompt = (
		"Actúa como un experto internacional en branding, naming, diseño creativo "
		"y creación de marcas. Con base en las siguientes ideas:\n\n"
		f"{ideas}\n\n"
		f"El grado de creatividad para las sugerencias debe ser: {grado}. "
		"Ajusta el estilo de los nombres y slogans según ese nivel.\n"
		"Devuelve exactamente 3 sugerencias, cada una como un objeto JSON con estos campos:\n"
		"- nombre: nombre creativo, original y memorable para la marca.\n"
		"- slogan: frase corta e impactante que resuma la esencia de la marca.\n"
		"- descripcion: breve descripción del concepto y personalidad de la marca.\n"
		"- colores: lista de entre 3 a 5 colores en formato HEX que reflejen la identidad visual.\n\n"
		"Formato de salida (SOLO JSON, SIN TEXTO EXTRA):\n"
		"[\n"
		"  {\n"
		'    "nombre": "...",\n'
		'    "slogan": "...",\n'
		'    "descripcion": "...",\n'
		'    "colores": ["#FFFFFF", "#000000", "#FF0000"]\n'
		"  },\n"
		"  ...\n"
		"]"
		"Recuerda analizar si te piden nombre de una Marca o de una App/Software/Producto. "
		"Sé creativo, audaz, usa anagramas y no solo conectes sustantivos/verbos."
	)

	headers = {
		"Authorization": f"Bearer {OPENAI_API_KEY}",
		"Content-Type": "application/json"
	}

	data = {
		"model": "gpt-4o-mini",
		"messages": [
			{"role": "system", "content": "Eres un experto en branding, marketing creativo y desarrollo de marcas exitosas a nivel internacional."},
			{"role": "user", "content": prompt}
		],
		"max_tokens": 1000,
		"temperature": creatividad
	}

	async with httpx.AsyncClient() as client:
		resp = await client.post(OPENAI_API_URL, json=data, headers=headers, timeout=30)
		resp.raise_for_status()
		content = resp.json()["choices"][0]["message"]["content"]
		import json
		return json.loads(content)
