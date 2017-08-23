/**
 * Created by dipper on 2016/11/14.
 */
module.exports = {
    port:4000,//程序监听的端口号
    session:{//express-session 的配置信息
        secret:'myblog',
        key:'myblog',
        maxAge:2592000000
    },
    mongodb:'mongodb://127.0.0.1:27017/myblog'
}