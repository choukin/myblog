var jwt = require('express-jwt');
var auth = jwt({
    secret: 'dipper',
});
/**
 * check 检查用户登陆中间件
 * Created by dipper on 2016/11/14.
 */
module.exports = {
    /**
     * 当用户信息不存在，用户未登陆，显示通知，重定向到登陆页面
     * 用于需要用户登录才能操作的页面及接口
     * @param req
     * @param res
     * @param next
     */

    checkLogin:function checkLogin(req,res,next){
        if(!req.session.user){
            req.flash('error','未登陆')
            return res.redirect('/signin')
        }
        next();
    },

    /**
     * 当用户信息存在，提示用户已登录，返回上一页面
     * 如登录、注册页面及登录、注册的接口
     * @param req
     * @param res
     * @param next
     */

    checkNotLogin:function checkNotLogin(req,res,next) {
        if(req.session.user){
            req.flash('error','已登录')
            return res.redirect('back');
        }
        next();
    },
    auth:auth
}