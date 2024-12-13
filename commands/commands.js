const {GrammyError, HttpError} = require("grammy");

module.exports = (bot) => {
    bot.command('start', async (ctx) => {
        await ctx.reply('Hello', {
            reply_parameters: { message_id: ctx.message.message_id }
        });
        console.log(ctx.message);
    });

    bot.command('weather', async (ctx) => {
        await ctx.reply('Requesting weather...', {
            reply_parameters: {message_id: ctx.message.message_id }
        })
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
        console.error(`Error while handling update ${ctx.update.update_id}`);
        const e = error.error

        if (e instanceof GrammyError) {
            console.error("Error in request: ", e.description);
        } else if (e instanceof HttpError) {
            console.error("Could not contact with Telegram: ", e)
        }
    })
};