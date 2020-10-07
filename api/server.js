const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, () => {
    console.log(mongoose.connection.readyState);
})

app.use(bodyParser.json(), cors(
    {origin: 'http://localhost:3000',
    AccessControlAllowHeaders: 'Authorization'}
), express.json())

//Routes
const loginRoute = require('./routes/login');
const getData = require('./routes/getData');

app.use('/login', loginRoute)
app.use('/get-data', getData)

app.listen(process.env.API_PORT, () => {
    console.log(`Listening on port ${process.env.API_PORT}`)
});