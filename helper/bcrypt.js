const bcrypt = require('bcrypt')


function encryptBcrypt (user) {
    return new Promise((resolve,reject)=> {
        bcrypt
        .genSalt(10)
        .then(salt => {
          return bcrypt.hash(`hacktiv8${user.name}`, salt);
        })
        .then(hash => {
          resolve(hash)
        })
        .catch(err => {
          reject(err)
        })
    })
   
}

module.exports = encryptBcrypt