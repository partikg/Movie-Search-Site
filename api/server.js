const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const server = express();
const PORT = process.env.PORT || 5000;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/uploads/movie', express.static('uploads/movie'));

require('./src/routes/user.routes')(server);
require('./src/routes/categoryRoutes')(server);
require('./src/routes/movieRoutes')(server);

server.get('/', (req, res) => {
    res.send("working");
});

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error(" MongoDB connection error:", err.message);
    });