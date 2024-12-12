require('dotenv').config();
const {Bot, GrammyError, HttpError} = require('grammy')

const bot = new Bot(process.env.BOT_API_KEY);

bot.command('start', async (ctx) => {
    await ctx.reply('Hello', {
        reply_parameters: {message_id: ctx.msg.message_id}
    });
    console.log(ctx.msg)
})

bot.hears('id', async (ctx) => {
    await ctx.reply(ctx.from.id);
})

bot.on('message', async (ctx) => {
    if(ctx.from.id === 267796463){
        await ctx.react("🏆");
    }
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

bot.start()