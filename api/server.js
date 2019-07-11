const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet')
const server = express();

const authRoutes = require('../api/routes/authRoutes');
const reviewRoutes = require('../api/routes/reviewRoutes');
const userRoutes = require('../api/routes/userRoutes');



server.use(morgan('dev'));
server.use(helmet());

server.use(express.json());
server.use("/auth", authRoutes);
server.use("/", reviewRoutes);
server.use("/", userRoutes);

server.get('/test', (req, res) => {
    res.send('<h1>Sanity Check! This works!!</h1>')
})

module.exports = server;