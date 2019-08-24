import positonView from '../views/position.art'
import positonAddView from '../views/position-add.art'
import positionEditView from '../views/position-edit.art'
import _ from 'loadsh'

// console.log(positonView)
const COUNT = 5

function remove(id , res){
    $.ajax({
        url:'api/position/delete',
        type:'DELETE',
        data:{
            id
        },
        success(result){
            if(result.ret){
                res.go('/position?_='+ new Date().getTime())
            }
        }
    })
}

function loadshData(pageNo , res){
    let start = pageNo * COUNT
    $.ajax({
        url:'/api/position/list',
        data:{
            start,
            count:COUNT
        },
        success(result){
            if(result.ret){
                res.render(positonView({
                    ...result.data,
                    pageNo,
                    pageCount:_.range(Math.ceil(result.data.total/COUNT))
                }))
               
            }else{
                res.go('/home')
            }

        }
    })
}



export default {
    render(req , res , next){       
        // res.render(positonView(req))
        loadshData(0 , res)
        $('#router-view').off('click').on('click','#addbtn' , function(){
            res.go('/position_add')
            
        })
        $('#router-view').on('click' , '#btn-edit' ,function(){
            res.go('/position_edit' , {
                id:$(this).attr('data-id')
            })
        })
        $('#router-view').on('click' , '#btn-delete' ,function(){
            remove($(this).attr('data-id') ,res)
        })
        $('#router-view').on('click' , '#page li[data-index]' ,function(){
            loadshData($(this).attr('data-index') , res)
        })
    },
    add(req , res){
        res.render(positonAddView(req))
        $('#posback').on('click' ,() => {
            res.back()
        })
        $('#possubmit').on('click' , () => {
            let data  = $('#possave').serialize()
            $.ajax({
                url:'api/position/save',
                type:'POST',
                data,
                success(result){
                    if(result.ret){
                        res.back()
                    }else{
                        alert('数据添加失败')
                    }
                }
            })
        }
        )

    },
    edit(req , res){
        $.ajax({
            url:'/api/position/findone',
            type:'POST',
            data:{
                id:req.body.id
            },
            success(result){
                res.render(positionEditView(result.data))
                $('#posback').on('click' ,() => {
                    res.back()
                })

                $('#possubmit').on('click' , () => {
                    let data  = $('#possave').serialize()
                    $.ajax({
                        url:'api/position/put',
                        type:'PUT',
                        data: data + '&id=' + req.body.id,
                        success(result){
                            console.log(result);
                            if(result.ret){
                                res.back()
                            }else{
                                alert('数据修改失败')
                            }
                        }
                    })
                }
                )
            }
        })
    }
  
}