const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const multer = require('multer')
// const uploads = multer({ dest: 'uploads/movie' })
// const path = require('path');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/movie')
//     },
//     filename: function (req, file, cb) {
//         console.log(path.extname(file.originalname));
//         cb(null, 'movie-' + Date.now() + path.extname(file.originalname))
//     }
// })
// const upload = multer({ storage: storage }).single('poster');

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "movie_posters",          // folder name in Cloudinary
        allowed_formats: ["jpg", "jpeg", "png", "webp"]
    }
});
const upload = multer({ storage: storage }).single("poster");

const multerNone = multer().none();

module.exports = (app) => {

    // CREATE
    router.post("/add", upload, movieController.create);

    // VIEW
    router.get("/view", multerNone, movieController.view);

    // DELETE (soft)
    router.post("/delete/:id", multerNone, movieController.delete);

    // UPDATE
    router.post("/update/:id", upload, movieController.update);

    // MOUNT ROUTER
    app.use("/api/movie", router);
};