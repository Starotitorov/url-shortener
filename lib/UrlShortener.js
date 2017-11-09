const { encode, decode } = require('./Encoder');

module.exports.generate = function(protocol, hostname, doc) {
    const host = `${protocol}://${hostname}/`;

    return host + encode(doc._id);
};

module.exports.parse = function(encoded) {
    return decode(encoded);
};
