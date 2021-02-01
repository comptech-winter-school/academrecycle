const db = require("../model");
const Point = db.recyclePoints;


const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tutorials } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, tutorials, totalPages, currentPage };
};

// Create and Save a new Point
exports.create = (req, res) => {
    // Create a Point
    const point = {
        recyclemap_id: req.body.recyclemap_id,
        name: req.body.name,
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    };
    // Save Point in the database
    Point.create(point)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Point."
            });
        });
};

// Retrieve all Points from the database.
exports.findAll = (req, res) => {
    console.log(req.query)
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    Point.findAndCountAll({ limit, offset })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving points."
            });
        });
};

// Find a single Point with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Point.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(() => {
            res.status(500).send({
                message: "Error retrieving Point with id=" + id
            });
        });
};

// Update a Point by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Point.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "RecyclePoint was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update RecyclePoint with id=${id}. Maybe RecyclePoint was not found or req.body is empty!`
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Error updating RecyclePoint with id=" + id
            });
        });
};

// Delete a Point with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Point.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "RecyclePoint was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete RecyclePoint with id=${id}. Maybe RecyclePoint was not found!`
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Could not delete RecyclePoint with id=" + id
            });
        });
};

// Delete all Points from the database.
exports.deleteAll = (req, res) => {
    Point.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} RecyclePoint were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Points."
            });
        });
};

