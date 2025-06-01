from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
from diffusers import StableDiffusionPipeline
from PIL import Image
import uuid
import os

app = FastAPI()

# Enable CORS for all origins (for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or ["http://localhost:5173"] for more security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve generated images statically
os.makedirs("generated", exist_ok=True)
app.mount("/generated", StaticFiles(directory="generated"), name="generated")

# Load Stable Diffusion SDXL model at startup
model_id = "runwayml/stable-diffusion-v1-5"
pipeline = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32)
if torch.cuda.is_available():
    pipeline = pipeline.to("cuda")

class PromptRequest(BaseModel):
    prompt: str

@app.post("/generate")
async def generate_image(request: PromptRequest):
    prompt = request.prompt
    # Generate image
    with torch.autocast("cuda" if torch.cuda.is_available() else "cpu"):
        image = pipeline(prompt).images[0]
    # Save image
    filename = f"{uuid.uuid4().hex}.png"
    image_path = os.path.join("generated", filename)
    image.save(image_path)
    # Return image URL
    return {"message": "Image generated successfully", "image_url": f"/generated/{filename}"} 