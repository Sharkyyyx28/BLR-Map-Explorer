import json
from pathlib import Path
from typing import List, Optional

# pyrefly: ignore [missing-import]
from fastapi import FastAPI, HTTPException, Query
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
# pyrefly: ignore [missing-import]
from pydantic import BaseModel


class Area(BaseModel):
    pincode: str
    area: str
    corporation: str
    lat: float
    lng: float


app = FastAPI(title="Bangalore Pincode API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def load_pincodes():
    file_path = Path(__file__).parent / "pincodes.json"
    try:
        with open(file_path, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

PINCODE_DATA = load_pincodes()


@app.get("/")
async def root():
    
    return {"message": "Bangalore Pincode API is running"}

@app.get("/api/areas", response_model=List[Area])
async def get_all_areas():
    
    return PINCODE_DATA

@app.get("/api/lookup", response_model=List[Area])
async def lookup_area(
    pincode: Optional[str] = Query(None),
    area: Optional[str] = Query(None),
    corporation: Optional[str] = Query(None)
):
    
    if not any([pincode, area, corporation]):
        raise HTTPException(
            status_code=400, 
            detail="Provide either pincode, area, or corporation query param"
        )

    results = []

    if pincode:
        results = [item for item in PINCODE_DATA if item["pincode"] == pincode]
        if not results:
            raise HTTPException(status_code=404, detail="Pincode not found")
        return results

    if area:
        search_term = area.lower()
        results = [
            item for item in PINCODE_DATA 
            if search_term in item["area"].lower()
        ]
        if not results:
            raise HTTPException(status_code=404, detail="Area not found")
        return results
    if corporation:
        results = [
            item for item in PINCODE_DATA 
            if item["corporation"].lower() == corporation.lower()
        ]
        if not results:
            raise HTTPException(status_code=404, detail="Corporation not found")
        return results

    return results

@app.get("/api/corporations")
async def get_unique_corporations():
    corporations = sorted(list(set(item["corporation"] for item in PINCODE_DATA)))
    return corporations
