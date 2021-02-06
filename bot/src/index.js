const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const fetch = require("node-fetch");
const operations = require('./algotithm')
const constants = require('./constants')
const {algorithm} = require("./algotithm");

let context = {
    type: "",
    location: {
        longitude: 0,
        latitude: 0
    }
};
if (process.env.BOT_TOKEN === undefined) {
    throw new TypeError('BOT_TOKEN must be provided!')
}
const bot = new Telegraf(process.env.BOT_TOKEN)
bot.use(Telegraf.log())
bot.start((ctx) =>
    ctx.reply('Выберите тип отходов', Markup
        .keyboard(constants.types)
        .resize()
    )
)
bot.help((ctx) => ctx.reply('список того, что умеет бот'))

bot.command('start', (ctx) =>
    ctx.reply('Выберите тип отходов', Markup
        .keyboard(constants.types)
        .oneTime()
        .resize()
    )
)

bot.hears(constants.types, ctx => {
    context.type = constants.mapTypes.get(ctx.update.message.text);
    return ctx.reply(
        'Отправьте локацию, чтобы узнать, где находится нужный пункт приёма',
        Markup.keyboard([Markup.button.locationRequest('отправить геолокацию'), 'отмена']).oneTime().resize()
    )
})
bot.hears( "отмена", ctx => {
    context.type = ctx.update.message.text;
    return ctx.reply(
        'Спасибо, что пользовались ботом, приходите ещё',
        Markup.removeKeyboard()
    )
})
bot
    .on('location', async (ctx) => {
        let answer = algorithm(context)
        return await ctx.reply(answer, Markup.removeKeyboard())
        });
bot.launch()
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
