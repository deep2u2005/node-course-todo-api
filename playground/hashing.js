const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10
};

var token = jwt.sign(data,'1234abcd');

var decodedToken = jwt.verify(token , '1234abcde');

console.log(token);
console.log(decodedToken);



// var message = 'I am user number 3';

// var hash = SHA256(message).toString();

// console.log('Messgae: ', message);

// console.log('Hash Messgae: ', hash);

// var data = {
//     id: 4
// }

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

//  token.data.id = 5;
//  token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//     console.log('Token Hash: ', token.hash);
//     console.log('Result Hash', resultHash);
//     console.log('Data was not changed');
// }
// else {
//     console.log('Token Hash: ', token.hash);
//     console.log('Result Hash: ', resultHash);
//     console.log('Data was changed');
// }
