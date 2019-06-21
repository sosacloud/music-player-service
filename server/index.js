const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/index');

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/api/songs', (req, res) => {
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`music-player-service is listening on ${PORT}`);
});
