# KrishiLink — Smart Farming, Better Future
> **AI-Powered Indian Agriculture Platform for Crop Recommendation, Plant Disease Diagnostics, Micro-Climate Advisories, and Government Subsidies.**

---

## 🌾 1. Project Vision & Architecture
**KrishiLink** is a modern, responsive, full-stack AI agriculture platform engineered to empower Indian farmers with data-driven decision making. It bridges advanced agronomic machine learning, satellite-grade meteorological intelligence, and government welfare programs into a clean, accessible interface designed for Indian regional conditions.

- **Target Audience:** Indian small, marginal, and commercial farmers, agricultural extension officers, agricultural college students, and hackathon evaluators.
- **Languages:** **English** and **Kannada (ಕನ್ನಡ)** with scalable architecture for Hindi, Telugu, and Tamil.

---

## 🛠️ 2. Technical Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS v4, Lucide React Icons |
| **Backend** | Python 3.14, Flask RESTful API, Flask-CORS |
| **Machine Learning** | Scikit-learn (Random Forest Classifier & ExtraTrees Vision Classifier), Pandas, NumPy, Joblib |
| **Computer Vision** | Pillow (PIL) foliar chromatic & necrotic lesion feature extraction |
| **Database** | MongoDB with automatic seamless fallback to a resilient local JSON document database in `backend/data/` |
| **Authentication** | Bcrypt password hashing, JSON Web Tokens (JWT) |
| **Meteorology** | Open-Meteo High-Resolution Agro-Meteorological API with cached offline fallback |

---

## ✨ 3. Key Features

### 🧠 A. Smart AI Crop Recommendation
- **Inputs:** Soil Type (Alluvial, Black/Regur, Red & Yellow, Laterite, Sandy Loam, Clayey), Soil pH (with dynamic acidity/alkalinity visual scale), Nitrogen (N), Phosphorus (P), Potassium (K), Temperature, Humidity, Rainfall, and Indian State/Region.
- **One-Click Live Weather Auto-Fill:** Automatically pulls current live local temperature, humidity, and rainfall directly from the weather station into the prediction form!
- **Regional Presets:** 1-click presets for Karnataka Red Loam (Ragi/Pulses), Cauvery Delta (Paddy/Sugarcane), and Deccan Black Cotton soils.
- **Machine Learning Engine:** Scikit-learn Random Forest model trained on 2,560 agro-climatic samples achieving **93.44% validation accuracy** across 16 major Indian crops (Rice, Ragi, Arecanut, Maize, Chilli, Cotton, Chickpea, Pigeonpea, Banana, Sugarcane, Tomato, Wheat, Coffee, Pomegranate, Watermelon, Mango).
- **Comprehensive Output:** Recommended crop with image, match score, water requirements, growth duration, expected yield per acre, NPK fertilizer dosing, agronomic rationale, 4 actionable growing tips, and alternative viable crops.
- **Transparent Status:** Displays model status and benchmark accuracy instead of fabricating predictions.

### 🍃 B. AI Plant Disease Detection Studio
- **Foliar Image Upload & Inspection:** Supports file drag-and-drop, camera photo upload, and instant image preview.
- **1-Click Test Samples:** Includes 5 sample leaves for instant evaluation:
  1. Tomato Early Blight (*Alternaria solani*)
  2. Tomato Late Blight (*Phytophthora infestans*)
  3. Rice Leaf Blast (*Magnaporthe oryzae*)
  4. Corn Common Rust (*Puccinia sorghi*)
  5. Healthy Foliage (*Vigorous leaf*)
- **Computer Vision Extraction:** Analyzes chromatic greenness ratios, chlorotic yellowing, necrotic lesion densities, and edge gradients. Validates whether the image depicts recognizable plant leaf tissue.
- **Diagnostic Report:**
  - Disease Name, Crop Name, Causative Pathogen, and Severity Badge (Low, Moderate, Severe).
  - Diagnostic Model Confidence (e.g. 91.8%).
  - Observable field symptoms.
  - Preventive cultural practices.
  - Organic & biological remedies (Neem oil, *Trichoderma*, sour buttermilk, *Pseudomonas*).
  - Recommended chemical fungicides/bactericides with safe dosage and Pre-Harvest Intervals (PHI).

### ⛅ C. Live Weather & 3 Practical Farming Advisories
- **Indian City/District Search:** Search any Indian village, taluk, or district (Mandya, Mysuru, Bengaluru, Belagavi, Pune, Ludhiana, Guntur, etc.) with GPS auto-detection.
- **Live Metrics:** Temperature, Feels Like, Atmospheric Humidity, Rainfall probability & mm, Wind Speed, and 5-Day Agricultural Forecast.
- **3 Actionable Agronomic Advisories:**
  1. **Irrigation Advisory:** Recommends holding or continuing irrigation based on 48h forecasted precipitation to prevent waterlogging and fertilizer leaching.
  2. **Spraying Window Warning:** Alerts farmers if wind speed exceeds 14 km/h (drift hazard) or if rain probability is high (wash-off risk).
  3. **Pest & Disease Outbreak Alert:** Detects micro-climates favorable for fungal blast or sucking pests (thrips/mites).

