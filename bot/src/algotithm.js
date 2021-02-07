const fetch = require('node-fetch');
const constants = require('./constants');

exports.getNearestCity = function (citiesList, latitude, longitude) {
  let minDistance = 0;
  let currentCity = {};
  for (let i = 0; i < citiesList.length; ++i) {
    const distance = exports.getHaversineDistance(citiesList[i].latitude, citiesList[i].longitude, latitude, longitude);
    if (minDistance === 0 || distance < minDistance) {
      currentCity = { id: citiesList[i].id, name: citiesList[i].name };
      minDistance = distance;
    }
  }
  if (minDistance > 100000) {
    return {};
  }
  return currentCity;
}
exports.getNearestPoint = function (pointsList, latitude, longitude) {
  let minDistance = 0;
  let currentPoint = {};
  for (let i = 0; i < pointsList.length; ++i) {
    const distance = exports.getHaversineDistance(pointsList[i].latitude, pointsList[i].longitude, latitude, longitude);
    if (minDistance === 0 || distance < minDistance) {
      currentPoint = pointsList[i];
      minDistance = distance;
    }
  }
  return currentPoint;
}
exports.toRadians = function (n) {
  return n * Math.PI / 180;
};

exports.getHaversineDistance = function (latitude1, longitude1, latitude2, longitude2) {
  const R = 6371302; // Радиус Земли в метрах

  const lat1 = exports.toRadians(latitude1);
  const lng1 = exports.toRadians(longitude1);

  const lat2 = exports.toRadians(latitude2);
  const lng2 = exports.toRadians(longitude2);

  const dLat = exports.toRadians(latitude1 - latitude2);
  const dLng = exports.toRadians(longitude1 - longitude2);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
        + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;

  return Math.floor(d);
};

exports.algorithm = async function (context) {
  try {
    const allCitiesResponse = await fetch(constants.URL_ALL_CITIES);
    const citiesList = await allCitiesResponse.json()
    const currentCity = exports.getNearestCity(citiesList.tutorials, context.location.latitude, context.location.longitude);
    if (!currentCity.hasOwnProperty('name')) {
      return {
        text: 'Извините, ваш город пока не поддерживается, '
                    + 'но мы работаем над обновлением базы, надеемся, что скоро он появится.',
      }
    }
    const allTypesResponse = await fetch(`${constants.URL_TYPES}/${context.type}/${currentCity.id}`);
    const types = await allTypesResponse.json()
    if (types.length !== 0) {
      const listPoints = []
      for (let i = 0; i < types.length; ++i) {
        const pointsResponse = await fetch(`${constants.URL_POINTS}/${types[i].recycle_points_id}`);
        const pointJson = await pointsResponse.json()
        listPoints.push(pointJson)
      }
      const point = exports.getNearestPoint(listPoints, context.location.latitude, context.location.longitude);
      return {
        text: `${'Ближайший пункт приёма:' + '\nНазвание:'}${point.name}\nадрес:${point.address}`,
        location: { latitude: point.latitude, longitude: point.longitude },
      }
    }
    return { text: 'В вашем городе нет пунктов, которые принимают данный вид отходов.' }
  } catch (err) {
    return { text: 'проблемы с подключением к бэкенду, пожалуйста, обратитесь к разработчику' }
  }
}
