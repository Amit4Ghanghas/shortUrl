const express = require('express');
const app = express();
var bodyParser = require('body-parser');

// Importing routes
// const gameRoutes = require('./src/app/controllers/gameController');



app.use(express.static('public'));
app.use(bodyParser.json({
    limit: "50mb"
}));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
}));


app.get('/',function(req,res){
    // console.log('1',req.body);
    // let valueOfUrl = req.body.url;// req.params.id;
    // let obj = {
    //     "ab23": "www.google.com/randomtextkljldjlfsk",
    //     "abd1": "www.flipkart.com/randomtextkljldjlfsk",
    //     "xbd3": "www.linkedin.com/randomtextkljldjlfsk"
    //   }
    //  let shortenUrl =  getKeyByValue(obj,valueOfUrl);

    // let valueofSmallUrl ="ab23";
    // let BiggerUrl = obj.valueofSmallUrl;
    // res.status(200).json(shortenUrl);
    console.log('Hello world');
    res.send('Hello');
});



function getKeyByValue(object,value){
    return Object.keys(object).find(key => object[key] === value);
}

// Calling routes
// app.use('/api/game', gameRoutes);

module.exports = app;
