"""
KrishiLink AI - Crop Recommendation ML Model Training
Trains a Scikit-Learn Random Forest Classifier on realistic agronomic datasets
covering major Indian food crops, cash crops, millets, and pulses.
"""

import os
import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score

# Seed for reproducibility
np.random.seed(42)

# Soil type numerical mapping
SOIL_TYPES = ["Alluvial", "Black Soil", "Red & Yellow", "Laterite", "Sandy Loam", "Clayey"]
SOIL_MAP = {st.lower(): i for i, st in enumerate(SOIL_TYPES)}

# Target crops with typical agro-climatic boundaries [min, max]
# Features: [N, P, K, temperature(C), humidity(%), ph, rainfall(mm)]
CROP_SPECS = {
    "rice": {
        "N": (60, 110), "P": (35, 65), "K": (35, 65),
        "temp": (21, 32), "humidity": (75, 95), "ph": (5.5, 7.2), "rainfall": (160, 290),
        "soils": ["Clayey", "Alluvial", "Clay Loam"]
    },
    "ragi": {
        "N": (35, 65), "P": (25, 50), "K": (20, 45),
        "temp": (19, 32), "humidity": (50, 75), "ph": (5.5, 7.5), "rainfall": (45, 95),
        "soils": ["Red & Yellow", "Laterite", "Sandy Loam"]
    },
    "arecanut": {
        "N": (80, 140), "P": (40, 80), "K": (100, 180),
        "temp": (20, 34), "humidity": (70, 92), "ph": (5.5, 7.5), "rainfall": (150, 320),
        "soils": ["Laterite", "Red & Yellow", "Alluvial"]
    },
    "maize": {
        "N": (75, 130), "P": (40, 70), "K": (30, 60),
        "temp": (18, 30), "humidity": (55, 78), "ph": (5.8, 7.5), "rainfall": (60, 120),
        "soils": ["Sandy Loam", "Alluvial", "Black Soil"]
    },
    "chilli": {
        "N": (70, 120), "P": (40, 70), "K": (50, 90),
        "temp": (18, 32), "humidity": (55, 80), "ph": (6.0, 7.2), "rainfall": (50, 100),
        "soils": ["Black Soil", "Red & Yellow", "Sandy Loam"]
    },
    "cotton": {
        "N": (70, 130), "P": (30, 60), "K": (30, 60),
        "temp": (22, 35), "humidity": (45, 70), "ph": (6.5, 8.2), "rainfall": (50, 95),
        "soils": ["Black Soil", "Alluvial"]
    },
    "chickpea": {
        "N": (20, 45), "P": (45, 75), "K": (20, 45),
        "temp": (15, 25), "humidity": (40, 65), "ph": (6.0, 7.8), "rainfall": (30, 65),
        "soils": ["Black Soil", "Alluvial", "Sandy Loam"]
    },
    "pigeonpeas": {
        "N": (20, 45), "P": (40, 70), "K": (20, 40),
        "temp": (20, 32), "humidity": (45, 70), "ph": (6.0, 7.5), "rainfall": (60, 120),
        "soils": ["Black Soil", "Red & Yellow", "Sandy Loam"]
    },
    "banana": {
        "N": (100, 150), "P": (60, 90), "K": (120, 200),
        "temp": (24, 34), "humidity": (75, 92), "ph": (6.0, 7.5), "rainfall": (120, 220),
        "soils": ["Alluvial", "Clayey", "Red & Yellow"]
    },
    "sugarcane": {
        "N": (120, 180), "P": (60, 90), "K": (80, 140),
        "temp": (22, 35), "humidity": (60, 85), "ph": (6.5, 8.0), "rainfall": (120, 250),
        "soils": ["Alluvial", "Black Soil", "Clayey"]
    },
    "tomato": {
        "N": (80, 130), "P": (50, 80), "K": (60, 100),
        "temp": (18, 30), "humidity": (50, 75), "ph": (6.0, 7.0), "rainfall": (50, 95),
        "soils": ["Sandy Loam", "Red & Yellow", "Alluvial"]
    },
    "wheat": {
        "N": (80, 135), "P": (40, 65), "K": (30, 55),
        "temp": (12, 24), "humidity": (45, 70), "ph": (6.0, 7.5), "rainfall": (35, 75),
        "soils": ["Alluvial", "Black Soil", "Clayey"]
    },
    "coffee": {
        "N": (80, 130), "P": (40, 70), "K": (80, 130),
        "temp": (18, 28), "humidity": (70, 90), "ph": (5.5, 6.5), "rainfall": (130, 240),
        "soils": ["Laterite", "Red & Yellow"]
    },
    "pomegranate": {
        "N": (60, 100), "P": (40, 70), "K": (60, 100),
        "temp": (20, 35), "humidity": (40, 65), "ph": (6.5, 7.8), "rainfall": (40, 70),
        "soils": ["Sandy Loam", "Black Soil", "Red & Yellow"]
    },
    "watermelon": {
        "N": (80, 120), "P": (40, 60), "K": (40, 60),
        "temp": (24, 35), "humidity": (45, 65), "ph": (6.0, 7.0), "rainfall": (40, 70),
        "soils": ["Sandy Loam", "Alluvial"]
    },
    "mango": {
        "N": (80, 140), "P": (40, 75), "K": (80, 140),
        "temp": (24, 36), "humidity": (50, 75), "ph": (5.5, 7.5), "rainfall": (60, 140),
        "soils": ["Red & Yellow", "Alluvial", "Laterite"]
    }
}

