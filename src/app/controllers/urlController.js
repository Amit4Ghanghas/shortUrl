const express = require('express');
const url = require('../models/url');
const router = express.Router();
const db = require('../utilities/sqlMapper');



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// get
router.get('/', async (req, res, next) => {

    try {
        let result2 = await url.postdata(req);
        console.log('RESULT', result2);
        let result = await url.get(req);
        res.status(200).json(result);

    } catch (error) {
        res.status(400).json(error);

    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// post
router.post('/', async (req, res, next) => {

    try {
        let result = await url.post(req);
        res.status(200).json(result);

    } catch (error) {
        res.status(400).json(error);

    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router;