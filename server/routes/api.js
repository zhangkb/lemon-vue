const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('./../model/user');
const Article = require('./../model/article');
const Count = require('./../model/count');
const mongoose = require('mongoose')


/**
 * 登录
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

var login = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    let email = req.body.name;
    let password = req.body.password;
    console.log("password", password)
    let phone = req.body.phone;
    let query = '';
    if (email) {
        query = {
            name: email
        }
    } else if (phone) {
        query = {
            phone: phone
        }
    }
    User.findOne(query).then((data) => {
        console.log("登陆用户", data);
        if (!data) {
            console.log("wrong user")
            res.json({
                msg: {
                    status: 0,
                    msg: '用户不存在'
                }
            })
        }
        if (data.paw == req.body.password || query.phone) {
            console.log("login success")
            console.log('过期时间：',config.exp);
            var token = jwt.sign({
                exp: config.exp,
                name: data.person
            }, config.secret, function(err, token) {
                console.log(token);
                res.json({
                    msg: {
                        status: 1,
                        msg: "登录成功"
                    },
                    data: {
                        token: token,
                        id: data._id
                    }
                })
            });
        } else {
            console.log("wrong password")
            res.json({
                msg: {
                    status: 2,
                    msg: "密码错误"
                }
            })
        }

    })

}

/**
 * 新建用户
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
var setUser = function(req, res) { // 创建用户
        res.header("Access-Control-Allow-Origin", "*");
        const admin = new User({
            name: req.body.name,
            paw: req.body.password,
            sex: req.body.sex,
            age: req.body.age,
            loginDate: new Date()
        });
        console.log(admin)
        admin.save((err, data) => {
            if (err) {
                res.json({
                    msg: {
                        status: 0,
                        msg: '哇哦创建用户错误'
                    },
                });
            }

            res.json({
                msg: {
                    status: 1,
                    msg: '创建成功'
                },
                data: data
            })
        });

    }
    /**
     * 退出登录
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     返回数据
     */
