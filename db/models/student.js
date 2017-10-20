const Sequelize = require('sequelize');
const db = require('../index');
const Campus = require('./campus');

// DB Design

// Students
// have profile info (e.g. name and email)
// must be assigned to a campus
const Student = db.define('student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  image: {
    type: Sequelize.STRING
  }
}, {
  defaultScope: {
    include: [
      { model: Campus }
    ]
  }
})

module.exports = Student;
