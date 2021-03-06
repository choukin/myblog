/**
 * Created by dipper on 2016/11/17.
 */
var express = require('express')
var router = express.Router();
var jwt = require('express-jwt');
var checkLogin = require('../middlewares/check').checkLogin;
var auth = require('../middlewares/check').auth;
var PostModel = require('../models/posts');
var UserModel = require('../models/users');
var CommentModel = require('../models/comments');

/**
 * GET /posts 所有用户或者特定用户的文章页
 *   eg： GET /posts?author=xxx
 */
router.get('/',function (req,res,next) {
    var author = req.query.author;
    var token = UserModel.generateJwt(req.session.user);
    PostModel.getPosts(author)
        .then(function (posts) {
           
            res.render('posts',{
                posts:posts,
                token:token
            })
        }).catch(function(e){

        console.error(e);
        throw e;
        next();
    })
})

/**
 * POST /posts 发表文章
 */
router.post('/',
    jwt({
        secret: 'dipper',
        requestProperty: 'auth',
        getToken: function fromHeaderOrQuerystring (req) {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                return req.headers.authorization.split(' ')[1];
            } else if (req.query && req.query.token) {
                return req.query.token;
            }else if(req.fields.token){
                return req.fields.token;
            }
            return null;
        }}),
    function (req,res,next) {
    console.log(req.auth);
     var author = req.session.user._id;
    var title = req.fields.title;
    var content = req.fields.content;

    //校验参数
    try{

        if(!title.length){
            throw new Error('请填写标题');
        }
        if(!content.length){
            throw new Error('请填写内容');
        }

    }catch (e){
        req.flash('error',e.message);
        return res.redirect('back');
    }

    var post = {
        author:author,
        content:content,
        title:title,
        pv:0
    };

    PostModel.create(post)
        .then(function (result) {

            post = result.ops[0];
            req.flash('success','发表成功')
            res.redirect(`/posts/${post._id}`)
        })
        .catch(next);

})

/**
 * GET /posts/create 发表文章页
 */
router.get('/create',checkLogin,function (req,res,next) {
   res.render('create')
})

/**
 * GET /posts/:postId 单独文章页
 */
router.get('/:postId',checkLogin,function (req,res,next) {
    var postId = req.params.postId;
    Promise.all([
        PostModel.getPostById(postId),//获取文章信息
        CommentModel.getComments(postId),
        PostModel.incPV(postId)//pv 加 1
    ]).then(function(result){
        var post = result[0]
        var comments = result[1];
        if(!post){
            throw new Error('文章不存在')
        }

        res.render('post',{
            post:post,
            comments:comments
        })
    }).catch(next);
})

/**
 * GET /posts/:postId/edit 更新文章页
 */
router.get('/:postId/edit',checkLogin,function (req,res,next) {
  var postId = req.params.postId;
    var author = req.session.user._id;

    PostModel.getRawPostById(postId)
        .then(function(post){
            if(!post){
                throw new Error('该文章不存在')
            }

            if(author.toString() !== post.author._id.toString()){
                throw new Error('权限不足');
            }

            res.render('edit',{
                post:post
            })
        }).catch(next);

})

/**
 * POS /posts/postId/edit 更新文章
 */
router.post('/:postId/edit',checkLogin,function (req,res,next) {
    var postId = req.params.postId;
    var author = req.session.user._id;
    var title = req.fields.title;
    var content = req.fields.content;
    
    PostModel.updatePostById(postId,author,{title:title,content:content})
        .then(function () {
            req.flash('success','编辑文章成功');
            res.redirect(`/posts/${postId}`)
        }).catch(next);
})



/**
 * GET /posts/:postId/remove 删除一篇文章
 */
router.get('/:postId/remove',checkLogin,function (req,res,next) {
    var postId = req.params.postId;
    var author = req.session.user._id;
    
    PostModel.delPostById(postId,author)
        .then(function () {
            req.flash('success','删除文章成功');
            res.redirect('/posts');
        }).catch(next);
    
})

/**
 * POST /posts/:postId/comment 创建一条留言
 */
router.post('/:postId/comment',checkLogin,function (req,res,next) {
    var author = req.session.user._id;
    var postId = req.params.postId;
    var content = req.fields.content;

    if(!content.length){
        req.flash('error','留言内容不能为空')
       return res.redirect('back')
    }
    var comment = {
        author:author,
        postId:postId,
        content:content
    };

    CommentModel.create(comment)
        .then(function () {
            req.flash('success','留言成功');
            res.redirect('back');
        }).catch(next);
})

/**
 * GET /post/:postId/comment/:commentId/remove 删除一条留言
 */
router.get('/:postId/comment/:commentId/remove',checkLogin,function (req,res,next) {
     var postId = req.params.postId;
    var commentId = req.params.commentId;
    var author = req.session.user._id;

    CommentModel.delCommentById(commentId,author)
        .then(function () {
            req.flash('success','删除留言成功');
            res.redirect('back');
        })
        .catch(next)

})

module.exports = router;