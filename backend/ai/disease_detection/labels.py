"""
Agricultural Pathology Class Labels & Treatment Database
"""

SUPPORTED_CROPS = ["Tomato", "Paddy (Rice)", "Cotton", "Corn (Maize)", "Sugarcane"]

LABELS = {
    "tomato_early_blight": {
        "crop": "Tomato",
        "disease": "Tomato Early Blight (Alternaria solani)",
        "class_id": "TOM_EB_01",
        "severity": "High",
        "overview": "Early blight is a prevalent fungal pathogen causing dark brown concentric bullseye lesions surrounded by chlorotic halos on tomato leaves.",
        "symptoms": [
          "Concentric bullseye dark brown rings on mature lower foliage",
          "Chlorotic yellowing surrounding necrotic leaf spots",
          "Black sunken lesions on stem nodes and fruit pedicels"
        ],
        "causes": [
          "Elevated relative humidity (>80%) and temperatures between 24°C - 28°C",
          "Overhead sprinkler leaf wetting",
          "Fungal spore survival in infected soil and Solanaceae crop residue"
        ],
        "organic_treatment": [
          "Spray Cold-Pressed Neem Oil (5ml/L) blended with bio-agent Trichoderma harzianum",
          "Apply 10% bio-sulfur or baking soda foliar spray",
          "Prune lower infected leaves up to 30 cm height and destroy crop residue"
        ],
        "chemical_treatment": [
          "Spray Mancozeb 75% WP @ 2.5g/liter of water",
          "Systemic rotation with Difenoconazole 25% EC @ 1ml/liter"
        ],
        "prevention": [
          "Apply organic straw mulching to eliminate rain splash of soil spores",
          "Maintain 60cm plant spacing for canopy air passage"
        ],
        "affected_parts": ["Leaves", "Stems", "Fruit Calyx"]
    },
    "tomato_late_blight": {
        "crop": "Tomato",
        "disease": "Tomato Late Blight (Phytophthora infestans)",
        "class_id": "TOM_LB_02",
        "severity": "Severe",
        "overview": "Late blight is a destructive oomycete water-mold disease causing dark water-soaked leaf spots with white mildew growth underneath.",
        "symptoms": [
          "Large dark brown to purplish-black water-soaked leaf lesions",
          "White downy fungal mold visible on lower leaf surface under high humidity",
          "Rapid foliage collapse and greasy brown fruit rot"
        ],
        "causes": [
          "Cool wet weather (15°C - 22°C) with persistent fog or rain",
          "Airborne sporangia carried by wind currents from neighboring fields"
        ],
        "organic_treatment": [
          "Foliar spray of Copper Hydroxide (2g/L) or Bordeaux Mixture (1%)",
          "Apply bio-control agent Bacillus subtilis @ 5g/liter water"
        ],
        "chemical_treatment": [
          "Spray Cymoxanil 8% + Mancozeb 64% WP @ 2g/liter",
          "Apply Metalaxyl-M 4% + Mancozeb 64% WP @ 2.5g/liter at onset"
        ],
        "prevention": [
          "Use certified disease-free transplants",
          "Avoid excessive canopy moisture and overhead irrigation"
        ],
        "affected_parts": ["Leaves", "Stems", "Fruit"]
    },
    "paddy_bacterial_blight": {
        "crop": "Paddy (Rice)",
        "disease": "Bacterial Leaf Blight (Xanthomonas oryzae)",
        "class_id": "PAD_BLB_01",
        "severity": "High",
        "overview": "Bacterial leaf blight causes wavy yellow-to-straw colored lesions along leaf margins, progressing to leaf wilting.",
        "symptoms": [
          "Wavy yellow to brown stripes starting at leaf tips along margins",
          "Bacterial dew drops oozing from leaf tips during morning hours",
          "Drying and wilting of active tillers (Kresek phase)"
        ],
        "causes": [
          "High rain humidity and warm daytime temperatures (28°C - 34°C)",
          "Excessive nitrogen fertilizer dosage without balanced potassium",
          "Wind splashes transmitting bacteria through irrigation water"
        ],
        "organic_treatment": [
          "Spray fresh cow dung slurry (20% concentration) mixed with wood ash",
          "Apply neem seed kernel extract (NSKE 5%) at 10-day intervals"
        ],
        "chemical_treatment": [
          "Spray Streptocycline @ 6g + Copper Oxychloride 50% WP @ 500g in 200 liters water/acre",
          "Repeat after 12 days if wet weather persists"
        ],
        "prevention": [
          "Use certified disease-resistant seeds (e.g. BPT 5204, Swarna)",
          "Maintain balanced NPK ratio (4:2:1) avoiding late N doses"
        ],
        "affected_parts": ["Leaf blade", "Leaf sheath"]
    },
    "paddy_blast": {
        "crop": "Paddy (Rice)",
        "disease": "Rice Blast Disease (Magnaporthe oryzae)",
        "class_id": "PAD_BLAST_02",
        "severity": "Severe",
        "overview": "Rice blast produces eye-shaped or spindle-shaped brown lesions with gray centers on leaves, nodes, and panicles.",
        "symptoms": [
          "Spindle-shaped spots with gray centers and reddish-brown borders on leaves",
          "Blackening and breaking of panicle neck junction (Neck Blast)",
          "Incomplete grain filling and chaffy empty panicles"
        ],
        "causes": [
          "High relative humidity (>90%) with cool night temperatures (20°C)",
          "High nitrogen application and cloudy wet weather"
        ],
        "organic_treatment": [
          "Foliar spray of Pseudomonas fluorescens @ 10g/liter of water",
          "Spray raw garlic bulb extract (5%) mixed with neem oil"
        ],
        "chemical_treatment": [
          "Spray Tricyclazole 75% WP @ 0.6g/liter water",
          "Apply Isoprothiolane 40% EC @ 1.5ml/liter"
        ],
        "prevention": [
          "Treat seeds with Carbendazim @ 2g/kg seed before sowing",
          "Avoid excessive nitrogen fertilization"
        ],
        "affected_parts": ["Leaves", "Nodes", "Panicle Neck"]
    },
    "cotton_leaf_curl": {
        "crop": "Cotton",
        "disease": "Cotton Leaf Curl Virus (CLCuV)",
        "class_id": "COT_LCV_01",
        "severity": "High",
        "overview": "Viral infection transmitted by whiteflies (Bemisia tabaci) resulting in upward leaf curling and leaf-like outgrowths.",
        "symptoms": [
          "Upward and downward leaf thickening and cupping",
          "Enation outgrowths on lower leaf veins",
          "Stunted plant growth and drastic reduction in boll formation"
        ],
        "causes": [
          "Whitefly vector population buildup during dry warm spells",
          "Presence of host weed species around field borders"
        ],
        "organic_treatment": [
          "Install yellow sticky traps @ 20/acre to capture whiteflies",
          "Spray 10,000 PPM Neem Oil @ 3ml/liter"
        ],
        "chemical_treatment": [
          "Spray Afidopyropen 50 g/L DC @ 2ml/liter or Diafenthiuron 50% WP @ 1.25g/liter"
        ],
        "prevention": [
          "Eradicate weed hosts like Abutilon indicum",
          "Plant border rows of sorghum or pearl millet as insect barriers"
        ],
        "affected_parts": ["Young foliage", "Bolls"]
    },
    "corn_common_rust": {
        "crop": "Corn (Maize)",
        "disease": "Maize Common Rust (Puccinia sorghi)",
        "class_id": "CORN_RUST_01",
        "severity": "Moderate",
        "overview": "Common rust causes small powdery golden-brown pustules on both upper and lower leaf surfaces.",
        "symptoms": [
          "Elongated powdery cinnamon-brown rust pustules on leaves",
          "Pustules rupturing leaf epidermis to release reddish spores",
          "Premature yellowing and drying of foliage"
        ],
        "causes": [
          "Cool temperatures (16°C - 24°C) with high relative humidity and dew"
        ],
        "organic_treatment": [
          "Spray Bio-fungicide Trichoderma harzianum @ 5g/L",
          "Foliar application of sulfur dust @ 10 kg/acre"
        ],
        "chemical_treatment": [
          "Spray Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1ml/liter",
          "Apply Mancozeb 75% WP @ 2.5g/liter"
        ],
        "prevention": [
          "Plant rust-resistant hybrid corn cultivars",
          "Practice crop rotation with non-graminaceous legumes"
        ],
        "affected_parts": ["Leaf blade", "Husks"]
    },
    "healthy": {
        "crop": "Healthy Plant",
        "disease": "Healthy Crop Leaf (No Disease Detected)",
        "class_id": "HEALTHY_00",
        "severity": "None",
        "overview": "The leaf shows vigorous chlorophyll pigmentation, uniform cell geometry, and no active fungal, bacterial, or viral pathogens.",
        "symptoms": [
          "Uniform dark green leaf color",
          "Smooth intact leaf margins and cuticle layer",
          "Absence of chlorosis, necrosis, or fungal pustules"
        ],
        "causes": ["Good nutrient management and disease-free environment"],
        "organic_treatment": ["Maintain current organic compost and irrigation regime"],
        "chemical_treatment": ["No chemical treatment required"],
        "prevention": ["Continue routine preventive Neem oil sprays (3ml/L)"],
        "affected_parts": ["None"]
    }
}
