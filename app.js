const express = require('express');
const router = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// setup express app
const app = express();
app.use(cors());

mongoose.connect('mongodb://admin:admin@ds263109.mlab.com:63109/ifsc');
mongoose.Promise = global.Promise;

const port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use(router);

//listen for requests
app.listen(port, function () {
	console.log(`App listening on port ${port}`);
})
