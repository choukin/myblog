/**
 * Created by dipper on 2016/11/17.
 */
var express = require('express')
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

/**
 * GET /posts 所有用户或者特定用户的文章页
 *   eg： GET /posts?author=xxx
 */
router.get('/',function (req,res,next) {
    res.send(req.flash());
})

/**
 * POST /posts 发表文章
 */
router.post('/',checkLogin,function (req,res,next) {
    res.send(req.flash);
})

/**
 * GET /posts/create 发表文章页
 */
router.get('/create',checkLogin,function (req,res,next) {
    res.send(req.flash)
})

/**
 * GET /posts/:postId 单独文章页
 */
router.get('/:postId',checkLogin,function (req,res,next) {
    res.send();
})

/**
 * GET /posts/:postId/edit 更新文章页
 */
router.get('/:postId/edit',checkLogin,function (req,res,next) {

})

/**
 * POS /posts/postId/edit 更新文章
 */
router.post('/:postId/edit',checkLogin,function (req,res,next) {

})

/**
 * GET /posts/:postId/remove 删除一篇文章
 */
router.get('/:postId/remove',checkLogin,function (req,res,next) {

})

/**
 * POST /posts/:postId/comment 创建一条留言
 */
router.post('/:postId/comment',checkLogin,function (req,res) {

})

/**
 * GET /post/:postId/comment/:commentId/remove 删除一条留言
 */
router.get('/:postId/comment/:commentId/remove',checkLogin,function () {

})

module.exports = router;