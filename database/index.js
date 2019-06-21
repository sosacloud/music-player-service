const Sequelize = require('sequelize');

const db = new Sequelize('SoSaCloud', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

db.authenticate()
  .then(() => {
    console.log('database is connected');
  })
  .catch(err => {
    throw err;
  });

const Songs = db.define(
  'Songs',
  {
    song_artist: Sequelize.STRING,
    song_title: Sequelize.STRING,
    song_url: Sequelize.STRING, // AWS S3
    user: Sequelize.STRING, // call to Juan's service
    user_comment: Sequelize.STRING, // call to Juan's service
    song_release: Sequelize.DATE,
    song_tags: Sequelize.STRING,
    song_length: Sequelize.INTEGER, // make sure to render proper format on client side using styling or VanillaJS
    song_thumbnail: Sequelize.STRING // AWS S3
  },
  {
    timestamps: false
  }
);

db.sync();

module.exports = { Songs };