var logout = function(req, res) {
        res.header("Access-Control-Allow-Origin", "*");

        var token = req.query.token;
        console.log(token)
        new Promise(function(resolve, reject) {
            jwt.verify(token, config.secret, function(err, decoded) {
                console.log(err)
                if (err) {
                    res.json({
                        msg: {
                            status: 'fail',
                            msg: "token verify fail!"
                        }
                    })
                } else {
                    req.decoded = decoded;
                    resolve();
                }
            })
        }).then((data) => {
            res.json({
                ok: 2,
                user: req.decoded
            })
        })

    }
    /**
     * 重置密码
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
var resetPsw = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    // mongoose.Types.ObjectId()
    console.log(req.body)
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;
    let query = '';
    if (email) {
        query = {
            email: email
        }
    } else if (phone) {
        query = {
            phone: phone
        }
    }
    User.findOneAndUpdate(query, {
        $set: { password: password }
    }).then((data, err) => {
        if (data) {
            res.json({
                msg: {
                    status: 1,
                    msg: '更新密码成功'
                }
            })
        } else {
            res.json({
                msg: {
                    status: 0,
                    msg: '账号不存在',
                }
            })
        }
    });
}
var userDetail = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    let token = req.query.token;
    let userid = req.query.id;
    // console.log(req);
    console.log(userid)
    new Promise(function(resolve, reject) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                res.json({
                    ok: 0,
                    msg: err
                })
            } else {
                User.find({
                    _id: userid
                }, {
                    password: 0,
                    demand_list: 0,
                    roles: 0
                }).then((response) => {
                    if (!response) {
                        console.log("wrong user")
                        res.json({
                            msg: {
                                status: 0,
                                msg: '用户不存在'
                            },
                            data: {}
                        })
                    }
                    console.log(response)
                    res.json({
                        msg: {
                            status: 1,
                            msg: '获取成功'
                        },
                        data: response
                    })
                })
            }
        });
    });
}
var updateUser = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    let token = req.body.token;
    let user = req.body.user;
    let userid = req.body.id;
    user = JSON.parse(user);
    console.log(user.person)
    new Promise(function(resolve, reject) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                res.json({
                    ok: 0,
                    msg: 'token verify fail!'
                })
            } else {
                User.findOneAndUpdate({
                    _id: userid
                }, { $set: user }, { new: true }).then((response) => {
                    if (!response) {
                        console.log("wrong user")
                        res.json({
                            msg: {
                                status: 0,
                                msg: '用户不存在'
                            },
                            data: {}
                        })
                    }
                    console.log(response)
                    res.json({
                        msg: {
                            status: 1,
                            msg: '修改成功'
                        },
                        data: response
                    })
                })
            }
        });
    });
}

var upload = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    if (!req.files) {
        res.json({
            msg: 0
        });
    }
    console.log(req.files.foo);
    console.log(req.files);
    let sampleFile = req.files.foo;

    sampleFile.mv('./www/' + req.files.foo.name, function(err) {
        console.log(err)
        if (err) {
            res.json({
                msg: "上传失败"
            });
        }

        res.json({
            msg: 1,
            info: '/static/'+req.files.foo.name
        });
    });
}
var setArticle = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body)
    const art = new Article({
        title: req.body.title,
        author: req.body.name,
        content: req.body.content,
        imgUrl: req.body.img,
        changeDate: new Date()
    });

    // new Promise((resolve, reject) => {
    //     jwt.verify(token, config.secret, function(err, decoded) {
    //         if (err) {
    //             res.json({
    //                 ok: 0,
    //                 msg: err
    //             })
    //         } else {
                art.save((err, data) => {
                    if (err) {
                        res.json({
                            msg: {
                                status: 0,
                                msg: '哇哦出错了',
                                err: err
                            }
                        });
                    }
                    res.json({
                        msg: {
                            status: 1,
                            msg: '创建成功',
                            _id: data._id,
                        },
                    })

                });
    //         }
    //     })
    // });

}
var meetArticle = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    // new Promise((resolve, reject) => {
    //     jwt.verify(token, config.secret, function(err, decoded) {
    //         if (err) {
    //             res.json({
    //                 ok: 0,
    //                 msg: err
    //             })
    //         } else {
                Article.find({
                    author: req.query.name
                },{
                    content: 0
                }).then((response) => {
                    if (!response) {
                        res.json({
                            msg: '还没写文章哦',
                            data: {}
                        });
                    }
                    console.log(response)
                    res.json({
                        msg: {
                            status: 1,
                            msg: '获取成功'
                        },
                        data: response
                    })
                });

    //         }
    //     })
    // });

}
var listArticle = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.query)
    // new Promise((resolve, reject) => {
    //     jwt.verify(token, config.secret, function(err, decoded) {
    //         if (err) {
    //             res.json({
    //                 ok: 0,
    //                 msg: err
    //             })
    //         } else {
                Article.find({
                    _id: req.query._id
                },{
                    // content: 0
                }).then((response) => {
                    if (!response) {
                        res.json({
                            msg: '还没写文章哦',
                            data: {}
                        });
                    }
                    console.log(response)
                    res.json({
                        msg: {
                            status: 1,
                            msg: '获取成功'
                        },
                        data: response
                    })
                });

    //         }
    //     })
    // });

}
var get_client_ip = function (req) {
    var ipStr = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    var ipReg = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
    if (ipStr.split(',').length > 0) {
        ipStr = ipStr.split(',')[0]
    }
    var ip = ipReg.exec(ipStr);
    return ip[0];
};
var countNum = function (req, res) {
    var ipStr = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    console.log(ipStr);
    const count = new Count({
        location: get_client_ip(req),
        loginDate: new Date()
    });
    // console.log(req);
    count.save((err, data) => {
        if (err) {
            res.json({
                msg: '出错了！',
                data: err,
            });
        }
        res.json({
            msg: '成功',
            status: 1,
        });
    });
};
module.exports = {
    logout: logout,
    setUser: setUser,
    login: login,
    reset: resetPsw,
    userdetail: userDetail,
    updateuser: updateUser,
    upload: upload,
    setArticle: setArticle,
    meetArticle: meetArticle,
    listArticle: listArticle,
    countNum: countNum
};
