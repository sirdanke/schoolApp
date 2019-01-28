'use strict';
module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: { type : DataTypes.STRING,
      validate : {
        isEmail : {
          args : true,
          msg : 'your email format is wrong'
        },
        isUnique  : function(value) {
          return Teacher.findOne({ where : { email : value}})
          .then(data => {
            if(data != undefined) {
              throw 'Email has already registered'
            }
          })
          .catch(err => {
            throw err
          })
        }
      }
    },
    SubjectId : DataTypes.INTEGER
  }, {});
  Teacher.associate = function(models) {
    Teacher.belongsTo(models.Subject);
  };
  return Teacher;
};