const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔐 TOKEN
const TOKEN = "8756429163:AAGqydBAD6oxOVzZhKZbPfHXPs9idBrV1UY";

// 🌐 SAYT LINK
const WEB_URL = "https://hrbot-bot.onrender.com";

// 🤖 BOT
const bot = new TelegramBot(TOKEN, { polling: true });

// 📁 PAPKALAR
const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// 📦 MULTER (rasm yuklash)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// 📁 STATIC
app.use(express.static("public"));
app.use("/admin", express.static("admin"));
app.use("/uploads", express.static("uploads"));

// 📄 JSON parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📂 DATA FILE
const DATA_FILE = path.join(__dirname, "data.json");
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, "[]");
}

// 🤖 TELEGRAM START
bot.onText(/\/start/, (msg) => {

  // eski keyboardni o‘chirish
  bot.sendMessage(msg.chat.id, "🔄 Yangilanmoqda...", {
    reply_markup: {
      remove_keyboard: true
    }
  });

  // yangi keyboard
  setTimeout(() => {
    bot.sendMessage(msg.chat.id, "Anketani to‘ldiring 👇", {
      reply_markup: {
        keyboard: [
          [
            {
              text: "📝 Anketa to‘ldirish",
              web_app: { url: WEB_URL }
            }
          ]
        ],
        resize_keyboard: true
      }
    });
  }, 500);

});

// 📥 FORM QABUL QILISH
app.post("/submit", upload.single("photo"), (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync(DATA_FILE));

    const newUser = {
      ...req.body,
      photo: req.file ? req.file.filename : null,
      date: new Date().toLocaleString()
    };

    data.push(newUser);

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("Xatolik");
  }
});
// 📊 ADMIN DATA
app.get("/data", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(data);
  } catch (err) {
    res.json([]);
  }
});

// 🌍 ROOT TEST
app.get("/", (req, res) => {
  res.send("🚀 Server ishlayapti");
});

// 🚀 SERVER START
app.listen(PORT, () => {
  console.log(`✅ Server ishlayapti: ${PORT}`);
});

// ❌ BOT ERROR
bot.on("polling_error", (err) => {
  console.log("❌ Bot error:", err.message);
});
