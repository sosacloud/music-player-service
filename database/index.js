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
