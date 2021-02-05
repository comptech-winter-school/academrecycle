const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const fetch = require("node-fetch");

const BASE_URL = process.env.URL || "http://localhost:9000/api"
const URL_ALL_CITIES = BASE_URL + "/cities"
const URL_TYPES = BASE_URL + "/types"
const URL_POINTS = BASE_URL + "/points"


const mapTypes = new Map([
    ["Бумага", 1],
    ["Стекло", 2],
    ["Пластик", 3],
    ["Металл", 4],
    ["Одежда", 5],
    ["Иное", 6],
    ["Опасные отходы", 7],
    ["Батарейки", 8],
    ["Лампочки", 9],
    ["Бытовая техника", 10],
    ["Тетра Пак", 11],
    ["Крышечки", 12],
    ["Шины", 13]
]);
const types = ['Крышечки', 'Бытовая техника',
    'Опасные отходы', 'Бумага',
    'Батарейки', 'Одежда', 'Тетра Пак',
    'Лампочки', 'Пластик', 'Стекло',
    'Металл', 'Шины', 'Иное'
]


function getNearestCity(citiesList,latitude, longitude){
    let minDistance = 0;
    let currentCity = {};
    for(let i = 0; i < citiesList.length; ++i){
        let distance = getHaversineDistance(citiesList[i].latitude, citiesList[i].longitude, latitude, longitude);
        if(minDistance === 0 || distance < minDistance){
            currentCity = {id:citiesList[i].id, name: citiesList[i].name};
            minDistance = distance;
        }
    }
    return currentCity;
}
function getNearestPoint(pointsList, latitude, longitude){
    let minDistance = 0;
    let currentPoint = {};
    for(let i = 0; i < pointsList.length; ++i){
        let distance = getHaversineDistance(pointsList[i].latitude, pointsList[i].longitude, latitude, longitude);
        if(minDistance === 0 || distance < minDistance){
            currentPoint = pointsList[i];
            minDistance = distance;
        }
    }
    return currentPoint;
}
let toRadians = function(n){
    return n * Math.PI / 180;
};

// Формула Гаверсинусов
let getHaversineDistance = function(latitude1, longitude1,  latitude2, longitude2){
    let R = 6371000; // Радиус Земли в метрах

    let lat1 = toRadians(latitude1);
    let lng1 = toRadians(longitude1);

    let lat2 = toRadians(latitude2);
    let lng2 = toRadians(longitude2);

    let dLat = toRadians(latitude1 - latitude2);
    let dLng = toRadians(longitude1 - longitude2);

    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
        + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    let d = R * c;

    return Math.floor(d);
};


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
        .keyboard(types)
        .resize()
    )
)
bot.help((ctx) => ctx.reply('список того, что умеет бот'))

bot.command('start', (ctx) =>
    ctx.reply('Выберите тип отходов', Markup
        .keyboard(mapTypes.values())
        .oneTime()
        .resize()
    )
)

bot.hears(types, ctx => {
    context.type = mapTypes.get(ctx.update.message.text);
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
        context.location.latitude = ctx.update.message.location.latitude;
        context.location.longitude = ctx.update.message.location.longitude;
        const allCitiesResponse = await fetch(URL_ALL_CITIES);
        const citiesList = await  allCitiesResponse.json()
        let currentCity = getNearestCity(citiesList.tutorials, context.location.latitude, context.location.longitude);
        const allTypesResponse = await  fetch(URL_TYPES + "/" + context.type + "/" + currentCity.id);
        const types = await  allTypesResponse.json()
        if(types.length === 0){
            const listPoints = []
            for(let i = 0; i < types.length; ++i){
                //types[i].tutorials.recycle_points_id
                const pointsResponse = await  fetch(URL_POINTS + "/" + types[i].recycle_points_id);
                const pointJson = await  pointsResponse.json()
                listPoints.push(pointJson)
            }
            let point =  getNearestPoint(listPoints, context.location.latitude, context.location.longitude);
            return await ctx.reply("Ближайший пункт приёма:" +
                "\nНазвание:" + point.name +
                "\nадрес:" + point.address)
                Markup.removeKeyboard()
        } else {
            return await ctx.reply("В вашем городе нет пунктов, которые принимают данный вид отходов.",   Markup.removeKeyboard())
        }
        });
bot.launch()
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
