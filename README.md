 功能及路由设计如下：

1.注册
  1.注册页：GET /signup
  2.注册（包含上传头像）：POST /signup
2.登录
    1.登录页：GET /signin
    2.登录：POST /signin
    3.登出：GET /signout
3.查看文章
    1.主页：GET /posts
    2.个人主页：GET /posts?author=xxx
    3.查看一篇文章（包含留言）：GET /posts/:postId
4.发表文章
    1.发表文章页：GET /posts/create
    2.发表文章：POST /posts
    3.修改文章
    4.修改文章页：GET /posts/:postId/edit
    5.修改文章：POST /posts/:postId/edit
    6.删除文章：GET /posts/:postId/remove
5.留言
    1.创建留言：POST /posts/:postId/comment
    2.删除留言：GET /posts/:postId/comment/:commentId/remove

#### restful

restful 是一种 api 的设计风格，提出了一组 api 的设计原则和约束条件。

如上面删除文章的路由设计：

```
GET /posts/:postId/remove
```

restful 风格的设计：

```
DELETE /post/:postId
```

可以看出，restful 风格的 api 更直观且优雅。