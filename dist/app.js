"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//congiguration for dotenv file 
require('dotenv').config();
//import statements
const express = require('express');
const app = express();
const PORT = Number(process.env.PORT) || 4343;
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require('mongoose');
let allowlist = ['http://localhost:3000'];
let corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
    }
    else {
        corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
};
//static files
app.use('/static', express.static(path.join(__dirname, 'uploads')));
//middleware
app.use(cors(corsOptionsDelegate));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const uri = process.env.ATLAS_URI;
//connect to atlas 
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log(`MongoDB database connection established successfully`);
});
//setup for routes
app.use('/admin', require('./routes/admin'));
app.use('/signup', require('./routes/signup'));
app.use('/signin', require('./routes/signin'));
app.use('/products', require('./routes/products'));
//server listening on PORT
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
//# sourceMappingURL=app.js.map