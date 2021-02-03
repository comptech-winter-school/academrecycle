function findLocation(context){
    let answer = "Список точек:\n"
    answer = answer + "Данные, которые вы ввели:\n" +
        "Тип отходов: " + context.type + "\nГеолокация: " +
        [context.location.longitude, context.location.latitude].join(";")
    return answer
}
