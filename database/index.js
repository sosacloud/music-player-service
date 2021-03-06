const Sequelize = require('sequelize');
const { database, user, password } = require('./auth');

const db = new Sequelize(database, user, password, {
  dialect: 'mysql',
  host: '172.17.0.2',
  port: '3306'
});

db.authenticate()
  .then(() => {
    console.log('music-player-service database is connected');
  })
  .catch(err => {
    throw err;
  });

const Songs = db.define(
  'Songs',
  {
    song_artist: Sequelize.STRING,
    song_title: Sequelize.STRING,
    song_album: Sequelize.STRING,
    song_url: Sequelize.STRING,
    user: Sequelize.STRING, // use comments-service
    user_comment: Sequelize.STRING, // use comments-service
    song_release: Sequelize.DATE, // should render 'X days ago' on client
    song_tags: Sequelize.STRING,
    song_length: Sequelize.INTEGER,
    song_thumbnail: Sequelize.STRING
  },
  {
    timestamps: false
  }
);

db.sync();

module.exports = { Songs };
