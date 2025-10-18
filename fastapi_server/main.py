from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import tldextract
import time
import secrets
import json
import sqlite3
import logging
from datetime import datetime

# ========================
# Logging Configuration
# ========================
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ========================
# Database Helper
# ========================
class PhishingDatabase:
    def __init__(self, db_path="phishing.db"):
        self.conn = sqlite3.connect(db_path, check_same_thread=False)
        self.conn.row_factory = sqlite3.Row
        self.init_db()

    def init_db(self):
        cursor = self.conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS threat_intelligence (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                threat_type TEXT,
                domain TEXT UNIQUE,
                data TEXT,
                risk_score INTEGER DEFAULT 50,
                is_active BOOLEAN DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        self.conn.commit()
        self.seed_data()

    def seed_data(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT COUNT(*) as c FROM threat_intelligence")
        if cursor.fetchone()["c"] == 0:
            # Shorteners
            shorteners = ["bit.ly", "tinyurl.com", "t.co", "goo.gl"]
            for s in shorteners:
                cursor.execute(
                    "INSERT OR IGNORE INTO threat_intelligence (threat_type, domain, risk_score) VALUES (?, ?, ?)",
                    ("shortener", s, 35)
                )
            # Legitimate Sites
            legit_sites = ["facebook.com", "github.com", "web.telegram.org"]
            for d in legit_sites:
                cursor.execute(
                    "INSERT OR IGNORE INTO threat_intelligence (threat_type, domain, risk_score) VALUES (?, ?, ?)",
                    ("legitimate_site", d, 0)
                )
            self.conn.commit()

    def get_legitimate_sites(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT domain FROM threat_intelligence WHERE threat_type='legitimate_site' AND is_active=1")
        return [row["domain"] for row in cursor.fetchall()]

    def get_shorteners(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT domain FROM threat_intelligence WHERE threat_type='shortener' AND is_active=1")
        return [row["domain"] for row in cursor.fetchall()]

# ========================
# AI/Heuristic Analyzer
# ========================
class PhishingAnalyzer:
    def __init__(self, db: PhishingDatabase):
        self.db = db

    def extract_domain(self, url: str) -> str:
        ext = tldextract.extract(url)
        return f"{ext.domain}.{ext.suffix}".lower()

    def analyze_url(self, url: str) -> Dict[str, Any]:
        start_time = time.time()
        domain = self.extract_domain(url)
        legitimate_sites = self.db.get_legitimate_sites()
        shorteners = self.db.get_shorteners()

        # Simple heuristics
        is_legit = domain in legitimate_sites
        uses_shortener = domain in shorteners
        risk_score = 10 if is_legit else (80 if uses_shortener else 50)
        heuristic_verdict = "PHISHING" if risk_score > 50 else ("SUSPICIOUS" if uses_shortener else "CLEAN")
        is_phishing = heuristic_verdict == "PHISHING"

        # AI mock
        ai_analysis = {
            "prediction": "phishing" if risk_score > 50 else "legitimate",
            "confidence": risk_score / 100
        }

        response = {
            "status": "success",
            "risk_score": risk_score,
            "risk_level": "High" if risk_score > 50 else ("Medium" if risk_score > 30 else "Low"),
            "is_phishing": is_phishing,
            "heuristic_verdict": heuristic_verdict,
            "database_match": is_legit,
            "warnings": [] if not is_phishing else ["Possible phishing detected"],
            "recommendations": ["Do not enter credentials"] if is_phishing else ["Normal caution advised"],
            "uses_shortener": uses_shortener,
            "analysis_details": {
                "original_url": url,
                "ai_analysis": ai_analysis,
                "analysis_id": f"analysis_{int(time.time())}_{secrets.token_hex(4)}"
            },
            "processing_time": round(time.time() - start_time, 2),
            "auto_learned": False,
            "learned_as": None
        }

        return response

# ========================
# Pydantic Models
# ========================
class URLRequest(BaseModel):
    url: str
    deep_analysis: Optional[bool] = False

class HeuristicResponse(BaseModel):
    status: str
    risk_score: int
    risk_level: str
    is_phishing: bool
    heuristic_verdict: str
    database_match: bool
    warnings: List[str]
    recommendations: List[str]
    uses_shortener: bool
    analysis_details: Dict[str, Any]
    processing_time: float
    auto_learned: bool
    learned_as: Optional[str] = None

# ========================
# FastAPI App
# ========================
app = FastAPI(
    title="Phishing Detector API",
    description="AI + Heuristic Phishing Detector",
    version="1.0"
)

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

db = PhishingDatabase()
analyzer = PhishingAnalyzer(db)

# ========================
# API Endpoints
# ========================
@app.post("/check-url", response_model=HeuristicResponse)
def check_url(request: URLRequest):
    try:
        result = analyzer.analyze_url(request.url)
        return result
    except Exception as e:
        logger.error(f"Error analyzing URL: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "database_connected": db.conn is not None
    }

# ========================
# Run
# ========================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
