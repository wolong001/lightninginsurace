// server/model.js
const mongoose = require('mongoose')


// mongoose 连接这个数据库并生成"react-login-register"这个集合
mongoose.connect('mongodb://127.0.0.1:27017/thunder')

// 连接成功后的打印
mongoose.connection.on('connected',() => {
    console.log('mongo connect success');
})

// 创建数据模型
const models = {
    user: {
        'username': {type:String, require: true}, // 账号
        'realname': {type:String, require: true}, // 真实姓名
        'pwd': {type:String, require: true}, // 密码
    }
}

// 遍历生成数据模型
for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

// 导出供其他地方获取
module.exports = {
    getModel: function (m) {
        return mongoose.model(m)
    }
}