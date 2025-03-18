import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const BOT_TOKEN = "7601533181:AAHItWZHVnUKtckKqi0O10sG7wnLpZO0XiQ";
if (!BOT_TOKEN) {
  throw new Error("Bot token is missing in .env file");
}

// Create the bot instance
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Handle "/start" command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Hello! I am your TypeScript bot running on Render!");
});

// Handle messages
bot.on("message", (msg) => {
  if (msg.text) {
    bot.sendMessage(msg.chat.id, `You said: ${msg.text}`);
  }
});

console.log("Bot is running...");
