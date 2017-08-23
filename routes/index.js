/**
 * 主路由
 * Created by dipper on 2016/11/11.
 */

module.exports = function (app) {
    
    //重定向到查看文章路由
    app.get('/',function(req,res){
        res.redirect('/posts');
    })

    //注册
    app.use('/signup',require('./signup'))
    //登陆
    app.use('/signin',require('./signin'))
    //登出
    app.use('/signout',require('./signout'))
    //查看文章
    app.use('/posts',require('./posts'));
    app.use('/token',require('./token'));
    app.use(function(err, req, res, next) {
        if (err.name == 'UnauthorizedError') {
            res.status(401);
            res.json({ message: err.name + ":" + err.message });
        }
    });
    app.use(function(req,res){
        if(!res.headersSent){
            res.render(404);
        }
    })
};