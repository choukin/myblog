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
       return  results.map(function (result) {
           result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
           return result;
        })

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


exports.Post = mongolass.model('Post',{
    author:{type:Mongolass.Types.ObjectId},
    title:{type:'string'},
    content:{type:'string'},
    pv:{type:'number'}
})

exports.Post.index({author:1,_id:-1}).exec();//按照创建时间降序查找用户文章列表


exports.Comment = mongolass.model('Comment',{
    author:{type:Mongolass.Types.ObjectId},
    content:{type:'string'},
    postId:{type:Mongolass.Types.ObjectId}
})

exports.Comment.index({postId:1,_id:1}).exec();
exports.Comment.index({author:1,_id:1}).exec();

exports.Token = mongolass.model('Token',{
    access_token:{type:'string'},
    expires_in:{type:'number'},
    refresh_token:{type:'string'},
    openid:{type:'string'},
    scope:{type:'string'},
    create_at:{type:'string'}
})