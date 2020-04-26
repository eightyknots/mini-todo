const CONFIG_API_PORT = 4000;

const express = require('express');
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(require('./controllers'));

app.listen(CONFIG_API_PORT, () => {
  console.log(`Listening on port ${CONFIG_API_PORT}...`);
});