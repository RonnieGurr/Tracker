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

app.use(function(err, req, res, next) { // Check if incomming JSON request has syntax errors
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      res.sendStatus(400)
    } else next();
  });

//Routes
const loginRoute = require('./routes/login');
const getData = require('./routes/getData');
const saveData = require('./routes/saveData');
const refreshToken = require('./routes/refreshToken');

app.use('/login', loginRoute)
app.use('/get-data', getData)
app.use('/save-data', saveData)
app.use('/refresh-token', refreshToken)

app.listen(process.env.API_PORT, () => {
    console.log(`Listening on port ${process.env.API_PORT}`)
});