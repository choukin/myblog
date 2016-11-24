/**
 * Created by dipper on 2016/11/24.
 */
var marked = require('marked')
var Post = require('../lib/mongo').Post;

var CommentModel = require('./comments');

Post.plugin('addCommentsCount',{
    afterFind:function(posts) {
        return Promise.all(posts.map(function(post){
            return CommentModel.getCommentsCount(post._id).then(function(commentsCount){
                post.commentsCount = commentsCount;
                return post;
            })
        }))
    },
    afterFindOne:function(post){
        if(post){
            return CommentModel.getCommentsCount(post._id).then(function(count){
                post.commentsCount = count;
                return post;
            })
        }

        return post;
    }
})

Post.plugin('contentToHtml',{
    afterFind:function(posts){
        return posts.map(function(post){
            post.content = marked(post.content);
            return post;
        })
    },
    afterFindOne:function(post){
        if(post){
            post.content = marked(post.content);

        }
        return post;
    }
})

module.exports = {
    //创建一篇文章
    create : function (post) {
        return Post.create(post).exec();
    },
    //通过文章 id 获取一篇文章
    getPostById:function(postId){
        return Post
            .findOne({_id:postId})
            .populate({path:'author',model:'User'})//关联查询
            .addCreateAt()
            .contentToHtml()
            .addCommentsCount()
            .exec();
    },

    // 按照创建时间降序获取所有用户文章或者某个特定用户的所有文章
    getPosts:function (author) {
        var query = {};
        if(author){
            query.author = author;
        }
        return Post.find(query)
            .populate({path:'author',model:'User'})
            .sort({_id:-1})
            .addCreateAt()
            .contentToHtml()
            .addCommentsCount()
            .exec();
    },
    // 通过文章 id 给 pv 加 1
    incPV:function (postId) {
        return Post.update({_id:postId},{$inc:{pv:1}}).exec();
    },
    // 通过文章 id 获取一篇原生文章用于编辑
    getRawPostById:function (postId) {
        return Post.findOne({_id:postId})
            .populate({path:'author',model:'User'})
            .exec();
    },
    //通过 用户ID 和文章 id 更新文章
    updatePostById:function(postId,author,data){
        return Post.update({author:author,_id:postId},{$set:data}).exec();
    },
    //通过用户 ID 和文章 id 删除文章
    delPostById: function(postId,author){
        return Post.remove({author:author,_id:postId}).exec();
    }

}