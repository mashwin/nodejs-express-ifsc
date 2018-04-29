const express = require('express');
const router = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// setup express app
const app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

mongoose.connect('mongodb://admin:admin@ds263109.mlab.com:63109/ifsc');
mongoose.Promise = global.Promise;

const port = process.env.port || 4000;

app.use(bodyParser.json());

app.use(router);

//listen for requests
app.listen(port, function () {
    console.log(`App listening on port ${port}`);
})
