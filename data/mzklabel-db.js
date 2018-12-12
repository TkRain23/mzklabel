// Get the connection to the database

const mongoose = require("mongoose");
const assert = require("assert");

// mongo variables
const url = process.env.MONGODB_URI || process.env.MONGODB_TESTURI;
mongoose.Promise = global.Promise;

// connect to database at url via url parser
mongoose.connect(url, {
        useNewUrlParser: true
    },
    (err, db) => {
        assert.equal(null, err);
        console.log('database sucessfully connected');
    });

// setup debug mode + error handling
mongoose.connection.on("error", console.error.bind(console, "mongodb connection error"));
mongoose.set("debug", true);

// export connection for future use
module.exports = mongoose.connection;
