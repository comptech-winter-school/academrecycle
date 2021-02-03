const { Telegraf, Markup, Extra } = require('telegraf')
require('dotenv').config()

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

const types = ['Крышечки', 'Бытовая техника',
    'Опасные отходы', 'Бумага',
    'Батарейки', 'Одежда', 'Тетра Пак',
    'Лампочки', 'Пластик', 'Стекло',
    'Металл', 'Шины', 'Иное'
]
const bot = new Telegraf(process.env.BOT_TOKEN)
bot.use(Telegraf.log())
bot.start((ctx) =>
    ctx.reply('Выберите тип отходов', Markup
        .keyboard(types)
        .resize()
    )
)
bot.help((ctx) => ctx.reply('список того, что умеет бот'))

bot.command('start', (ctx) =>
    ctx.reply('Выберите тип отходов', Markup
        .keyboard(types)
        .oneTime()
        .resize()
    )
)

bot.hears( types, ctx => {
    context.type = ctx.update.message.text;
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
    .on('location', (ctx) => {
        let answer = findLocation()
        return ctx.reply(answer)
    });
bot.launch()
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
