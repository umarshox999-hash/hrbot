const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;
const FILE = "data.json";

// JSON o‘qish
app.use(express.json());

// papkalarni ulash
app.use(express.static("public"));       // index.html
app.use("/admin", express.static("admin")); // admin panel

// data.json bo‘lmasa yaratadi
if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, "[]");
}

// ma'lumot o‘qish
function readData() {
  return JSON.parse(fs.readFileSync(FILE));
}

// ma'lumot yozish
function writeData(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// 📥 FORM DATA SAQLASH
app.post("/api/save", (req, res) => {
  const body = req.body;

  // bo‘sh kelmasin
  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({ error: "Bo‘sh ma’lumot" });
  }

  const data = readData();

  const newUser = {
    id: Date.now(),
    createdAt: new Date().toLocaleString(),
    ...body
  };

  data.push(newUser);
  writeData(data);

  res.json({ success: true });
});

// 📤 ADMIN UCHUN DATA
app.get("/api/data", (req, res) => {
  const data = readData();
  res.json(data.reverse());
});

// 🗑 O‘CHIRISH
app.delete("/api/delete/:id", (req, res) => {
  let data = readData();

  data = data.filter(item => item.id != req.params.id);

  writeData(data);

  res.json({ success: true });
});

// 🚀 SERVER START
app.listen(PORT, () => {
  console.log("🔥 Server ishlayapti!");
  console.log("👉 Form:  http://localhost:3000");
  console.log("👉 Admin: http://localhost:3000/admin");
});