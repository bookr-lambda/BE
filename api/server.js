const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet')
const server = express();

server.use(morgan('dev'));
server.use(helmet());

server.use(express.json());
server.get('/test', (req, res) => {
    res.send('<h1>Sanity Check! This works!!</h1>')
})

module.exports = server;