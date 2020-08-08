const express = require('express');
const app = express();
var bodyParser = require('body-parser');



///reddis
var redis = require('redis');
var redisClient = redis.createClient({ host: 'localhost', port: 6379 });

redisClient.on('ready', function () {
    console.log("Redis is ready");
});

redisClient.on('error', function () {
    console.log("Error in Redis");
});




// Importing routes
const urlRoutes = require('./src/app/controllers/urlController');

app.use(express.static('public'));
app.use(bodyParser.json({
    limit: "50mb"
}));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
}));

// Calling routes
app.use('/url', urlRoutes);

module.exports = app;
