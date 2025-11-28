const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = ALPHABET.length;


function encode(num) {
if (num === 0) return ALPHABET[0];
let s = '';
while (num > 0) {
s = ALPHABET[num % BASE] + s;
num = Math.floor(num / BASE);
}
return s;
}


module.exports = { encode };
