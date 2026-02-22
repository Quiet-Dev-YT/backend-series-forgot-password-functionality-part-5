const auth = require('./auth.middlware')
const role = require('./role.middleware')
module.exports = { auth, role }