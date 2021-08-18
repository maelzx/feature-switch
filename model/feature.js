const conf = require('../config')();

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  conf.db_name,
  conf.db_user,
  '',
  {
    logging: false,
    host: conf.db_host,
    dialect: 'mysql',
    pool: {
      maxIdleTime: 100,
      maxConnections: 5,
      evict: 0
    }
  }
);

const Feature = function (sequelize, Sequelize) {
  return sequelize.define('feature', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    enable: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    freezeTableName: true
  }
  )
};

const feature = Feature(sequelize, Sequelize);

module.exports = feature;