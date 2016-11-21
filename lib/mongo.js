/**
 * Created by dipper on 2016/11/18.
 */
var config = require('config-lite')
var Mongolass = require('mongolass')
var mongolass = new Mongolass();

var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp')


mongolass.connect(config.mongodb);

// 根据 id 生成创建时间 created_at
//24 位长的 ObjectId 前 4 个字节是精确到秒的时间戳，所以我们没有额外的存创建时间（如: createdAt）的字段
mongolass.plugin('addCreateAt',{
    afterFind:function (results) {
        results.forEach(function (item) {
            item.created_at = moment(objectIdToTimestamp(result.id)).format('YYYY-MM-DD HH:mm');
        })
        return results;
    },
    afterFindOne:function(result){
        if (result) {
            result.created_at = moment( objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
})

exports.User = mongolass.model('User',{
    name:{type:'string'},
    password:{type:'string'},
    avatar:{type:'string'},
    gender:{type:'string',enum:['m','f','x']},
    bio:{type:'string'}
})

// 根据用户名找到用户，用户名是唯一索引
exports.User.index({name:1},{unique:true}).exec();


