const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()

if (process.env.BOT_TOKEN === undefined) {
  throw new TypeError('BOT_TOKEN must be provided!')
}

const keyboard = Markup.inlineKeyboard([
  Markup.button.callback('Delete', 'delete')
])

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Hello there'))
bot.help((ctx) => ctx.reply('Helpful message'))
bot.on('message', (ctx) => ctx.telegram.sendCopy(ctx.message.chat.id, ctx.message, keyboard))
bot.action('delete', (ctx) => ctx.deleteMessage())
bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))