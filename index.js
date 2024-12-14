require('dotenv').config();
const {Bot} = require('grammy')

const bot = new Bot(process.env.BOT_API_KEY);

const fs = require('fs');
const path = require('path');

fs.readdirSync('./commands').forEach((file) => {
    if (file.endsWith('.js')) {
        const command = require(path.join(__dirname, 'commands', file));
        command(bot);
    }
});

bot.start()