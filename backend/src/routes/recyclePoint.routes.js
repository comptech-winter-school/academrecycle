const router = require('express').Router();
const points = require('../controller/recyclePoints.controller.js');

module.exports = (app) => {
  // Create a new Point
  router.post('/', points.create);

  // Retrieve all Point
  router.get('/', points.findAll);

  // Retrieve a single Point with id
  router.get('/:id', points.findOne);

  // Update a Point with id
  router.put('/:id', points.update);

  // Delete a Point with id
  router.delete('/:id', points.delete);

  // Create a new Point
  router.delete('/', points.deleteAll);

  app.use('/api/points', router);
};
