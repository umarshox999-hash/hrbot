const TelegramBot = require('node-telegram-bot-api');

// 🔐 TOKEN
const token = "8756429163:AAGqydBAD6oxOVzZhKZbPfHXPs9idBrV1UY";

// 👑 ADMIN TELEGRAM ID (o‘zingiznikini yozing)
const ADMIN_ID = 1443031546;

// 🌐 SAYT LINK (Render link)
const WEB_URL = "https://hrbot-bot.onrender.com";

// 🚀 BOT ISHGA TUSHADI
const bot = new TelegramBot(token, { polling: true });

console.log("🤖 Bot ishga tushdi...");

// 📩 /start komandasi
bot.onText(/\/start/, (msg) => {

  const chatId = msg.chat.id;

  // 👤 Oddiy foydalanuvchi uchun
  let keyboard = [
    [
      {
        text: "📝 Anketa to‘ldirish",
        web_app: { url: https://hrbot-nndo.onrender.com }
      }
    ]
  ];

  // 👑 ADMIN uchun qo‘shimcha tugma
  if (msg.from.id === ADMIN_ID) {
    keyboard.push([
      {
        text: "📊 Admin panel",
        url: https://hrbot-nndo.onrender.com/admin }
    ]);
  }

  bot.sendMessage(chatId, "Quyidagilardan birini tanlang 👇", {
    reply_markup: {
      keyboard: keyboard,
      resize_keyboard: true
    }
  });

});
