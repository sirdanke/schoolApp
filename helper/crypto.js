const crypto = require('crypto')

    function cryptoCript (user, secret) {
        return crypto.createHmac('sha256', secret)
                   .update(`hacktiv8${user.name}`)
                   .digest('hex');
    }


    module.exports = cryptoCript
    