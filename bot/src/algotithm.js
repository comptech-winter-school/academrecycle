const constants = require("./constants");
exports.getNearestCity = function (citiesList, latitude, longitude) {
    let minDistance = 0;
    let currentCity = {};
    for (let i = 0; i < citiesList.length; ++i) {
        let distance = exports.getHaversineDistance(citiesList[i].latitude, citiesList[i].longitude, latitude, longitude);
        if (minDistance === 0 || distance < minDistance) {
            currentCity = {id: citiesList[i].id, name: citiesList[i].name};
            minDistance = distance;
        }
    }
    return currentCity;
}
exports.getNearestPoint = function (pointsList, latitude, longitude) {
    let minDistance = 0;
    let currentPoint = {};
    for (let i = 0; i < pointsList.length; ++i) {
        let distance = exports.getHaversineDistance(pointsList[i].latitude, pointsList[i].longitude, latitude, longitude);
        if (minDistance === 0 || distance < minDistance) {
            currentPoint = pointsList[i];
            minDistance = distance;
        }
    }
    return currentPoint;
}
exports.toRadians = function(n){
    return n * Math.PI / 180;
};

exports.getHaversineDistance = function(latitude1, longitude1,  latitude2, longitude2){
    let R = 6371302; // Радиус Земли в метрах

    let lat1 = exports.toRadians(latitude1);
    let lng1 = exports.toRadians(longitude1);

    let lat2 = exports.toRadians(latitude2);
    let lng2 = exports.toRadians(longitude2);

    let dLat = exports.toRadians(latitude1 - latitude2);
    let dLng = exports.toRadians(longitude1 - longitude2);

    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
        + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    let d = R * c;

    return Math.floor(d);
};

exports.algorithm = async function(context){
    const allCitiesResponse = await fetch(constants.URL_ALL_CITIES);
    const citiesList = await  allCitiesResponse.json()
    let currentCity = exports.getNearestCity(citiesList.tutorials, context.location.latitude, context.location.longitude);
    const allTypesResponse = await  fetch(constants.URL_TYPES + "/" + context.type + "/" + currentCity.id);
    const types = await  allTypesResponse.json()
    if(types.length === 0){
        const listPoints = []
        for(let i = 0; i < types.length; ++i){
            const pointsResponse = await  fetch(constants.URL_POINTS + "/" + types[i].recycle_points_id);
            const pointJson = await  pointsResponse.json()
            listPoints.push(pointJson)
        }
        let point =  exports.getNearestPoint(listPoints, context.location.latitude, context.location.longitude);
        return "Ближайший пункт приёма:" +
            "\nНазвание:" + point.name +
            "\nадрес:" + point.address
    } else {
        return "В вашем городе нет пунктов, которые принимают данный вид отходов."
    }
}
