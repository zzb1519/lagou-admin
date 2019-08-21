const userModel = require('../models/users')
const crypt = require('../utils/tools')

module.exports = {
    async signup(req , res , next){

       let { password , username} = req.body
        let newPassword = await crypt.crypt(req.body.password)

        // 存储数据到数据库
       await userModel.save({
           username,
           password:newPassword
       })

    //    res.json(result) //????为啥在页面

    // 给前端返回接口
       res.render('succ',{
           data:JSON.stringify({
               msg:'用户注册成功'
           })
       })



    }
}