const userModel = require('../models/users')
const tools = require('../utils/tools')

module.exports = {
    async signup(req , res , next){

        res.set('content-type', 'application/json;charset=utf-8')
       let { password , username} = req.body
       let result = await userModel.findOne(username)

       if(!result){
           let newPassword = await tools.crypt(req.body.password)
           // 存储数据到数据库
           await userModel.save({
               username,
               password: newPassword
           })
           //    res.json(result) //????为啥在页面
           // 给前端返回接口
           res.render('succ', {
               data: JSON.stringify({
                   msg: '用户注册成功'
               })
           })
           }
           res.render('fail',{
            data: JSON.stringify({
              msg: '用户名已存在'
            })
         })
       },


    async signin(req,res, next){
        res.set('content-type', 'application/json;charset=utf-8')
        let {username , password} = req.body
        //从数据库里根据用户名取出用户信息。
        let result = await userModel.findOne(username)
        // console.log(result);
        if(result){
           if (await tools.compare(password , result.password)) {
            //    res.cookie('name', 'tobi');
               req.session.username = username
               res.render('succ' , {
                   data: JSON.stringify({
                       msg: '用户登录成功.',
                       username
                   })
               })
           } else{
                res.render('fail' , {
                    data: JSON.stringify({
                        msg: '密码错误。.'
                    })
                })
           }
        } else{
            res.render('fail' , {
                data: JSON.stringify({
                    msg: '账号错误。.'
                })
            })
        }
    },

    async isSignin(req , res , next){
        res.set('content-type', 'application/json; charset=utf-8')

         let username =  req.session.username
        if (username){
            // if(req.url === '/list'){
                //     // console.log(req.url)
                //     next()
                // }else{
                    //         res.render('succ' , {
                        //         data:JSON.stringify({
                            //             msg:'用户有权限',
                            //             username
                            //         })
                            //     })
                            // }
            res.render('succ', {
                data: JSON.stringify({
                    msg: '用户有权限',
                    username
                })
            })
        }else{
            res.render('fail' , {
                data:JSON.stringify({
                    msg:'用户没有权限',
                })
            })
        }
    },

    async signout(req , res , next){
        req.session = null;
        res.render('succ' , {
            data:JSON.stringify({
                msg:'用户登出成功',
            })
        })
    }


}