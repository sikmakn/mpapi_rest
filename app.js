const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const controller = require('./controller');
const { mpapi } = require('./logic');

mpapi.node.setProvider(process.env.PROVIDER);
if (process.env.DEBUG == 'true') {
  mpapi.node.setDebugMode(true);
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

app.use('/mpapi', controller);

app.use('*', (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === 'ValidationError' || err.name === 'TypeError')
    return res.sendStatus(400);
  res.status(err.status || 500).send({ message: err.message });
});

module.exports = app;
