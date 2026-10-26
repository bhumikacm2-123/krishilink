"""
KrishiLink - Indian Agricultural Government Schemes Directory
Comprehensive verified directory with eligibility, direct benefits, application steps,
and official government links (.gov.in / .nic.in).
"""

GOVERNMENT_SCHEMES = [
    {
        "id": "pm-kisan",
        "name": "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
        "kannada_name": "ಪಿಎಂ-ಕಿಸಾನ್ (ಪ್ರಧಾನ ಮಂತ್ರಿ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ)",
        "ministry": "Ministry of Agriculture & Farmers Welfare, GoI",
        "category": "Direct Financial Support",
        "status": "Verified Official Scheme",
        "is_verified": True,
        "badge": "Central Sector",
        "financial_benefit": "₹6,000 per year (in 3 equal installments of ₹2,000)",
        "short_description": "Central sector scheme providing income support to all landholding farmer families across India to supplement their financial needs for procuring agricultural inputs and domestic necessities.",
        "eligibility": [
            "All landholding farmer families with cultivable land parcels in their names.",
            "Both small/marginal and medium farmers are eligible.",
            "Institutional landholders and serving/retired government employees with high pensions (>₹10,000) are excluded."
        ],
        "benefits": [
            "₹6,000 transferred directly into the farmer's Aadhaar-linked bank account via DBT.",
            "Disbursed in three 4-monthly cycles (April-July, August-November, December-March).",
            "Zero middleman deduction, direct central DBT."
        ],
        "application_steps": [
            "Visit the official PM-KISAN portal (pmkisan.gov.in) or visit your nearest CSC / Grama One Center.",
            "Click on 'New Farmer Registration' and enter your 12-digit Aadhaar Number and State.",
            "Input land ownership survey number (RTC/Pahani) and active Aadhaar-linked bank details.",
            "Complete mandatory e-KYC via Aadhaar OTP or biometric at CSC center.",
            "State Nodal Officer verifies land record and payment cycle commences."
        ],
        "required_documents": [
            "Aadhaar Card",
            "Land Record / RTC (Pahani / Khasra)",
            "Bank Passbook (Aadhaar linked)",
            "Mobile number registered with Aadhaar"
        ],
        "official_url": "https://pmkisan.gov.in/",
        "helpline": "155261 / 011-24300606"
    },
    {
        "id": "pmfby",
        "name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        "kannada_name": "ಪ್ರಧಾನ ಮಂತ್ರಿ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ (ಬೆಳೆ ವಿಮೆ)",
        "ministry": "Ministry of Agriculture & Farmers Welfare, GoI",
        "category": "Crop Insurance",
        "status": "Verified Official Scheme",
        "is_verified": True,
        "badge": "Risk Coverage",
        "financial_benefit": "Full sum insured payout against non-preventable natural calamities",
        "short_description": "Flagship comprehensive crop insurance scheme providing complete financial support to farmers suffering crop loss or damage arising from unseasonal rains, drought, flood, pests, and cyclones.",
        "eligibility": [
            "All farmers growing notified crops in notified areas (both loanee and non-loanee farmers).",
            "Sharecroppers and tenant farmers growing notified crops are also eligible.",
            "Covers Kharif, Rabi food crops, oilseeds, and annual horticultural crops."
        ],
        "benefits": [
            "Ultra-low farmer premium rate: Only 2% for Kharif crops, 1.5% for Rabi crops, and 5% for commercial/horticultural crops.",
            "Remaining premium balance is heavily subsidized equally by Central and State Governments.",
            "Covers prevented sowing, standing crop damage, mid-season adversity, and post-harvest losses up to 14 days."
        ],
        "application_steps": [
            "Enroll before the cutoff date (usually July 31 for Kharif, Dec 31 for Rabi) on pmfby.gov.in or Samrakshane portal (for Karnataka).",
            "Enter land survey details, crop sown, and coverage area.",
            "Pay the nominal farmer premium online or at your primary cooperative society / bank branch.",
            "In case of localized calamity (hailstorm, cloudburst), report within 72 hours on Crop Insurance App."
        ],
        "required_documents": [
            "Aadhaar Card",
            "Land Record (RTC / Pahani / Patta)",
            "Sowing Certificate / Declaration from Village Accountant",
            "Bank Account Details"
        ],
        "official_url": "https://pmfby.gov.in/",
        "helpline": "1800-180-1551"
    },
    {
        "id": "pmksy",
        "name": "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
        "kannada_name": "ಪ್ರಧಾನ ಮಂತ್ರಿ ಕೃಷಿ ಸಿಂಚಾಯಿ ಯೋಜನೆ (ಹನಿ ನೀರಾವರಿ)",
        "ministry": "Ministry of Jal Shakti & Dept of Agriculture",
        "category": "Irrigation & Water Conservation",
        "status": "Verified Official Scheme",
        "is_verified": True,
        "badge": "Per Drop More Crop",
        "financial_benefit": "Up to 55% - 90% subsidy on Drip and Sprinkler irrigation systems",
        "short_description": "National mission aimed at achieving 'Har Khet Ko Pani' (water to every field) and enhancing water-use efficiency through 'Per Drop More Crop' precision micro-irrigation.",
        "eligibility": [
            "All farmers owning agricultural land with a reliable water source (borewell, open well, or farm pond).",
            "Special higher subsidy rates for Small & Marginal farmers (up to 90% in Karnataka and several states).",
            "Members of cooperative farming societies and water user associations."
        ],
        "benefits": [
            "Saves 40% to 60% irrigation water while boosting crop yield by 25% to 45%.",
            "Enables precision fertigation (applying fertilizers dissolved in irrigation water directly at roots).",
            "Substantial subsidy on micro-irrigation hardware (pipes, drippers, filters, venturi injector)."
        ],
        "application_steps": [
            "Submit application through State Agriculture/Horticulture portal (e.g., Raitha Siri / Karnataka Horticulture portal).",
            "Field survey and water source verification conducted by assistant horticulture officer.",
            "Receive administrative approval and select empanelled drip manufacturer.",
            "Installation completed and verified via GPS geotagging before subsidy disbursement."
        ],
        "required_documents": [
            "Land RTC / 7/12 Extract",
            "Electricity connection certificate or solar pump NOC",
            "Aadhaar Card and caste certificate (if applicable for enhanced subsidy)",
            "Bank Passbook"
        ],
        "official_url": "https://pmksy.gov.in/",
        "helpline": "011-23381012"
    },
    {
        "id": "soil-health-card",
        "name": "Soil Health Card Scheme (SHC)",
        "kannada_name": "ಮಣ್ಣು ಆರೋಗ್ಯ ಕಾರ್ಡ್ ಯೋಜನೆ",
        "ministry": "Ministry of Agriculture & Farmers Welfare, GoI",
        "category": "Soil Testing & Fertility",
        "status": "Verified Official Scheme",
        "is_verified": True,
        "badge": "Free Soil Testing",
        "financial_benefit": "Free comprehensive 12-parameter soil testing and customized fertilizer card",
        "short_description": "Promotes balanced nutrient application by issuing comprehensive soil health report cards to farmers every 2-3 years, preventing wasteful chemical fertilizer overuse and restoring soil vitality.",
        "eligibility": [
            "Open to all farmers across all Indian states and Union Territories.",
            "Covers both irrigated and rainfed holdings.",
            "Soil samples collected by local Krishi Vigyan Kendra (KVK) or Agriculture Department staff."
        ],
        "benefits": [
            "Tests 12 critical parameters: N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, and Organic Carbon.",
            "Provides exact crop-specific dosage of chemical and organic fertilizers required for your field.",
            "Reduces input cost by 15-20% and prevents soil acidification and groundwater nitrate toxicity."
        ],
        "application_steps": [
            "Visit your local Raitha Samparka Kendra (RSK) or KVK to submit a soil sample request.",
            "Collect soil samples in a zig-zag pattern from 8-10 spots across the plot (0-15 cm depth).",
            "Hand over dried sample with plot details to the testing laboratory.",
            "Download your digital Soil Health Card directly from soilhealth.dac.gov.in."
        ],
        "required_documents": [
            "Farmer Aadhaar Card",
            "Land Survey Number / RTC details"
        ],
        "official_url": "https://soilhealth.dac.gov.in/",
        "helpline": "011-24305948"
    },
    {
        "id": "kcc",
        "name": "Kisan Credit Card (KCC)",
        "kannada_name": "ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ (ಕೆಸಿಸಿ)",
        "ministry": "Ministry of Finance & NABARD / RBI",
        "category": "Low-Interest Credit",
        "status": "Verified Official Scheme",
        "is_verified": True,
        "badge": "4% Effective Interest",
        "financial_benefit": "Revolving credit limit up to ₹3 Lakh at an effective interest rate of just 4% p.a.",
        "short_description": "Pioneering institutional credit facility granting farmers timely, hassle-free credit to meet cultivation expenses, post-harvest costs, and maintenance of farm assets.",
        "eligibility": [
            "Individual farmers, joint borrowers, tenant farmers, oral lessees, and sharecroppers.",
            "Self-Help Groups (SHGs) and Joint Liability Groups (JLGs) of farmers.",
            "Also extended to Animal Husbandry, Dairy, and Fisheries farmers."
        ],
        "benefits": [
            "Interest subvention of 2% by GoI + 3% prompt repayment incentive brings effective interest to just 4%.",
            "Collateral-free loan limit up to ₹1.60 Lakh (extended to ₹2.0 Lakh for dairy/fisheries).",
            "Flexible ATM-enabled RuPay debit card for cash withdrawal from any bank ATM.",
            "Built-in crop insurance coverage under PMFBY."
        ],
        "application_steps": [
            "Download 1-page simplified KCC form from any commercial bank website or pmkisan.gov.in.",
            "Fill in crop cultivated, landholding area, and submit to your bank branch or Primary Agricultural Cooperative Society (PACS).",
            "Bank processes and issues KCC RuPay card within 14 working days."
        ],
        "required_documents": [
            "Filled KCC Application Form",
            "Identity Proof (Aadhaar / Voter ID)",
            "Land title documents (RTC / Pahani / Lease deed)",
            "Passport size photograph"
        ],
        "official_url": "https://www.myscheme.gov.in/schemes/kcc",
        "helpline": "1800-11-5526"
    },
    {
        "id": "pm-kusum",
        "name": "PM-KUSUM (Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan)",
        "kannada_name": "ಪಿಎಂ-ಕುಸುಮ್ (ಸೌರ ನೀರಾವರಿ ಪಂಪ್ ಯೋಜನೆ)",
        "ministry": "Ministry of New and Renewable Energy (MNRE)",
        "category": "Solar Energy & Irrigation",
        "status": "Verified Official Scheme",
        "is_verified": True,
        "badge": "60% Subsidy",
        "financial_benefit": "Up to 60% government subsidy (30% Central + 30% State) for Standalone Solar Pumps",
        "short_description": "Promotes de-dieselization of farm irrigation by subsidizing high-efficiency off-grid solar water pumps and enabling farmers to set up grid-connected solar power plants on barren lands.",
        "eligibility": [
            "Individual farmers, groups of farmers, FPOs, and Water User Associations.",
            "Must possess agricultural land and borewell/well requiring irrigation pump.",
            "Component B specifically supports off-grid standalone solar pumps (3 HP to 10 HP)."
        ],
        "benefits": [
            "Farmer pays only 10% of total project cost (30% loan from bank, 60% direct subsidy).",
            "Reliable daytime solar irrigation, eliminating dependence on unreliable night-time grid power.",
            "Zero recurring electricity bills and zero diesel expenditure."
        ],
        "application_steps": [
            "Apply through your State Nodal Renewable Energy Agency (e.g., KREDL in Karnataka, MEDA in Maharashtra).",
            "Select pump capacity (3HP, 5HP, or 7.5HP submersible/surface).",
            "Inspection and installation completed by accredited solar vendor."
        ],
        "required_documents": [
            "Aadhaar Card",
            "Land title documents",
            "Borewell / Water source certificate",
            "Bank account passbook"
        ],
        "official_url": "https://pmkusum.mnre.gov.in/",
        "helpline": "1800-180-3333"
    },
    {
        "id": "pkvy",
        "name": "Paramparagat Krishi Vikas Yojana (PKVY)",
        "kannada_name": "ಪರಂಪರಾಗತ್ ಕೃಷಿ ವಿಕಾಸ ಯೋಜನೆ (ಸಾವಯವ ಕೃಷಿ)",
        "ministry": "Ministry of Agriculture & Farmers Welfare, GoI",
        "category": "Organic Farming & Soil Health",
        "status": "Verified Official Scheme",
        "is_verified": True,
        "badge": "Organic Farming",
        "financial_benefit": "₹50,000 per hectare over 3 years for organic cluster certification and inputs",
        "short_description": "Sub-component of National Mission on Sustainable Agriculture encouraging indigenous traditional organic farming through Participatory Guarantee System (PGS) certification clusters.",
        "eligibility": [
            "Groups of farmers forming clusters of 20 or more hectares in contiguous village areas.",
            "Farmers committed to eliminating synthetic chemical pesticides and fertilizers."
        ],
        "benefits": [
            "₹31,000/ha provided directly for organic inputs (Jeevamrutha, bio-fertilizers, vermicompost).",
            "₹8,800/ha for value addition, packaging, and marketing.",
            "Free PGS-India organic certification label for premium price realization in urban markets."
        ],
        "application_steps": [
            "Form a cluster of 20-50 farmers with minimum 20 hectares.",
            "Register cluster through District Agriculture Joint Director office or ATMA coordinator.",
            "Undergo training and transition into certified organic protocols."
        ],
        "required_documents": [
            "Farmer Group / Cluster Resolution",
            "Aadhaar cards of all member farmers",
            "Land records of cluster plots"
        ],
        "official_url": "https://pgsindia-ncof.gov.in/pkvy/index.aspx",
        "helpline": "0120-2764906"
    },
    {
        "id": "raitha-siri",
        "name": "Karnataka Raitha Siri Scheme (Millet Promotion)",
        "kannada_name": "ಕರ್ನಾಟಕ ರೈತ ಸಿರಿ ಯೋಜನೆ (ಸಿರಿಧಾನ್ಯ ಪ್ರೋತ್ಸಾಹ)",
        "ministry": "Department of Agriculture, Government of Karnataka",
        "category": "State Specific Millet Incentive",
        "status": "Verified State Scheme",
        "is_verified": True,
        "badge": "Karnataka State",
        "financial_benefit": "Direct cash incentive of ₹10,000 per hectare for growing minor millets",
        "short_description": "Karnataka state initiative providing direct financial incentive into farmers' bank accounts for cultivating nutritious, drought-hardy millets like Ragi, Foxtail, Little, Kodo, and Barnyard millets.",
        "eligibility": [
            "Farmers cultivating notified millets in Karnataka state.",
            "Maximum benefit up to 2 hectares (₹20,000 total incentive per farmer).",
            "Must register crop details on the Karnataka Fruit / Crop Survey portal."
        ],
        "benefits": [
            "Direct incentive of ₹10,000/ha deposited in two phases (₹6,000 at vegetative stage, ₹4,000 post-harvest).",
            "Guaranteed minimum support price procurement through state food depots.",
            "Free distribution of certified improved millet seed mini-kits."
        ],
        "application_steps": [
            "Ensure your sown millet crop is captured on the Karnataka Crop Survey App (Bele Darshini).",
            "Visit Raitha Samparka Kendra (RSK) with your FRUITS ID (Farmer Registration and Unified Beneficiary Information System).",
            "Incentive credited via DBT directly to linked bank account."
        ],
        "required_documents": [
            "Karnataka FRUITS ID / FID",
            "Aadhaar Card",
            "Pahani / RTC showing millet crop entry"
        ],
        "official_url": "https://fruits.karnataka.gov.in/",
        "helpline": "1800-425-3553"
    }
]
