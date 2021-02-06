const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const constants = require('./constants')
const {algorithm} = require("./algotithm");

if (process.env.BOT_TOKEN === undefined) {
    throw new TypeError('BOT_TOKEN must be provided!')
}
const bot = new Telegraf(process.env.BOT_TOKEN)
bot.use(Telegraf.log())
bot.context = {
    type: "",
    location: {
        longitude: 0,
        latitude: 0
    }
};
bot.start((ctx) => {
    return ctx.reply('Выберите тип отходов', Markup
            .keyboard(constants.types)
            .resize())
    }

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
    bot.context.type = constants.mapTypes.get(ctx.update.message.text);
    return ctx.reply(
        'Отправьте локацию, чтобы узнать, где находится нужный пункт приёма',
        Markup.keyboard([Markup.button.locationRequest('отправить геолокацию'), 'отмена'])
            .oneTime()
            .resize())
})
bot.hears( "отмена", ctx => {
    return ctx.reply(
        'Спасибо, что пользовались ботом, приходите ещё',
        Markup.removeKeyboard())
})
bot.hears( "да", ctx => {
    return  ctx.reply('Выберите тип отходов', Markup
        .keyboard(constants.types)
        .oneTime()
        .resize())
})
bot.hears( "нет", ctx => {
    return ctx.reply(
        'Спасибо, что пользовались ботом, приходите ещё',
        Markup.removeKeyboard())
})
bot
    .on('location', async (ctx) => {
        bot.context.location.latitude = ctx.update.message.location.latitude;
        bot.context.location.longitude = ctx.update.message.location.longitude;
        let answer = await algorithm(bot.context)
        if(!answer.hasOwnProperty('location')) {
            return ctx.reply(answer.text +
                "\n хотите ли вы что-нибудь ещё узнать?", Markup.keyboard(["да", "нет"])
                .oneTime()
                .resize());
        }else {
            return await ctx.reply(answer.text, Markup.removeKeyboard(),
                ctx.tg.sendLocation(ctx.chat.id, answer.location.latitude, answer.location.longitude))
        }
        });
bot.launch()
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
