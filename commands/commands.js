const {GrammyError, HttpError, InlineKeyboard} = require("grammy");
const { getWeather } = require('../requests/weather.js');

module.exports = (bot) => {
    const userState = {};

    bot.command('start', async (ctx) => {
        await ctx.reply('Hello', {
            reply_parameters: { message_id: ctx.message.message_id }
        });
        console.log(ctx.message);
    });

    bot.command('weather', async (ctx) => {
        console.log(ctx.message);

        const keyboard = new InlineKeyboard()
            .text('Calgary', 'Calgary')
            .text('Tiraspol', 'Tiraspol')
            .text('Belgorod', 'Belgorod')
            .text('Krasnodar', 'Krasnodar')
            .text('Other city', 'Other city');

        await ctx.reply('What city?', {
            reply_parameters: { message_id: ctx.message.message_id },
            reply_markup: keyboard
        })
    })

    bot.on('callback_query:data', async (ctx) => {
        try {
            const userId = ctx.from.id;
            const city = ctx.callbackQuery.data;
            console.log("Selected city:", city);

            if (city === 'Other city') {
                await ctx.answerCallbackQuery();
                await ctx.editMessageReplyMarkup({ inline_keyboard: [] })
                await ctx.reply('What is your city?');

                userState[userId] = { awaitingCity: true };
            } else {
                let weather = await getWeather(city);
                await ctx.reply(`Weather in ${city}: ${weather}`);
                await ctx.editMessageReplyMarkup({ inline_keyboard: [] });
                await ctx.answerCallbackQuery();
            }
        } catch (error) {
            console.error("Error in callback_query handler:", error);
        }
    });

    bot.on('message', async (ctx) => {
        console.log(ctx.message.text);

        const userId = ctx.from.id;
        if (userState[userId] && userState[userId].awaitingCity) {
            const city = ctx.message.text;

            let weather = await getWeather(city);
            await ctx.reply(`Weather in ${city}: ${weather}`);

            userState[userId].awaitingCity = false;
        }
    })

    bot.command('reminder', async (ctx) => {
        await ctx.reply('Remind you of what?', {
            reply_parameters: {message_id: ctx.message.message_id }
        })
    })

    bot.hears('message', async (ctx) => {
        if(ctx.from.id === 267796463){
            await ctx.react("🏆");
        }
    })

    bot.hears('id', async (ctx) => {
        await ctx.reply(ctx.from.id);
    })

    bot.catch((error) => {
        const ctx = error.ctx;
        console.error(`Error while handling update ${ctx?.update?.update_id || 'unknown update'}`);
        console.error("Full error:", error);

        const e = error.error;
        if (e instanceof GrammyError) {
            console.error("Error in request:", e.description);
        } else if (e instanceof HttpError) {
            console.error("Could not contact with Telegram:", e);
        } else {
            console.error("Unknown error:", e);
        }
    });
};