import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

const TOKEN = '7601533181:AAHItWZHVnUKtckKqi0O10sG7wnLpZO0XiQ';
const WEATHER_API_KEY = '037bc3ed2f92fc92b84414799234ff78';
const bot = new TelegramBot(TOKEN, { polling: true });

// Function to get weather data
async function getWeather(city: string, country: string): Promise<string> {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&cnt=2&appid=${WEATHER_API_KEY}`);
        const today = response.data.list[0];
        const tomorrow = response.data.list[1];
        
        return `Weather in ${city}, ${country}:
Today: ${today.weather[0].description}, Temp: ${today.main.temp}°C
Tomorrow: ${tomorrow.weather[0].description}, Temp: ${tomorrow.main.temp}°C`;
    } catch (error) {
        return 'Error fetching weather data. Please check the city and country name.';
    }
}

// Start command
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `Hello, ${msg.from?.first_name}! Welcome to the weather bot. Use /weather to get the forecast.`);
});

// Weather command with prompting
bot.onText(/\/weather/, async (msg) => {
    bot.sendMessage(msg.chat.id, 'Please enter the city and country (e.g., London UK)');
    
    bot.once('message', async (responseMsg) => {
        const input = responseMsg.text?.trim().split(' ');
        if (input && input.length >= 2) {
            const city = input.slice(0, input.length - 1).join(' ');
            const country = input[input.length - 1];
            const weatherReport = await getWeather(city, country);
            bot.sendMessage(msg.chat.id, weatherReport);
        } else {
            bot.sendMessage(msg.chat.id, 'Invalid format. Please enter in the format: City Country');
        }
    });
});

console.log('Telegram weather bot is running...');
