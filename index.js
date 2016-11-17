/**
 * Created by dipper on 2016/11/11.
 */
var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');
var routes = require('./routes');
var pkg = require('./package');

var app = express();

//设置模版目录
app.set('views',path.join(__dirname,'views'));
//设置模版引擎为ejs
app.set('view engine','ejs')

//设置静态文件目录 eg：js css img
app.use(express.static(path.join(__dirname,'public')))
//session中间件
app.use(session({
    name:config.session.key,//设置 cookie 中保存 session id 的字段名
    secret:config.session.secret,//通过 secret 来计算 hash 值并放在 cookie 中，使产生 signedCookie 防止篡改
    cookie:{
        maxAge:config.session.maxAge//过期时间，过期后cookie中的session id 自动删除
    },
    store:new MongoStore({// 将 session 存储到 mogondb
        url:config.mongodb// mogondb 地址
    })

}))
// fash 中间件 用来显示通知
app.use(flash());

routes(app);

/**
 * 注意：中间件的加载顺序很重要。如上面设置静态文件目录的中间件应该放到 routes(app) 之前加载，这样静态文件的请求就不会落到业务逻辑的路由里；
 * flash 中间件应该放到 session 中间件之后加载，因为 flash 是基于 session 的。
 */

app.listen(config.port,function(){
    console.log(`${pkg.name} listening on port ${config.port}`);
})