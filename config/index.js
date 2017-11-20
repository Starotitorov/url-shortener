const nconf = require('nconf');
const path = require('path');
const defaults = require('./defaults');

nconf.argv()
    .env()
    .defaults(defaults);

module.exports = nconf;
