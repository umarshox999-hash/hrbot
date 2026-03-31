const TelegramBot = require('node-telegram-bot-api');

// 🔐 BOT TOKEN
const token = "8756429163:AAGqydBAD6oxOVzZhKZbPfHXPs9idBrV1UY";

// 🤖 BOTNI ISHGA TUSHIRISH
const bot = new TelegramBot(token, { polling: true });

// 🌐 WEB APP URL (Render link)
const WEB_URL = "https://hrbot-bot.onrender.com";

// 🚀 /start komandasi
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Anketani to‘ldiring 👇", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "📝 Anketa to‘ldirish",
            web_app: {
              url: WEB_URL
            }
          }
        ]
      ],
      resize_keyboard: true
    }
  });
});

// ❌ Xatoliklarni ushlash (optional lekin foydali)
bot.on("polling_error", (error) => {
  console.log("Polling error:", error.message);
});

console.log("🤖 Bot ishga tushdi...");
