
const crypto = require('crypto')
let secret = crypto.randomBytes(30);

module.exports = secret