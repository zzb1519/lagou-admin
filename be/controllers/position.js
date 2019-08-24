
const posModel = require('../models/position')
const moment = require('moment')

module.exports = {
    
    async list(req , res , next){
        // let {start , count} = req.query
        let {list , total} = posModel.find(req.query)
        if(await list){
            res.render('succ' , {
                data:JSON.stringify({
                    list:await list,
                    total:await total
                })
            })
        }
    },
    async save(req , res , next){
        // let result = await posModel.save(req.body)
        let result = await posModel.save({
            ...req.body,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss') 
        })
        if(result){
            res.render('succ', {
                data: JSON.stringify({
                    msg: '数据添加成功',
                })
            })
        }else{
            res.render('fail', {
                data: JSON.stringify({
                    msg: '数据添加失败',
                })
            })
        }
    },
    async findone(req , res , next){
        let result = await posModel.findone(req.body.id)
        if(result){
            res.render('succ', {
                data: JSON.stringify(result)
            })
        }
    },
    async put(req , res , next){
        let result = await posModel.put({
            ...req.body,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss') 
        })
        if(result){
            res.render('succ', {
                data: JSON.stringify({
                    msg: '数据修改成功',
                })
            })
        }else{
            res.render('fail', {
                data: JSON.stringify({
                    msg: '数据修改失败',
                })
            })
        }
       

    },

    async delete(req , res , next){
        let result = await posModel.delete(req.body.id)
        if(result){
            res.render('succ', {
                data: JSON.stringify({
                    msg: '数据删除成功',
                })
            })
        }else{
            res.render('fail', {
                data: JSON.stringify({
                    msg: '数据删除失败',
                })
            })
        }
    }
}