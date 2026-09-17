import express from "express";
import Portfolio from "../models/Portfolio.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Save or update user's portfolio (auth required — only owner can write)
router.post("/", verifyToken, async (req, res) => {
    const { userId, coins } = req.body;
    if (!userId || !coins) return res.status(400).json({ error: "Missing data" });

    // Ensure users can only update their own portfolio
    if (req.user.id !== userId) {
        return res.status(403).json({ error: "Forbidden: cannot modify another user's portfolio" });
    }

    try {
        const updated = await Portfolio.findOneAndUpdate(
            { userId },
            { coins },
            { new: true, upsert: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Failed to save portfolio" });
    }
});

// Get user's portfolio (auth required — only owner can read)
router.get("/:userId", verifyToken, async (req, res) => {
    // Ensure users can only read their own portfolio
    if (req.user.id !== req.params.userId) {
        return res.status(403).json({ error: "Forbidden: cannot access another user's portfolio" });
    }

    try {
        const data = await Portfolio.findOne({ userId: req.params.userId });
        res.json(data?.coins || []);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch portfolio" });
    }
});

export default router;