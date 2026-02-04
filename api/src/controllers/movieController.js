const MovieModel = require('../models/Movie');

exports.create = async (req, res) => {
    try {
        const data = await MovieModel.create({
            title: req.body.title,
            poster: req.file?.path,
            category: req.body.category,
            year: req.body.year
        });

        res.send({
            status: true,
            message: "record created successfully",
            data
        });
    } catch (error) {
        res.send({
            status: false,
            message: "something went wrong",
            error: error.message
        });
    }
};

exports.view = async (req, res) => {
    try {
        const data = await MovieModel
            .find({
                deleted_at: null
            })
            .populate("category");

        res.send({
            status: true,
            message: "record found successfully",
            data
        });
    } catch (error) {
        res.send({
            status: false,
            message: "something went wrong",
            error: error.message
        });
    }
};

exports.update = async (req, res) => {
    try {
        const data = await MovieModel.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    title: req.body.title,
                    category: req.body.category,
                    year: req.body.year
                }
            }
        );

        // if (req.file) data.image = req.file.filename;
        if (req.file) {
            await MovieModel.updateOne(
                { _id: req.params.id },
                { $set: { poster: req.file.path } }
            );
        }

        res.send({
            status: true,
            message: "updated successfully",
            data
        });
    } catch (error) {
        res.send({
            status: false,
            message: "update failed",
            error: error.message
        });
    }
};


exports.delete = async (req, res) => {
    try {
        const data = await MovieModel.updateOne(
            { _id: req.params.id },
            { $set: { deleted_at: Date.now() } }
        );

        res.send({
            status: true,
            message: "deleted successfully",
            data
        });
    } catch (error) {
        res.send({
            status: false,
            message: "delete failed",
            error: error.message
        });
    }
};