import express from "express";
import { connectToDB } from "./config/db.js";
import dotenv from "dotenv";
import User from "./models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

// Middlewares

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

const PORT = process.env.PORT || 5000;

const AI_MODEL = process.env.GOOGLE_GENAI_MODEL || "gemini-2.5-flash";
const AI_CONFIG = { responseMimeType: "text/plain" };
const aiClient = process.env.GOOGLE_GENAI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY })
  : null;

if (!process.env.GOOGLE_GENAI_API_KEY) {
  console.warn("Warning: GOOGLE_GENAI_API_KEY is not set. /api/ai/recommend will return 500.");
}

app.get("/", (req, res) => {
  res.send("Hello World24567!");
});

app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      throw new Error("All fields are required!");
    }

    const emailExists = await User.findOne({ email });

    if (emailExists) {
        return res.status(400).json({ message: "User already exists!" });
    }

    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
        return res.status(400).json({ message: "Username is taken, try another one!" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const userDoc = await User.create({
        username,
        email,
        password: hashedPassword,
    })

    // Generate JWT token
    if(userDoc) {
        const token = jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            
        })
    }

    return res.status(200).json({ user: userDoc, message: "User created successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/api/login", async (req, res) => {
    const {username, password} = req.body;

    try{
        const userDoc = await User.findOne({username});
        if(!userDoc) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        const isPasswordValid = await bcryptjs.compareSync(password, userDoc.password);
        if(!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        // Generate JWT token
        if(userDoc) {
            const token = jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            })
        }

        return res.status(200).json({ user: userDoc, message: "Login successful!" });
    }catch(error) {
        console.error("Error during login:", error.message);
        res.status(400).json({ message: error.message });
    }
});

app.get("/api/fetch-user", async (req, res) => {
    const {token} = req.cookies;

    if(!token) {
        return res.status(401).json({ message: "Unauthorized access!" });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
            return res.status(401).json({ message: "Unauthorized access!" });
        }
        const userDoc = await User.findById(decoded.id).select("-password");
        if(!userDoc) {
            return res.status(400).json({ message: "User not found!" });
        }
        res.status(200).json({ user: userDoc });
    }catch(error) {
        console.error("Error in fetching user:", error.message);
        return res.status(400).json({ message: error.message });
    }
});

app.post("/api/logout", async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful!" });
});

app.post("/api/ai/recommend", async (req, res) => {
  if (!aiClient) {
    return res.status(500).json({ error: "AI client is not configured on the server." });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt in request body." });
  }

  try {
    console.log("/api/ai/recommend prompt:", (prompt || '').substring(0, 200));
    const response = await aiClient.models.generateContent({
      model: AI_MODEL,
      config: AI_CONFIG,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // Log a compact shape for debugging
    try {
      console.dir(response, { depth: 3 });
    } catch (e) {
      console.log("AI response (unable to dir):", typeof response);
    }

    // Try multiple common response shapes to extract text
    const extractText = (resp) => {
      if (!resp) return null;
      const paths = [
        () => resp?.candidates?.[0]?.contents?.parts?.[0]?.text,
        () => resp?.candidates?.[0]?.content?.[0]?.text,
        () => resp?.output?.[0]?.content?.[0]?.text,
        () => resp?.output?.[0]?.content?.[0]?.message?.content?.[0]?.text,
        () => resp?.result?.[0]?.content?.[0]?.text,
        () => resp?.text,
      ];

      for (const p of paths) {
        try {
          const v = p();
          if (v && typeof v === "string" && v.trim().length > 0) return v;
        } catch (e) {
          // ignore
        }
      }

      // last resort: inspect candidates for any string-ish fields
      if (Array.isArray(resp?.candidates)) {
        for (const c of resp.candidates) {
          for (const key of Object.keys(c || {})) {
            const val = c[key];
            if (typeof val === "string" && val.trim()) return val;
            if (Array.isArray(val)) {
              for (const item of val) {
                if (typeof item === "string" && item.trim()) return item;
                if (item?.text && typeof item.text === "string" && item.text.trim()) return item.text;
              }
            }
          }
        }
      }

      return null;
    };

    const text = extractText(response) || null;
    console.log("AI extracted text length:", (text || "").length);

    return res.status(200).json({ text });
  } catch (error) {
    console.error("AI proxy error:", error);
    return res.status(500).json({ error: "AI request failed.", detail: error?.message || "Unknown error" });
  }
});

app.listen(PORT, () => {
  connectToDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