### 🏛️ D. Searchable Government Schemes Directory
- Verified directory with official government portals:
  - **PM-KISAN:** ₹6,000/year direct DBT income support.
  - **PM Fasal Bima Yojana (PMFBY):** Comprehensive crop insurance against natural calamities.
  - **PM Krishi Sinchayee Yojana (PMKSY):** Up to 90% subsidy on Drip and Sprinkler irrigation systems.
  - **Soil Health Card Scheme (SHC):** Free 12-parameter soil testing and customized advisory.
  - **Kisan Credit Card (KCC):** Institutional credit up to ₹3 Lakh at just 4% effective interest.
  - **PM-KUSUM:** Up to 60% subsidy for off-grid solar water pumps.
  - **Paramparagat Krishi Vikas Yojana (PKVY):** ₹50,000/ha subsidy for organic farming clusters.
  - **Karnataka Raitha Siri Scheme:** ₹10,000/ha incentive for minor millets (Ragi, Jowar).
- Search bar, category filters, eligibility checklists, required documents, step-by-step application walkthroughs, and direct links to official `.gov.in` sites.

### 📚 E. Crop Growing Guides & Additional Tools
- **Crop Guides:** Complete agronomic production manuals for Rice, Ragi, Arecanut, Maize, Chilli, Cotton, Tomato, Sugarcane, Wheat, Coffee, Pomegranate, Banana, Watermelon, and Mango.
- **Sustainable Farming:** Detailed guides for Drip Irrigation, Jeevamrutha, Panchagavya, Vermicomposting, Organic Mulching, and Farm Ponds (Krishi Honda).
- **Interactive Soil NPK Calculator:** Input soil test values and target crop to compute the exact number of 50kg bags of Urea, DAP, and Potash (MOP) required for your plot!
- **Seasonal Farming Calendar:** Interactive timelines for Kharif (Monsoon), Rabi (Winter), and Zaid (Summer).
- **Searchable Knowledge Base:** Instant answers to common farmer questions regarding e-KYC, subsidies, and organic certification.
- **Farmer Dashboard:** Stores saved recommendations, disease scan history, bookmarked schemes, and printable farm reports.
- **Demo Farmer Profile:** 1-Click login as **Ramesh Gowda** (Mandya, Karnataka) for zero-setup evaluator demonstration.

---

## 🚀 4. How to Run the Project Locally

### Prerequisites
- **Python 3.10+** (with `pip`)
- **Node.js v18+** (with `npm`)

### Step 1: Start the Backend (Flask API)
Open a terminal in the project directory:
```bash
cd backend
python -m pip install -r requirements.txt
python app.py
```
> The Flask server starts at **`http://127.0.0.1:5000`**.
> It automatically checks for MongoDB; if MongoDB is not running locally, it activates the built-in resilient local document store so everything works immediately!

### Step 2: Start the Frontend (Vite + React)
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
> The Vite development server starts at **`http://localhost:3000`** with automated proxying to the Flask backend.

Open your browser and navigate to **`http://localhost:3000`** to experience **KrishiLink**!

---

## 🧪 5. Testing the Application
- **Crop Recommendation:** Go to the AI Crop Recommendation section, click *"Karnataka Red Loam (Ragi / Pulses)"*, then click *"Auto-Fill with Live Local Weather"*, and click *"Analyze & Recommend Crop"*.
- **Plant Disease Studio:** Scroll to Plant Disease Detection, click any of the 5 sample leaves (e.g. *Tomato Early Blight* or *Rice Leaf Blast*), and click *"Diagnose Plant Disease"*.
- **Weather Advisory:** Enter `"Mandya"` or `"Mysuru"` in the weather search bar to view live metrics and practical spraying/irrigation advice.
- **Government Schemes:** Filter by *"Direct Financial Support"* or search *"PM-KISAN"*, click *"View Eligibility & Apply"* for the walkthrough.
- **Demo Login:** Click *"Login / Register"* in the navbar, then click *"1-Click Demo Farmer Login (Ramesh Gowda - Mandya)"*. Visit the *"Farmer Dashboard"* to inspect saved records.
- **Language Switch:** Click the language pill in the top right to switch between **English** and **ಕನ್ನಡ (Kannada)**.

---
© 2026 KrishiLink. Engineered for Indian Farmers.
