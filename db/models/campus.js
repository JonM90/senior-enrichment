// import Sequelize from 'sequelize';
const Sequelize = require('sequelize');
const db = require('../index');

// DB Design

// Campuses
// have info such as a name and image
// can have many students assigned (may have none)
const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING
  }
})

//export default Campus;
module.exports = Campus;
