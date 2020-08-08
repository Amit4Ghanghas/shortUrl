var db = require('../../config/postgresql');

// Open the DB connection, execute the sql query and close the db connection
function executeQuery(sql, callback) {
    try {
        console.log("--------------------------in execute query")
        db.connectionPool.query(sql, function (error, results) {
            if (error) {
                return callback((error));
            } else {
                return callback(null, results);
            }
        });
    } catch (error) {
        return callback((error));
    }
}

// Select query builder function
async function select(options = {}) {
    return selectPromise = new Promise((resolve, reject) => {
        try {
            let sql = "";
            let columns = "";
            let from = "";
            let conditions = "";

            let select = "SELECT ";
            if (options.columns) {
                columns = " " + options.columns;
            } else {
                columns = " *";
            }
            if (options.from) {
                from = " FROM " + options.from;
            }
            if (options.conditions) {
                conditions = " WHERE " + options.conditions;
            } else {
                conditions = " WHERE 1 = 1 ";
            }

            sql += select + columns + from + conditions;

            console.log('-------------------------QUERY -------------------------------------------------------', sql);

            executeQuery(sql, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    })
}

// Insert query builder function
async function insert(options = {}, callback) {
    return selectPromise = new Promise((resolve, reject) => {
        try {
            options.values = "(" + options.values + ")"
        
            let sql = "INSERT INTO " + options.table + " (" + options.columns + ") VALUES " + options.values;
            console.log('QUERY', sql);
            executeQuery(sql, function (err, data) {
                // console.log("in select of sql mapper", data);
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        } catch (error) {
            throw new Error(error);

        }
    })
}

// This function returns the values part of insert query
function insertString(key, val, delim) {
    try {
        let str = "";

        if (val == null) {
            str = "";
        } else if (val == 'null') {
            str = "";
        } else if (typeof val == 'object') {
            str = delim + db.escape.string(JSON.stringify(val));
        } else {
            str = delim + "'" + db.escape.string(val.toString()) + "'";
        }
        return str;
    } catch (error) {
        return (error);
    }
}


// This is used to append the single codes in sql query
function escape(data) {
    try {
        console.log("Type: ", data + typeof (data));
        if (typeof (data) == 'number' || typeof (data) === 'boolean') {
            return data;
        } else {

            return "'" + db.escape.string(data) + "'";
        }
    } catch (error) {
        return (error);
    }
}


// Here we are exporting all the above function to use in another files like model, controller and services
module.exports = {

    select,
    insert,
    insertString,
    escape
}