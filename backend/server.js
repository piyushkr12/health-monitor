const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");
const client = require("prom-client");
client.collectDefaultMetrics();
const app = express();

app.use(cors());
app.use(express.json());

/* -------------------- MongoDB Connection -------------------- */

mongoose.connect("mongodb://db:27017/logdb")
  .then(() => console.log("!!! Mongo Connected !!!"))
  .catch(err => console.error("Mongo Connection Error:", err));

/* -------------------- Log Model -------------------- */

const Log = mongoose.model("Log", new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now }
}));

/* -------------------- Routes -------------------- */

app.get("/", (req, res) => {
  res.send("Backend is running ... ");
});

app.post("/logs", async (req, res) => {
  try {
    const logs = req.body.logs || "";

    await Log.create({ content: logs });

    const response = await axios.post(
      "http://ai-agent:6000/analyze",
      { logs }
    );

    res.json(response.data);

  } catch (error) {
    console.error("Error in /logs route:", error.message);
    res.status(500).json({ message: "Error processing logs" });
  }
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

/* -------------------- Start Server -------------------- */

app.listen(5020, () => {
  console.log("Backend running on port 5000 🚀");
});