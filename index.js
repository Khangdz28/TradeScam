const express = require("express");
const fetch = require("node-fetch");

const app = express();

/**
 * FIX QUAN TRỌNG:
 * Roblox đôi khi gửi body rỗng nếu server không parse đúng
 */
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// TEST ROUTE (mở trình duyệt cũng thấy)
app.get("/", (req, res) => {
    res.send("Proxy is alive");
});

const WEBHOOK = process.env.WEBHOOK || "https://discord.com/api/webhooks/1383300250311196812/hphloKStYvMiUtk5xrWhD7hSF_V00rpfRtFoBaOZ_yu5K8QTp3vkuKtOwaUEqTrFsc3g";

app.post("/log", async (req, res) => {
    console.log("INCOMING:", req.body); // 👈 LOG BẮT BUỘC

    try {
        await fetch(WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body)
        });

        res.status(200).send("ok");
    } catch (e) {
        console.error("DISCORD FAIL:", e);
        res.status(500).send("fail");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy running on port", PORT));
