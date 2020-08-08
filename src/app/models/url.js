const db = require('../utilities/sqlMapper');
var dbTable = "public.url";
var tableAlias = " u ";
var dbFields = ['url_id', 'short_url', 'big_url', 'created_at'];
var dbTable1 = "public.data_analysis";
var tableAlias1 = " d ";
var dbFields1 = ['data_id', 'request', 'created_at'];

var redis = require('redis');
var redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});
////////////////////////////////////////////////////////////////////////////////////////////////////////

async function get(req) {
    return selectPromise = new Promise((resolve, reject) => {
        let Key = req.query.short_url;
        console.log("STRING IS ", Key);

        redisClient.exists(Key, async function (err, reply) {
            console.log("REPLY IN CHECK REDIS", reply)
            if (!err) {
                if (reply === 0) {
                    console.log("KEY DOESNOT  EXISTS ");

                    let columns = `u.*`;
                    let options = {
                        from: dbTable + tableAlias,
                        conditions: `short_url = '` + req.query.short_url + `'`,
                        columns: columns
                    }
                    let err = new Array();
                    let result = await db.select(options).catch((e) => err.push(e));
                    if (err.length > 0) {
                        throw new Error('Error in fetching data from db');
                    }
                    let Finalresult = {
                        message: "Success",
                        Big_url: result.rows[0].big_url
                    };
                    redisClient.set(Key, result.rows[0].big_url, function (err, reply) {
                        if (err) {
                            console.log("ERR", err);
                            reject(err)
                        } else {
                            redisClient.expire(Key, 1 * 60 * 60);
                            resolve(Finalresult);
                        }
                    });
                } else {
                    console.log("KEY  EXISTS ");
                    redisClient.get(Key, function (err, reply) {
                        if (err) {
                            console.log("ERR", err);
                            reject(err)
                        } else {
                            // redisClient.del(Key,function(err,reply) {
                            //     if(!err) {
                            //      if(reply === 1) {
                            //       console.log("Key is deleted");
                            //      } else {
                            //       console.log("Does't exists");
                            //      }
                            //     }
                            //    });
                            console.log("REPLY", reply);
                            let Value = reply;
                            let Finalresult = {
                                message: "Success",
                                Big_url: Value
                            };
                            resolve(Finalresult);
                        }
                    });
                }
            }
        });
    })
}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//add api url table
async function post(req) {

    var short_url = Date.now();
    short_url = short_url - 1596885412291;
    console.log('AA', short_url);
    let data = {
        big_url: req.body.big_url,
        short_url: short_url
    }
    let delim = "";
    let columns = "";
    let values = "";
    // console.log("req--------------", req.body);
    for (let key in data) {
        if (dbFields.includes(key)) {
            columns += delim + key;
            values += db.insertString(key, data[key], delim);
            delim = ",";
        }
    }
    let options = {
        table: dbTable,
        columns: columns,
        values: values
    }
    let err = new Array();
    let result = await db.insert(options).catch((e) => err.push(e));
    if (err.length > 0) {
        throw new Error('Error in posting data in db');
    }
    return {
        message: "Success",
        data: short_url
    };

}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//add api data table
async function postdata(req) {
    let data = {
        request: req.query.short_url
    };
    let delim = "";
    let columns = "";
    let values = "";
    console.log("req--------------", req.query);
    for (let key in data) {
        if (dbFields1.includes(key)) {
            columns += delim + key;
            values += db.insertString(key, data[key], delim);
            delim = ",";
        }
    }
    let options = {
        table: dbTable1,
        columns: columns,
        values: values
    }
    console.log('OPTIONS1', options);
    let err = new Array();
    let result1 = await db.insert(options).catch((e) => err.push(e));
    if (err.length > 0) {
        throw new Error('Error in posting data in db');
    }
    return {
        message: "Success Saved Successfully"
    };

}
module.exports = {

    get,
    post,
    postdata

}