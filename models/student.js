'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: { type : DataTypes.STRING,
            validate : {
              isEmail : {
                args : true,
                msg : 'your email format is wrong'
              },
              isUnique  : function(value) {
                return Student.findOne({ where : { email : value}})
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
          }
  }, {});
  Student.associate = function(models) {
    Student.belongsToMany(models.Subject, {through : 'StudentSubject'})
    // associations can be defined here
    // Student.hasMany(models.StudentSubject);
  };
  return Student;
};