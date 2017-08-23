/**
 * Created by dipper on 2016/11/29.
 */
var Token = require('../lib/mongo').Token
module.exports = {
    //自定义getToken方法
    getToken:function(openid){

        return User.findOne({opid:openid}).exec();
    },
    //自定义setToken方法
    setToken:function (openid,token) {
        var query = {openid:openid};
        var options = {upsert:true};
        return User
            .update(query,token,options)
            .exec();
    }
}