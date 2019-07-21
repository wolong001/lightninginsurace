// user.js

const express = require('express')
const model = require('./model')
const User = model.getModel('user')
const cryptico=require('cryptico')
const fs=require('fs')
const path=require('path')
// 生成express路由中间件
const Router=express.Router();
const exec=require('child_process').execSync;

// 封装MD5加密规则
//生成私钥
var PassPhrase = "The Moon is a Harsh Mistress.";
var Bits = 1024;
var MattsRSAkey = cryptico.generateRSAKey(PassPhrase, Bits);




//过滤调不想暴露的数据
const _filter = {
    "__v": 0,
    "pwd": 0
}




Router.get('/runai', async (req, res) => {
    console.log("运行AI")
    let a=await exec('python F:\\Thunder\\frontend\\server\\test.py');
    console.log("结束")
    // res.send(a.toString())

    // console.log(a.toString())
    //
    const file = path.join(__dirname, 'out.json'); //文件路径，__dirname为当前运行js文件的目录

    //读取json文件
    fs.readFile(file, 'utf-8', function (err, data) {
        if (err) {
            res.send('文件读取失败');
        } else {
            res.send(data);
        }
    });
})

Router.post('/upload',async (req, res) => {
    console.log("接收上传请求")
    const imgData =  req.body.imgData;
    //过滤data:URL
    // console.log(req.body);
    // var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    // var dataBuffer = new Buffer(base64Data, 'base64');
    // fs.writeFile("image.png", dataBuffer, function(err) {
    //     if(err){
    //         console.log(err)
    //     }else{
    //         console.log("上传成功！")
    //     }
    // });
})

// // CheckLogin.js 用户查询用户是否登录的接口
// Router.get('/info', (req, res) => {
//     const { userId } = req.cookies
//     if (!userId) {
//         res.json({ code: 1, msg: '用户未登录' })
//     }
//     else{
//         console.log('userId: ', userId);
//
//         User.findOne({ _id: userId }, _filter, (err, doc) => {
//             if (err) {
//                 return res.json({ code: 1, msg: '服务器异常' })
//             }
//             if (doc) {
//                 return res.json({ code: 0, msg: '用户已登录', data: doc })
//             }
//         })
//     }
//
// })

// 获取注册用户列表
// Router.get('/list', (req, res) => {
//     //清空所有用户
//     // User.remove({}, (err, doc) => {
//     //  if (!err) {
//     //      console.log(`用户清空成功`);
//     //  }
//     // })
//
//     // 在user这个数据模型中查询所有用户
//     User.find({}, (err, doc) => {
//         if (!err) {
//             return res.json({
//                 code: 0,
//                 data: doc,
//                 msg: '用户列表获取成功'
//             })
//         }
//     })
// })

//获取并返回所有用户信息
// Router.get('/allInfo', (req, res) => {
//     const { userId } = req.cookies
//     if (!userId) {
//         res.json({ code: 1, msg: '用户未登录' })
//     }else{
//         User.find({}, (err, doc) => {
//             if (!err) {
//
//                 return res.json({
//                     code: 0,
//                     data: doc,
//                     msg: '用户列表获取成功'
//                 })
//             }
//         })
//     }
//
// })

// 注册接口
Router.get('/test',(req,res) =>{
    console.log("test!")
    // const {
    //     username,
    //     pwd
    // } = req.body;
    // console.log('username',username)
    // console.log('pwd',pwd)
})

Router.post('/register', (req, res) => {
    console.log("Post Register")
    const {
        username,
        realname,
        pwd
    } = req.body;
    //pwd解密
    console.log('username: ', username);
    console.log('passwd',pwd);
    const pwdDecrypt = cryptico.decrypt(pwd, MattsRSAkey);
    console.log('pwdDecrypt: ', pwdDecrypt['plaintext']);

    // 在user这个数据模型中查询用户注册的账号是否存在
    User.findOne({
        name:username
    }, (err, doc) => {
        //
        console.log('RE DOC:',doc);
        if (doc) {
            console.log('用户已存在')
            return res.json({
                code: 1,
                msg: '用户已存在'
            })
        }
        if (err) {
            return res.json({
                code: 1,
                msg: '服务器异常'
            })
        }
        console.log("\n准备创建");
        User.create({
            username,
            realname,
            pwd: pwdDecrypt['plaintext'],
        }, (err, doc) => {
            if (err) {
                console.log('\nwrong');
                return res.json({
                    code: 1,
                    msg: '服务器异常'
                })
            }
            console.log('\nyes');
            return res.json({
                code: 0,
                data: doc
            })
        })
    })
})

Router.post('/login', (req, res) => {
    console.log("Post Login");
    const {
        username,
        pwd
    } = req.body;
    //pwd解密
    console.log('username: ', username);
    console.log('passwd',pwd);
    const pwdDecrypt = cryptico.decrypt(pwd, MattsRSAkey);
    // if (pwd === pwdDecrypt){
        // console.log('密码匹配成功');
    // }
    // else{
    // }
    console.log('pwdDecrypt: ', pwdDecrypt['plaintext']);
    User.findOne({
        name:username,
        pwd: pwdDecrypt['plaintext']
    }, (err, doc) => {
        console.log('LO DOC:',doc);
        if (!doc) {
            console.log('Wrong!');
            return res.json({
                code: 1,
                msg: '账号密码不正确'
            })
        }
        if (err) {
            console.log('err');
            return res.json({
                code: 1,
                msg: '服务器异常'
            })
        }
        console.log('Login success!')
        res.cookie('userId', doc._id) // 登录成功保存cookie
        return res.json({
            code: 0,
            msg: '登录成功',
            data: doc
        })
    })
})


Router.get('/loginOut', (req, res) => {
    const { userId } = req.cookies;
    if (!userId) {
        res.json({ code: 1, msg: '服务器异常' })
    }
    res.cookie('userId', '');
    return res.json({ code: 0, msg: '退出成功' })
})

module.exports = Router
// 这里注意，因为要接受参数，所以在server.js安装body-parser并app.use(bodyParser.json())