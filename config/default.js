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
    mongodb:'mongodb://54315d3e-5134-43f8-abb6-27cb2f0d2c39:b8facf1b-b0f4@192.168.1.19:27017/e0a669c5-786f-4bf1-a27a-c1b68069376f'
}