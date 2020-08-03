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

app.get('/api/songs/:id', (req, res) => {
  const id = req.params.id;
  // console.log('THIS IS ID', req.params.id);
  db.Songs.findByPk(id)
    .then((data) => {
      res.send(data).status(200);
    })
    .catch((err) => {
      res.send(err).status(500);
    });
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
