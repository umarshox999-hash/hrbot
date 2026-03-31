const TelegramBot = require('node-telegram-bot-api');

const token = "8756429163:AAGqydBAD6oxOVzZhKZbPfHXPs9idBrV1UY";
const bot = new TelegramBot(token, { polling: true });

const WEB_URL = "https://hrbot-bot.onrender.com";

bot.onText(/\/start/, (msg) => {

  bot.sendMessage(msg.chat.id, "Anketani to‘ldiring 👇", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "📝 Anketa to‘ldirish",
            web_app: { url: https://hrbot-nndo.onrender.com }
          }
        ]
      ],
      resize_keyboard: true
    }
  });

});
