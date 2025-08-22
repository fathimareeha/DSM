import json
from pathlib import Path

# Find the JSON file in the same folder
file_path = Path(__file__).resolve().parent / "kerala_pincodes.json"

# Load JSON and make it Django choices format
with open(file_path, "r") as f:
    PINCODE_CHOICES = [(code, code) for code in json.load(f)]
