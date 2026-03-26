const TelegramBot = require('node-telegram-bot-api');

const token = '8756429163:AAGqydBAD6oxOVzZhKZbPfHXPs9idBrV1UY';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Assalomu alaykum!\nTanlang 👇", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "📝 Anketa to‘ldirish",
            web_app: {
              url: " https://arytenoepiglottic-tony-ambivalently.ngrok-free.dev"
            }
          }
        ],
        [
          {
            text: "📊 Admin panel",
            web_app: {
              url: "https://arytenoepiglottic-tony-ambivalently.ngrok-free.dev/admin"
            }
          }
        ]
      ],
      resize_keyboard: true
    }
  });
});