def generate_crop_dataset(samples_per_crop=150):
    """Generates synthetic agronomic dataset based on real agricultural field boundaries."""
    records = []
    
    for crop, specs in CROP_SPECS.items():
        for _ in range(samples_per_crop):
            # Sample with slight Gaussian variation around the interval center
            def sample_val(bounds):
                low, high = bounds
                mean = (low + high) / 2.0
                std = (high - low) / 4.5
                val = np.random.normal(mean, std)
                return max(low * 0.85, min(high * 1.15, val))
            
            n = round(sample_val(specs["N"]), 1)
            p = round(sample_val(specs["P"]), 1)
            k = round(sample_val(specs["K"]), 1)
            temp = round(sample_val(specs["temp"]), 1)
            humidity = round(sample_val(specs["humidity"]), 1)
            ph = round(sample_val(specs["ph"]), 2)
            rainfall = round(sample_val(specs["rainfall"]), 1)
            
            records.append({
                "N": n, "P": p, "K": k,
                "temperature": temp,
                "humidity": humidity,
                "ph": ph,
                "rainfall": rainfall,
                "label": crop
            })
            
    df = pd.DataFrame(records)
    return df

def train_and_export_crop_model():
    """Trains Random Forest Classifier and saves artifact."""
    print("Generating training dataset for KrishiLink AI...")
    df = generate_crop_dataset(samples_per_crop=200)
    
    feature_cols = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
    X = df[feature_cols]
    y = df["label"]
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    print(f"Training Random Forest Classifier on {len(X_train)} samples across {y.nunique()} crops...")
    model = RandomForestClassifier(n_estimators=120, max_depth=16, random_state=42)
    model.fit(X_train, y_train)
    
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    print(f"Model Validation Accuracy: {acc * 100:.2f}%")
    
    # Save model and metadata
    script_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(script_dir, "crop_model.joblib")
    
    artifact = {
        "model": model,
        "feature_cols": feature_cols,
        "classes": list(model.classes_),
        "accuracy": acc,
        "crop_specs": CROP_SPECS
    }
    
    joblib.dump(artifact, model_path)
    print(f"Model successfully saved to: {model_path}")
    return model_path

if __name__ == "__main__":
    train_and_export_crop_model()
