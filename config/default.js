/**
 * Created by dipper on 2016/11/14.
 */
module.exports = {
    port:3333,//程序监听的端口号
    session:{//express-session 的配置信息
        secret:'myblog',
        key:'myblog',
        maxAge:2592000000
    },
    mongodb:'mongodb://localhost:27017/myblog'
}