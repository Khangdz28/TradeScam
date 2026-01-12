const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

// 🔐 Discord webhook (GIỮ KÍN)
const WEBHOOK = "https://discord.com/api/webhooks/1383300250311196812/hphloKStYvMiUtk5xrWhD7hSF_V00rpfRtFoBaOZ_yu5K8QTp3vkuKtOwaUEqTrFsc3g";

app.post("/log", async (req, res) => {
    try {
        await fetch(WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body)
        });
        res.send("ok");
    } catch (err) {
        res.status(500).send("error");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy running"));