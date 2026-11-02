import os
import sys
import csv
from pathlib import Path
import django

# Setup Django environment
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cropwise_backend.settings')
django.setup()

from apps.crops.models import Crop
from apps.market.models import MarketPrice
from apps.organic.models import OrganicPractice
from apps.pests.models import Pest

def import_crops():
    crops = [
        {
            "name": "Paddy (Rice)",
            "category": "Cereals",
            "image": "/images/paddy_crop.jpg",
            "best_season": "Kharif",
            "water_requirement": "High",
            "duration_days": "120–140 days",
            "expected_yield": "40–60 quintals/acre",
            "current_price": 2300.0,
            "predicted_price": 2480.0,
            "price_trend_percent": 7.8,
            "description": "Paddy is the primary staple cereal crop cultivated in alluvial and clay loam river basins. Requires standing water or controlled irrigation during tillering phase."
        },
        {
            "name": "Maize (Corn)",
            "category": "Cereals",
            "image": "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=800&q=80",
            "best_season": "Kharif",
            "water_requirement": "Moderate",
            "duration_days": "90–110 days",
            "expected_yield": "30–45 quintals/acre",
            "current_price": 2150.0,
            "predicted_price": 2320.0,
            "price_trend_percent": 7.9,
            "description": "High-yielding cereal crop versatile for human consumption, cattle fodder, and industrial starch production."
        },
        {
            "name": "Tomato (Hybrid)",
            "category": "Vegetables",
            "image": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
            "best_season": "All Seasons",
            "water_requirement": "Moderate",
            "duration_days": "75–90 days",
            "expected_yield": "150–250 quintals/acre",
            "current_price": 1850.0,
            "predicted_price": 2100.0,
            "price_trend_percent": 13.5,
            "description": "High-value commercial vegetable crop with quick cash return. Requires drip irrigation and proactive blight management."
        },
        {
            "name": "Cotton (Bt Hybrid)",
            "category": "Cash Crops",
            "image": "https://images.unsplash.com/photo-1594808744577-4c7407842610?auto=format&fit=crop&w=800&q=80",
            "best_season": "Kharif",
            "water_requirement": "Moderate",
            "duration_days": "150–180 days",
            "expected_yield": "12–18 quintals/acre",
            "current_price": 7100.0,
            "predicted_price": 7450.0,
            "price_trend_percent": 4.9,
            "description": "Major industrial cash crop well suited for deep black cotton soils with good moisture retention."
        },
        {
            "name": "Groundnut (Peanut)",
            "category": "Oilseeds",
            "image": "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80",
            "best_season": "Rabi",
            "water_requirement": "Low",
            "duration_days": "100–120 days",
            "expected_yield": "15–22 quintals/acre",
            "current_price": 6250.0,
            "predicted_price": 6580.0,
            "price_trend_percent": 5.2,
            "description": "Leguminous oilseed crop that fixes atmospheric nitrogen, improving long-term soil structure and fertility."
        }
    ]
    for c in crops:
        Crop.objects.update_or_create(name=c["name"], defaults=c)
    print(f"[OK] Imported {len(crops)} crops.")

def import_market_csv():
    csv_file = BASE_DIR / 'data' / 'market_prices.csv'
    if not csv_file.exists():
        print("Market CSV file not found.")
        return

    count = 0
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            MarketPrice.objects.update_or_create(
                crop=row['crop'],
                market=row['market'],
                date=row['date'],
                defaults={
                    "state": row['state'],
                    "district": row['district'],
                    "min_price": float(row['min_price']),
                    "max_price": float(row['max_price']),
                    "modal_price": float(row['modal_price']),
                    "arrival_quantity": float(row['arrival_quantity']),
                    "source": row['source']
                }
            )
            count += 1
    print(f"[OK] Imported {count} market price records.")

def import_organics():
    OrganicPractice.objects.update_or_create(
        title="Enriched Vermicompost & Neem Cake Application",
        defaults={
            "crop": "Tomato",
            "stage": "Vegetative to Flowering",
            "practice_type": "Soil Management",
            "description": "Soil application of well-decomposed vermicompost blended with neem cake prevents root knot nematodes and enhances micro-flora.",
            "how_to_apply": "Apply 2 tons/acre vermicompost + 100 kg/acre neem cake around root zone before earthing up.",
            "frequency": "Once at land preparation, once at flowering stage.",
            "benefits": "Improves CEC, retains soil moisture, suppresses fungal pathogen growth naturally.",
            "precautions": "Ensure vermicompost is fully matured and not emitting excess heat."
        }
    )
    print("[OK] Imported organic practices.")

def import_pests():
    Pest.objects.update_or_create(
        pest_name="Fruit Borer (Helicoverpa armigera)",
        defaults={
            "crop": "Tomato",
            "stage": "Fruiting Stage",
            "severity": "High",
            "symptoms": [
                "Circular bore holes on young green and ripe tomato fruits",
                "Larva feeding with half body outside the fruit",
                "Premature rotting and dropping of affected fruits"
            ],
            "cultural_control": [
                "Plant Marigold (Tagetes erecta) as a trap crop (1 line of marigold for every 16 lines of tomato)",
                "Deep summer plowing to expose pupae to scorching sunlight and bird predators"
            ],
            "mechanical_control": [
                "Install 10 Pheromone traps per acre with Helilure for monitoring adult male moths",
                "Hand-pick and destroy early instar larvae and bored fruits"
            ],
            "biological_control": [
                "Release Trichogramma chilonis egg parasitoids @ 50,000/acre at weekly intervals",
                "Spray HaNPV (Helicoverpa Nuclear Polyhedrosis Virus) @ 250 LE/acre with 0.1% jaggery"
            ],
            "chemical_control": [
                "Chlorantraniliprole 18.5% SC @ 0.3ml/liter or Flubendiamide 480 SC @ 0.2ml/liter",
                "Emamectin Benzoate 5% SG @ 0.4g/liter of water"
            ],
            "safety_warning": "Always wear protective gear (gloves, mask). Observe 5-7 days pre-harvest interval (PHI). Follow product label and CIBRC registered dosages."
        }
    )
    print("[OK] Imported pest database.")

if __name__ == '__main__':
    print("Seeding CropWise AI Database...")
    import_crops()
    import_market_csv()
    import_organics()
    import_pests()
    print("All agricultural datasets successfully imported into SQLite/Django Database!")
