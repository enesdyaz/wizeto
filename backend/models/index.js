const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);



//------------------------------------------------//
// ADD MODELS 
//------------------------------------------------//

db.User = require('./user') (sequelize, Sequelize)  
db.Image = require('./image') (sequelize, Sequelize)  
db.mainFormContent = require('./mainFormContent')(sequelize, Sequelize)




Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

