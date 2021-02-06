const db = require('../model');

const City = db.recycleCities;

const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tutorials } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return {
        totalItems, tutorials, totalPages, currentPage,
    };
};

// Create and Save a new City
exports.create = (req, res) => {
    // Create a City
    const city = {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
    };
    // Save City in the database
    City.create(city)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the City.',
            });
        });
};

// Retrieve all Cities from the database.
exports.findAll = (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    City.findAndCountAll({ limit, offset })
        .then((data) => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving points.',
            });});
};
// Find a single City with an id
exports.findOne = (req, res) => {
    const { id } = req.params;

    City.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch(() => {
            res.status(500).send({
                message: `Error retrieving City with id=${id}`,
            });
        });
};

// Update a City by the id in the request
exports.update = (req, res) => {
    const { id } = req.params;

    City.update(req.body, {
        where: { id },
    })
        .then((num) => {
            if (num === 1) {
                res.send({
                    message: 'RecycleCity was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update RecycleCity with id=${id}. Maybe RecycleCity was not found or req.body is empty!`,
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: `Error updating RecycleCity with id=${id}`,
            });
        });
};

// Delete a City with the specified id in the request
exports.delete = (req, res) => {
    const { id } = req.params;

    City.destroy({
        where: { id },
    })
        .then((num) => {
            if (num === 1) {
                res.send({
                    message: 'RecycleCity was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete RecycleCity with id=${id}. Maybe RecycleCity was not found!`,
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: `Could not delete RecycleCity with id=${id}`,
            });
        });
};

// Delete all Cities from the database.
exports.deleteAll = (req, res) => {
    City.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} RecycleCity were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while removing all Citys.',
            });
        });
};
