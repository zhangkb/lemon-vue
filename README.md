:q

# lemon-vue

> 个人网站项目

2018-12-17
1. 基础静态页面发布
2. 服务端数据库添加安全规则，添加角色权限
3. 服务器配置域名访问地址
**********
2018-12-18
1. 通过express框架搭建网站后台，上线发布文章功能
2. 通过富文本编辑器进行文章编辑（vue-quill-editor）
3. 使用quill-image-extend-module模块截获图片上传，修改为上传至服务器，减少文档中base64编码
**********
2018-12-19
1. 优化文章数据结构表添加图片地址字段作为缩略图展示
2. 部分UI样式修改优化
**********
2018-12-21
1. 添加用户访问数据表，记录访问地址 以及ip信息
2. 添加request 模块，获取访问信息
3. 使用[http://ip.taobao.com/service/getIpInfo.php?ip=](http://ip.taobao.com/service/getIpInfo.php?ip=)获取ip地址信息
**********
网站地址：[www.lemontea.xin](http://www.lemontea.xin)
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
# lemon-vue
