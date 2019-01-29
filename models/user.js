'use strict';
const bycript = require('../helper/bcrypt')
const crypto = require('../helper/crypto')
const secret = require('../helper/secret')


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    secret : DataTypes.STRING
  }, {

    });

  User.associate = function (models) {
    // associations can be defined here
  }
  User.beforeCreate((user) => {

    // USING BYCRIPT
    // return bycript(user)
    // .then(data => {
    //   user.password = data
    // })
    // .catch(err => {
    //   console.log(err);
    // })


    // using crypto 
    let hash = crypto(user,secret)
    user.password = hash
    user.secret = secret
  });
  return User
};