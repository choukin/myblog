/**
 * Created by dipper on 2016/11/24.
 */
var marked = require('marked')
var Comment = require('../lib/mongo').Comment;

Comment.plugin('contentToHtml',{
    afterFind:function(comments){
        return comments.map(function(comment){
            comment.content = marked(comment.content)
            return comment;
        })
    }
})

module.exports = {
    //创建留言
    create :function(comment){
            return Comment.create(comment).exec();
    },
    // 通过用户 id 留言 id 删除一条留言
    delCommentById:function(commentId,author){
        return Comment.remove({author:author,_id:commentId}).exec();
    },
    // 通过文章 id 查询所有留言 按创建时间升序
    getComments:function(postId){
        return Comment.find({postId:postId})
            .populate({path:'author',model:'User'})
            .sort({_id:1})
            .contentToHtml()
            .addCreateAt()
            .exec();
    },
    // 通过文章 id 获取该文章下留言数
    getCommentsCount:function(postId){
        return Comment.count({postId:postId}).exec();
    }


}