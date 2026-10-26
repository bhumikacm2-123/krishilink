"""
KrishiLink Agronomic Crop Database
Detailed Indian crop profiles with regional agronomy, water needs, and growing guidance.
"""

CROP_PROFILES = {
    "rice": {
        "name": "Rice (Paddy)",
        "kannada_name": "ಭತ್ತ (Rice)",
        "hindi_name": "धान (Paddy)",
        "scientific_name": "Oryza sativa",
        "category": "Cereal Grain",
        "suitable_soils": ["Clayey", "Clay Loam", "Alluvial", "Black Soil"],
        "optimal_ph": "5.5 - 7.0",
        "water_requirement": "High to Very High (1200 - 1800 mm)",
        "growth_duration": "115 - 145 days",
        "expected_yield": "22 - 32 quintals / acre",
        "primary_states": ["Karnataka", "West Bengal", "Punjab", "Andhra Pradesh", "Tamil Nadu", "Odisha"],
        "season": "Kharif (June - Nov), Rabi / Summer (where irrigation is available)",
        "npk_ratio": "100:50:50 kg/hectare (or 40:20:20 kg/acre)",
        "growing_tips": [
            "Maintain 2-5 cm standing water during the tillering and panicle development stages.",
            "Apply zinc sulphate (25 kg/ha) if leaves exhibit zinc deficiency or rusty brown discoloration.",
            "Incorporate green manure (Dhaincha or Sunhemp) during summer ploughing to enrich organic carbon.",
            "Use Alternate Wetting and Drying (AWD) water management to save 25% irrigation water without yield loss."
        ],
        "image": "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80"
    },
    "ragi": {
        "name": "Ragi (Finger Millet)",
        "kannada_name": "ರಾಗಿ (Finger Millet)",
        "hindi_name": "मंडुआ / रागी (Finger Millet)",
        "scientific_name": "Eleusine coracana",
        "category": "Nutri-Cereal / Millet",
        "suitable_soils": ["Red Sandy Loam", "Laterite", "Light Black Soil", "Loam"],
        "optimal_ph": "5.5 - 7.5",
        "water_requirement": "Low to Moderate (350 - 550 mm, drought hardy)",
        "growth_duration": "100 - 125 days",
        "expected_yield": "12 - 18 quintals / acre (rainfed), 20 - 24 quintals (irrigated)",
        "primary_states": ["Karnataka", "Tamil Nadu", "Andhra Pradesh", "Odisha", "Uttarakhand"],
        "season": "Kharif (July - Nov), Rabi / Summer (under borewell irrigation)",
        "npk_ratio": "50:40:25 kg/hectare for rainfed; 100:50:50 for irrigated",
        "growing_tips": [
            "Ideal staple superfood crop for Karnataka; highly climate-resilient with deep root penetration.",
            "Seed treatment with Azospirillum and Phosphobacteria (200g/acre) boosts early root anchorage.",
            "Practice intercropping with Red Gram (Pigeonpea) in a 4:2 or 8:2 row ratio for enhanced soil nitrogen and double income.",
            "Tolerates moderate drought spells; one protective irrigation at flowering significantly boosts grain filling."
        ],
        "image": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80"
    },
    "arecanut": {
        "name": "Arecanut (Betel Nut)",
        "kannada_name": "ಅಡಿಕೆ (Arecanut)",
        "hindi_name": "सुपारी (Arecanut)",
        "scientific_name": "Areca catechu",
        "category": "High-Value Plantation Crop",
        "suitable_soils": ["Laterite", "Red Loam", "Alluvial with good drainage"],
        "optimal_ph": "5.5 - 7.5",
        "water_requirement": "Moderate to High (1500 - 2500 mm rainfall or drip irrigation: 15-20 L/palm/day)",
        "growth_duration": "Perennial (yield begins 5th-6th year, productive for 30+ years)",
        "expected_yield": "8 - 12 quintals dried chali / acre",
        "primary_states": ["Karnataka (Shimoga, Chikkamagaluru, Dakshina Kannada, Davanagere)", "Kerala", "Assam"],
        "season": "Perennial plantation (planting during June-August monsoon)",
        "npk_ratio": "100:40:140 grams N:P:K per palm per year along with 12 kg FYM/compost",
        "growing_tips": [
            "Ensure excellent sub-surface drainage; avoid waterlogging around palm roots.",
            "Intercrop with Pepper, Cocoa, Banana, or Cardamom for micro-climate moderation and multi-tier revenue.",
            "Apply Bordeaux mixture (1%) before the onset of monsoon to prevent Koleroga / Mahali (fruit rot disease).",
            "Drip irrigation combined with organic mulching saves 40% water and protects surface feeder roots from summer heat."
        ],
        "image": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80"
    },
    "maize": {
        "name": "Maize (Corn)",
        "kannada_name": "ಮುಸುಕಿನ ಜೋಳ (Maize)",
        "hindi_name": "मक्का (Maize)",
        "scientific_name": "Zea mays",
        "category": "Cereal Grain / Feed",
        "suitable_soils": ["Well-drained Sandy Loam", "Clay Loam", "Deep Black Soil"],
        "optimal_ph": "6.0 - 7.5",
        "water_requirement": "Moderate (500 - 750 mm)",
        "growth_duration": "90 - 110 days",
        "expected_yield": "25 - 35 quintals / acre",
        "primary_states": ["Karnataka", "Madhya Pradesh", "Bihar", "Maharashtra", "Telangana"],
        "season": "Kharif (June - July), Rabi (October - November), Spring / Summer",
        "npk_ratio": "120:60:40 kg/hectare (split N into basal, knee-high, and tasseling stages)",
        "growing_tips": [
            "Critical moisture stages are tasseling and silking; avoid moisture stress during these 2 weeks.",
            "Install pheromone traps (5 traps/acre) early for Fall Armyworm (FAW) monitoring and biocontrol.",
            "Maintain optimal plant spacing: 60 cm between rows and 20 cm between plants.",
            "Apply top-dressed Urea when plants are at knee-high stage along with light inter-cultivation."
        ],
        "image": "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80"
    },
    "chilli": {
        "name": "Chilli (Red / Green)",
        "kannada_name": "ಮೆಣಸಿನಕಾಯಿ (Chilli)",
        "hindi_name": "मिर्च (Chilli)",
        "scientific_name": "Capsicum annuum",
        "category": "Spice / Commercial Vegetable",
        "suitable_soils": ["Well-drained Black Cotton Soil", "Red Loam", "Sandy Loam"],
        "optimal_ph": "6.0 - 7.0",
        "water_requirement": "Moderate (600 - 800 mm with regulated drip irrigation)",
        "growth_duration": "140 - 180 days (multiple pickings)",
        "expected_yield": "15 - 25 quintals dry chilli / acre",
        "primary_states": ["Andhra Pradesh (Guntur)", "Karnataka (Byadagi)", "Telangana", "Madhya Pradesh"],
        "season": "Kharif (transplanting June-July), Rabi (Sept-Oct)",
        "npk_ratio": "150:75:75 kg/hectare",
        "growing_tips": [
            "Raise healthy seedlings in 98-cell pro-trays using coco-peat and Trichoderma for root vigor.",
            "Install yellow and blue sticky traps (20 each/acre) to control thrips, whiteflies, and mites.",
            "Silver-black plastic mulching (25-30 micron) controls weeds, conserves soil moisture, and repels vector aphids.",
            "Avoid excessive overhead irrigation; use drip to prevent fungal anthracnose and leaf spots."
        ],
        "image": "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80"
    },
    "cotton": {
        "name": "Cotton",
        "kannada_name": "ಹತ್ತಿ (Cotton)",
        "hindi_name": "कपास (Cotton)",
        "scientific_name": "Gossypium hirsutum",
        "category": "Commercial Fiber Crop",
        "suitable_soils": ["Deep Black Cotton Soil (Regur)", "Alluvial Loam with moisture retention"],
        "optimal_ph": "6.0 - 8.0",
        "water_requirement": "Moderate to High (700 - 1000 mm)",
        "growth_duration": "150 - 180 days",
        "expected_yield": "10 - 16 quintals seed cotton / acre",
        "primary_states": ["Gujarat", "Maharashtra", "Telangana", "Karnataka", "Punjab", "Haryana"],
        "season": "Kharif (sowing May - June)",
        "npk_ratio": "120:60:60 kg/hectare (applied in 3 split doses)",
        "growing_tips": [
            "Nip the apical shoot at 80-90 days to encourage productive sympodial branch development.",
            "Monitor pink bollworm through delta pheromone traps; release Trichogramma egg parasitoids.",
            "Apply boron and magnesium sulphate foliar spray at square formation and boll development.",
            "Avoid water stagnation at root zone as cotton is sensitive to collar rot and damping off."
        ],
        "image": "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=600&q=80"
    },
    "chickpea": {
        "name": "Chickpea (Bengal Gram / Chana)",
        "kannada_name": "ಕಡಲೆ (Bengal Gram)",
        "hindi_name": "चना (Chickpea)",
        "scientific_name": "Cicer arietinum",
        "category": "Pulse / Legume",
        "suitable_soils": ["Clay Loam", "Medium to Deep Black Soil", "Alluvial"],
        "optimal_ph": "6.0 - 8.0",
        "water_requirement": "Low (250 - 400 mm, drought-tolerant pulse)",
        "growth_duration": "95 - 110 days",
        "expected_yield": "7 - 12 quintals / acre",
        "primary_states": ["Madhya Pradesh", "Maharashtra", "Karnataka", "Rajasthan", "Uttar Pradesh"],
        "season": "Rabi (October - November sowing)",
        "npk_ratio": "20:50:20 kg/hectare (as basal dose; fixes atmospheric nitrogen)",
        "growing_tips": [
            "Inoculate seeds with Rhizobium culture and Trichoderma viride before sowing.",
            "Nip the top vegetative shoots at 30-35 days after sowing to stimulate vigorous side branching.",
            "Provide one critical irrigation at pre-flowering and one at pod development stage.",
            "Install bird perches (15/acre) to control Helicoverpa pod borer larvae naturally."
        ],
        "image": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80"
    },
    "pigeonpeas": {
        "name": "Pigeonpea (Red Gram / Tur / Arhar)",
        "kannada_name": "ತೊಗರಿ (Red Gram)",
        "hindi_name": "अरहर / तूर (Pigeonpea)",
        "scientific_name": "Cajanus cajan",
        "category": "Pulse / Legume",
        "suitable_soils": ["Deep Loamy", "Black Cotton Soil", "Red Sandy Loam"],
        "optimal_ph": "6.0 - 7.5",
        "water_requirement": "Low to Moderate (600 - 750 mm)",
        "growth_duration": "140 - 180 days (medium to long duration)",
        "expected_yield": "8 - 14 quintals / acre",
        "primary_states": ["Karnataka (Kalaburagi / Tur Bowl)", "Maharashtra", "Madhya Pradesh", "Gujarat"],
        "season": "Kharif (June - July sowing)",
        "npk_ratio": "25:50:25 kg/hectare",
        "growing_tips": [
            "Kalaburagi GI tagged crop; highly deep-rooted and revitalizes soil nitrogen naturally.",
            "Adopt broad-bed furrow (BBF) method to prevent waterlogging during monsoon showers.",
            "Seed priming with Rhizobium and PSB ensures 15% better nodulation and yield.",
            "Foliar spray of 2% DAP at flower initiation boosts flower retention and pod setting."
        ],
        "image": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80"
    },
    "banana": {
        "name": "Banana (Grand Naine / Yelakki)",
        "kannada_name": "ಬಾಳೆ (Banana)",
        "hindi_name": "केला (Banana)",
        "scientific_name": "Musa acuminata",
        "category": "Commercial Fruit",
        "suitable_soils": ["Deep fertile Alluvial Loam", "Clay Loam rich in organic matter"],
        "optimal_ph": "6.0 - 7.5",
        "water_requirement": "High (1500 - 2000 mm, regular drip irrigation: 15-25 L/plant/day)",
        "growth_duration": "11 - 13 months",
        "expected_yield": "30 - 45 tonnes / acre (G9) or 15-20 tonnes (Yelakki)",
        "primary_states": ["Tamil Nadu", "Maharashtra", "Gujarat", "Karnataka", "Andhra Pradesh"],
        "season": "Year-round planting (ideal: June-July and Oct-Nov)",
        "npk_ratio": "200:50:300 grams N:P:K per plant in split fertigation doses",
        "growing_tips": [
            "Use certified virus-free tissue culture plantlets for uniform flowering and high bunches.",
            "Provide strong bamboo/rope propping to support heavy bunch weight during fruit filling.",
            "Remove dried leaves and unwanted suckers regularly to keep sunlight and air flowing.",
            "Cover bunch with non-woven polypropylene bags to protect fruits from sun scorch and thrips."
        ],
        "image": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80"
    },
    "sugarcane": {
        "name": "Sugarcane",
        "kannada_name": "ಕಬ್ಬು (Sugarcane)",
        "hindi_name": "गन्ना (Sugarcane)",
        "scientific_name": "Saccharum officinarum",
        "category": "Commercial Cash Crop",
        "suitable_soils": ["Deep Alluvial", "Black Clay Loam with excellent water retention"],
        "optimal_ph": "6.5 - 8.0",
        "water_requirement": "High to Very High (1500 - 2500 mm)",
        "growth_duration": "11 - 14 months",
        "expected_yield": "45 - 65 tonnes / acre",
        "primary_states": ["Uttar Pradesh", "Maharashtra", "Karnataka (Belagavi, Mandya)", "Tamil Nadu"],
        "season": "Eksali (Oct-Nov), Adsali (July-Aug), Suru (Jan-Feb)",
        "npk_ratio": "250:100:120 kg/hectare",
        "growing_tips": [
            "Adopt wide-row planting (4 to 5 feet) with single-budded settling chips for drip fertigation.",
            "Trash mulching in alternate furrows saves up to 30% water and regulates soil temperature.",
            "Earthing up at 90 and 120 days prevents plant lodging and facilitates irrigation channels.",
            "Apply potassium sulphate during grand growth phase to enhance sucrose content and recovery."
        ],
        "image": "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80"
    },
    "tomato": {
        "name": "Tomato",
        "kannada_name": "ಟೊಮೆಟೊ (Tomato)",
        "hindi_name": "टमाटर (Tomato)",
        "scientific_name": "Solanum lycopersicum",
        "category": "Vegetable Crop",
        "suitable_soils": ["Well-drained Sandy Loam", "Red Loam rich in humus"],
        "optimal_ph": "6.0 - 7.0",
        "water_requirement": "Moderate (500 - 700 mm with drip)",
        "growth_duration": "100 - 130 days",
        "expected_yield": "25 - 40 tonnes / acre",
        "primary_states": ["Andhra Pradesh", "Madhya Pradesh", "Karnataka (Kolar, Chikkaballapur)", "Maharashtra"],
        "season": "Kharif, Rabi, and mild Summer",
        "npk_ratio": "150:100:100 kg/hectare",
        "growing_tips": [
            "Stake indeterminate hybrid plants with bamboo poles or trellis wire for maximum fruit grade.",
            "Apply calcium nitrate periodically to prevent Blossom End Rot (blackening of fruit tips).",
            "Spray neem seed kernel extract (NSKE 5%) or Bacillus thuringiensis against fruit borer.",
            "Maintain consistent drip moisture; erratic irrigation causes fruit cracking."
        ],
        "image": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80"
    },
    "wheat": {
        "name": "Wheat",
        "kannada_name": "ಗೋಧಿ (Wheat)",
        "hindi_name": "गेहूं (Wheat)",
        "scientific_name": "Triticum aestivum",
        "category": "Cereal Grain",
        "suitable_soils": ["Well-drained Loam", "Clay Loam", "Indo-Gangetic Alluvial"],
        "optimal_ph": "6.0 - 7.5",
        "water_requirement": "Moderate (450 - 650 mm)",
        "growth_duration": "110 - 130 days",
        "expected_yield": "18 - 25 quintals / acre",
        "primary_states": ["Punjab", "Haryana", "Uttar Pradesh", "Madhya Pradesh", "Rajasthan"],
        "season": "Rabi (sowing Nov 1 - Nov 20 for optimal tillering)",
        "npk_ratio": "120:60:40 kg/hectare",
        "growing_tips": [
            "Crown root initiation (CRI) at 21 days after sowing is the most crucial irrigation stage.",
            "Adopt Happy Seeder / Zero Tillage technology into paddy straw to preserve soil moisture and prevent stubble burning.",
            "Apply zinc sulphate if soil test reports zinc below 0.6 ppm.",
            "Keep vigilant for yellow rust symptoms; spray propiconazole if rust pustules appear."
        ],
        "image": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80"
    },
    "coffee": {
        "name": "Coffee (Arabica & Robusta)",
        "kannada_name": "ಕಾಫಿ (Coffee)",
        "hindi_name": "कॉफ़ी (Coffee)",
        "scientific_name": "Coffea arabica / canephora",
        "category": "Hill Plantation Crop",
        "suitable_soils": ["Deep volcanic rich Red Loam", "Forest Hill soils rich in humus"],
        "optimal_ph": "5.5 - 6.5",
        "water_requirement": "High (1500 - 2500 mm rainfall, blossom showers crucial)",
        "growth_duration": "Perennial (annual harvest Nov - Feb)",
        "expected_yield": "6 - 10 quintals clean coffee / acre",
        "primary_states": ["Karnataka (Kodagu, Chikkamagaluru, Hassan)", "Kerala (Wayanad)", "Tamil Nadu"],
        "season": "Planting July-August monsoon",
        "npk_ratio": "120:90:120 kg/hectare in 2-3 split applications",
        "growing_tips": [
            "Maintain two-tier shade trees (Silver Oak, Dadap, Fig) to protect bushes from leaf scorch.",
            "Blossom irrigation (25-30 mm) in March-April triggers synchronized flowering and fruit setting.",
            "Monitor white stem borer in Arabica by stem tracing and swabbing with lime / neem extract.",
            "Compost coffee pulp waste and return to bushes as natural organic mulch."
        ],
        "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
    },
    "pomegranate": {
        "name": "Pomegranate (Bhagwa)",
        "kannada_name": "ದಾಳಿಂಬೆ (Pomegranate)",
        "hindi_name": "अनार (Pomegranate)",
        "scientific_name": "Punica granatum",
        "category": "Arid Fruit Crop",
        "suitable_soils": ["Well-drained Sandy Loam", "Medium Black Soil with gravel"],
        "optimal_ph": "6.5 - 7.8",
        "water_requirement": "Low to Moderate (500 - 700 mm with drip)",
        "growth_duration": "Perennial (first harvest 2.5 years)",
        "expected_yield": "6 - 10 tonnes / acre",
        "primary_states": ["Maharashtra (Solapur, Nashik)", "Karnataka (Bagalkot, Vijayapura, Koppal)", "Gujarat"],
        "season": "Bahar regulation: Ambe Bahar (Jan-Feb), Mrig Bahar (June-July), or Hasta Bahar (Sept-Oct)",
        "npk_ratio": "625:250:250 grams N:P:K per mature plant / year",
        "growing_tips": [
            "Regulate water stress before flowering to initiate uniform flower bud differentiation.",
            "Prune water shoots and criss-cross branches to ensure adequate sunlight inside canopy.",
            "Strict sanitation: collect and bury infected fruits to prevent bacterial blight (Telya).",
            "Spray copper hydroxide and streptocycline during monsoon to control bacterial spot."
        ],
        "image": "https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=600&q=80"
    },
    "watermelon": {
        "name": "Watermelon",
        "kannada_name": "ಕಲ್ಲಂಗಡಿ (Watermelon)",
        "hindi_name": "तरबूज (Watermelon)",
        "scientific_name": "Citrullus lanatus",
        "category": "Cucurbit / Summer Fruit",
        "suitable_soils": ["Sandy Loam", "River basin Alluvial", "Well-drained Loam"],
        "optimal_ph": "6.0 - 7.0",
        "water_requirement": "Moderate (400 - 600 mm via drip)",
        "growth_duration": "80 - 100 days",
        "expected_yield": "18 - 30 tonnes / acre",
        "primary_states": ["Karnataka", "Andhra Pradesh", "Maharashtra", "Tamil Nadu", "Uttar Pradesh"],
        "season": "Summer (sowing Dec - Feb), Zaid crop",
        "npk_ratio": "100:50:50 kg/hectare",
        "growing_tips": [
            "Use silver-black mulch film to suppress weeds and maintain warm root zone for faster growth.",
            "Install bee boxes or encourage local pollinators for thorough fruit setting.",
            "Reduce irrigation 7-10 days before harvest to boost Brix sweetness and fruit firmness.",
            "Rotate fruits gently to ensure uniform ground color and avoid sunburn."
        ],
        "image": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80"
    },
    "mango": {
        "name": "Mango (Alphonso / Badami / Kesar)",
        "kannada_name": "ಮಾವಿನ ಹಣ್ಣು (Mango)",
        "hindi_name": "आम (Mango)",
        "scientific_name": "Mangifera indica",
        "category": "King of Fruits / Orchard",
        "suitable_soils": ["Deep Red Loamy", "Alluvial", "Well-drained Laterite"],
        "optimal_ph": "5.5 - 7.5",
        "water_requirement": "Moderate (700 - 1200 mm, drought hardy when established)",
        "growth_duration": "Perennial (annual fruiting March - June)",
        "expected_yield": "4 - 8 tonnes / acre for mature orchard",
        "primary_states": ["Karnataka (Srinivaspur, Dharwad)", "Maharashtra (Ratnagiri)", "Uttar Pradesh", "Andhra Pradesh"],
        "season": "Monsoon planting of grafted saplings",
        "npk_ratio": "1000:500:1000 grams N:P:K per mature tree / year",
        "growing_tips": [
            "Withhold irrigation for 2 months preceding flowering (Oct-Nov) to stimulate flower bud emergence.",
            "Spray potassium nitrate (1%) to break dormancy and stimulate synchronous panicle emergence.",
            "Hang methyl eugenol pheromone traps to control Oriental fruit fly attacks before harvest.",
            "Harvest with 1 cm stalk using mechanical pole clippers to avoid sap burn on the skin."
        ],
        "image": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80"
    }
}
