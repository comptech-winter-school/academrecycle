const db = require('../model');

const Type = db.recycleType;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
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

// Create and Save a new Type
exports.create = (req, res) => {
    // Create a Type
    const point = {
        recycle_points_id: req.body.recycle_points_id,
        recycle_cities_id: req.body.recycle_cities_id,
        type: req.body.type
    };
    // Save Type in the database
    Type.create(point)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the Type.',
            });
        });
};

// Retrieve all Types from the database.
exports.findAll = (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    Type.findAndCountAll({ limit, offset })
        .then((data) => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving points.',
            });
        });
};

// Find a single Type with an id
exports.findOne = (req, res) => {
    const { id } = req.params;
    Type.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch(() => {
            res.status(500).send({
                message: `Error retrieving Type with id=${id}`,
            });
        });
};
exports.findByCityAndType = (req, res) => {
    const {point_id, type} = req.params;
    console.log(req.params)
    Type.findAll({ where: {recycle_cities_id: point_id, type: type }})
        .then((data) => {
            res.send(data);
        })
        .catch(() => {
            res.status(500).send({
                message: `Error`,
            });
        });
}
// Update a Type by the id in the request
exports.update = (req, res) => {
    const { id } = req.params;

    Type.update(req.body, {
        where: { id },
    })
        .then((num) => {
            if (num === 1) {
                res.send({
                    message: 'RecycleType was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update RecycleType with id=${id}. Maybe RecycleType was not found or req.body is empty!`,
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: `Error updating RecycleType with id=${id}`,
            });
        });
};

// Delete a Type with the specified id in the request
exports.delete = (req, res) => {
    const { id } = req.params;

    Type.destroy({
        where: { id },
    })
        .then((num) => {
            if (num === 1) {
                res.send({
                    message: 'RecycleType was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete RecycleType with id=${id}. Maybe RecycleType was not found!`,
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: `Could not delete RecycleType with id=${id}`,
            });
        });
};

// Delete all Types from the database.
exports.deleteAll = (req, res) => {
    Type.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} RecycleType were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while removing all Types.',
            });
        });
};
