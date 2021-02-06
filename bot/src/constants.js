BASE_URL = process.env.URL || "http://localhost:9000/api"
module.exports.URL_ALL_CITIES = BASE_URL + "/cities"
module.exports.URL_TYPES = BASE_URL + "/types"
module.exports.URL_POINTS = BASE_URL + "/points"
module.exports.mapTypes = new Map([
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
module.exports.types = ['Крышечки', 'Бытовая техника',
    'Опасные отходы', 'Бумага',
    'Батарейки', 'Одежда', 'Тетра Пак',
    'Лампочки', 'Пластик', 'Стекло',
    'Металл', 'Шины', 'Иное'
]
