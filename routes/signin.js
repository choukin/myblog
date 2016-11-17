/**
 * Created by dipper on 2016/11/17.
 */
var express = require('express');
var router = express.Router();

var checkNotLogin = require('../middlewares/check').checkNotLogin;

/**
 * GET /signup 注册页
 */
router.get('/',checkNotLogin,function (req,res,next) {
    
})


/**
 * POST /signup 用户注册
 */
router.post('/',checkNotLogin,function (req,res,next) {
    
})

module.exports = router;