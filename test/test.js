/**
 * Created by dipper on 2016/12/15.
 */
// function* gen(x){
//     try {
//         var y = yield x + 2;
//     }catch(e){
//         console.log(e)
//     }
//
//     return y;
// }
// var g = gen(1);
// var m1 = g.next();
// g.throw('错了');
var fetch = require('node-fetch');
// function* gen( ) {
//     var url = 'https://api.github.com/users/github';
//     var result = yield fetch(url);
// console.log(result)
// }
//
// var g = gen();
// var result = g.next();
//
// result.value.then(function (data) {
//
//     return data.text();
// }).then(function (data) {
// g.next(data)
//
// })



var co = require('co');
co(function *() {
    var res = yield fetch('https://api.github.com/users/github');
    var json = yield res.json();
    console.log(json);
});

co(function* () {
    var res = yield {
        1: Promise.resolve(1),
        2: Promise.resolve(2),
    };
    console.log(res);
}).catch(function(error){

});