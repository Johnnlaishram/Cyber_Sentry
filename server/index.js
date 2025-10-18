// server/index.js
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Route: Forward React request → FastAPI phishing detector
app.post("/api/check-url", async (req, res) => {
  try {
    const { url } = req.body; // frontend sends { url: "https://..." }

    // ✅ Send to FastAPI endpoint
    const response = await axios.post("http://127.0.0.1:8000/check-url", { url });

    // ✅ Send FastAPI’s result back to frontend
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error calling FastAPI:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    res.status(500).json({ error: "Failed to connect to FastAPI" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Express server running on http://localhost:${PORT}`));
