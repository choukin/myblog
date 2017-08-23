/**
 * Created by dipper on 2016/11/29.
 */
var Token = require('./token');
var OAuth = require('wechat-oauth');
var client = new OAuth('wx0b0a842228c994c2', 'd85a58fb6306aa19b8773a33c83ccdd1 ', function (openid, callback) {
    // 传入一个根据openid获取对应的全局token的方法
    // 在getUser时会通过该方法来获取token
    Token.getToken(openid, callback);
}, function (openid, token, callback) {
    // 持久化时请注意，每个openid都对应一个唯一的token!
    Token.setToken(openid, token, callback);
});