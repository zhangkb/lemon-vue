var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var api = require('./api');
var jwt = require('jsonwebtoken');
/* GET home page. */

//设置跨域访问
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// module.exports = router;
module.exports = function(app) {
    app.get("/logout", api.logout);
    app.post("/login", api.login);
    app.post("/register", api.setUser);
    app.post("/upload", api.upload);
    app.post("/create", api.setArticle);
    app.get("/list", api.meetArticle);
    app.get("/detail",api.listArticle);
}
