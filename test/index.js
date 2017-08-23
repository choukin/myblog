/**
 * Created by dipper on 2016/11/29.
 */
var jwt = require('jsonwebtoken');

var token = jwt.sign({foo:'bar'},'shhhhh');
console.log(token);
var older_token = jwt.sign({foo:'bar',iat:Math.floor(Date.now()/1000)-30},'shhhhh')
console.log(older_token);
// var cert = "dipper";
// var certoken = jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256'});
// console.log(certoken);
// jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256' }, function(err, token) {
//     console.log(token);
// });
// verify a token symmetric - synchronous
var decoded = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODJlN2MzZDRmYzUzYTVhMGE0NWEzYjAiLCJuYW1lIjoibXlibG9nIiwiZ2VuZGVyIjoiZiIsImJpbyI6IjEyMTIxMjEyMSIsImF2YXRhciI6InVwbG9hZF9lYzQ5YWM5YTU1YTYxZjEzMzQ1MDc2ZDU3OWI5YjUxNC5wbmciLCJjcmVhdGVkX2F0IjoiMjAxNi0xMS0xOCAxMTo1NyIsImV4cCI6MTQ4MTAxNTkyOCwiaWF0IjoxNDgwNDExMTI4fQ.zjyLOHnv7kBjeP_lsni6hPeYBkY9nmXahV_0jT2fSBY",
    'dipper');
console.log(decoded) // bar

// get the decoded payload and header
var decoded = jwt.decode(token, {complete: true});
console.log(decoded.header);
console.log(decoded.payload)
