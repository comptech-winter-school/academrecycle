const router = require('express').Router();
const cities = require('../controller/recycleCities.controller.js');

module.exports = (app) => {
    // Create a new Point
    router.post('/', cities.create);

    // Retrieve all Point
    router.get('/', cities.findAll);

    // Retrieve a single Point with id
    router.get('/:id', cities.findOne);

    // Update a Point with id
    router.put('/:id', cities.update);

    // Delete a Point with id
    router.delete('/:id', cities.delete);

    // Create a new Point
    router.delete('/', cities.deleteAll);

    app.use('/api/cities', router);
};
