let operations = require('../algotithm');

it("should calculate distance between two points", function(){
    let expectedResult = 155682; // метры
    let result = operations.getHaversineDistance(11, 12, 12, 13);
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});
it("should calculate distance between two points", function(){
    let expectedResult = 4052; // метры
    let result = operations.getHaversineDistance(54.9057619913255 , 52.2635101460328, 54.9084843955245 , 52.3267182824784);
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});


it("should calculate distance between two points", function(){
    let expectedResult = 634193; // метры
    let result = operations.getHaversineDistance(55.7580321449 , 37.6168444863, 59.9353923257 , 30.302746582);
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});
it("should calculate distance between two points", function(){
    let expectedResult = 2410; // метры
    let result = operations.getHaversineDistance(61.7753346789842 , 34.4120523059845,61.7537150590635 , 34.4151676917553);
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});
