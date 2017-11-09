const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = ALPHABET.length;

module.exports.encode = function(number) {
    const parts = [];

    while (number) {
        const remainder = number % BASE;
        number = Math.floor(number / BASE);
        parts.push(ALPHABET[remainder]);
    }

    return parts.reverse().join('');
};

module.exports.decode = function(str) {
    let decoded = 0;

    for (let i = 0; i < str.length; ++i) {
        const index = ALPHABET.indexOf(str[i]);
        const power = str.length - 1 - i;
        decoded += index * (Math.pow(BASE, power));
    }

    return decoded;
};
