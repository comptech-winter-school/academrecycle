const router = require('express').Router();
const types = require('../controller/recycleTypes.controller.js');

module.exports = (app) => {
    // Create a new Type
    router.post('/', types.create);

    // Retrieve all Point
    router.get('/', types.findAll);

    // Retrieve a single Point with id
    router.get('/:id', types.findOne);

    // Update a Point with id
    router.put('/:id', types.update);

    // Delete a Point with id
    router.delete('/:id', types.delete);

    // Create a new Point
    router.delete('/', types.deleteAll);

    router.get("/:type/:point_id", types.findByCityAndType)

    app.use('/api/types', router);
};
