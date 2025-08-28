export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: "Method not allowed" });
  }

  const { webhook, message, count } = req.body;

  if (!webhook || !message || !count) {
    return res.status(400).json({ status: "Webhook, message, dan count wajib diisi!" });
  }

  try {
    for (let i = 0; i < count; i++) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message })
      });
    }
    res.json({ status: `Berhasil mengirim ${count} pesan!` });
  } catch (err) {
    res.status(500).json({ status: "Gagal mengirim: " + err.message });
  }
}
