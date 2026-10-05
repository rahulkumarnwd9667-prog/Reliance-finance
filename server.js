require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// MONGODB
const client = new MongoClient(process.env.MONGODB_URI);

async function getDB() {
    await client.connect();
    return client.db("relianceFinance");
}

// SUBMIT APPLICATION
app.post("/submit-application", async (req, res) => {
    try {
        const application = req.body;

        if (!application.name || !application.mobile) {
            return res.status(400).json({
                success: false,
                message: "Name aur mobile number required hai."
            });
        }

        const db = await getDB();

        await db.collection("applications").insertOne({
            ...application,
            created_at: new Date()
        });

        res.json({
            success: true,
            message: "Application successfully save ho gaya."
        });

    } catch (error) {
        console.log("MongoDB Error:", error);

        res.status(500).json({
            success: false,
            message: "Application save nahi hua."
        });
    }
});

// GET APPLICATIONS
app.get("/applications", async (req, res) => {
    try {
        const db = await getDB();

        const applications = await db
            .collection("applications")
            .find({})
            .sort({ created_at: -1 })
            .toArray();

        res.json(applications);

    } catch (error) {
        console.log("MongoDB Error:", error);

        res.status(500).json({
            success: false,
            message: "Applications load nahi hui."
        });
    }
});

if (process.env.VERCEL !== "1") {
    app.listen(PORT, () => {
        console.log("RELIANCE FINANCE SERVER RUNNING ON PORT " + PORT);
    });
}

module.exports = app;