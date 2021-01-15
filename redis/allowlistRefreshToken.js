const redis = require('redis');
const manipulaLista = require('./manipulaLista');
const allowlist = redis.createClient({prefix : 'allowList-RefreshToken:'});
module.exports = manipulaLista(allowlist);
