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
                // res.go('/position?_='+ new Date().getTime())
                loadshData(res.pageNo , res)
            }
        }
    })
}

function loadshData(pageNo , res){
    let start = pageNo * COUNT
    res.pageNo = pageNo
    $.ajax({
        url:'/api/position/list',
        data:{
            start,
            count:COUNT
        },
        success(result){
            if(result.ret){
                if(result.data.list.length === 0 && pageNo !== 0){
                    pageNo--
                    loadshData(pageNo,res)
                }
                res.render(positonView({
                    ...result.data,
                    showPage:true,
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
            console.log(111);
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
        $('#router-view').on('click' , '#prev' ,function(){
            let currentPage = $('#page li[class="active"]').attr('data-index')
            loadshData((~~currentPage - 1) , res)
        })
        $('#router-view').on('click' , '#next' ,function(){
            let currentPage = $('#page li[class="active"]').attr('data-index')
            console.log(currentPage)
            let index = ~~currentPage + 1
            if(index < ~~$(this).attr('data-pagecount')){
                loadshData(index , res)
            }
        })
        $('#router-view').on('click', "#pos-search" ,function(){
            let keywords = $("#keyword").val()
            $.ajax({
                url:'/api/position/search',
                type:'POST',
                data:{keywords},
                success(result){
                    if(result.ret){
                        res.render(positonView({
                            ...result.data,
                            showPage:false
                        }))
                       
                    }
                }
            })
        })

    },
    add(req , res){
        res.render(positonAddView())
        $('#posback').on('click' ,() => {
            res.back()
        })
        $('#possubmit').on('click' , () => {
            $('#possave').ajaxSubmit({
                url:'api/position/save',
                type:'POST',
                clearForm:true,
                success(result){
                    // console.log(result)
                    if(result.ret){
                        res.back()
                    }else{
                        // alert('数据添加失败')
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
                    $('#posedit').ajaxSubmit({
                        url:'api/position/patch',
                        type:'PATCH',
                        success(result){
                            if(result.ret){
                                res.back()
                            }else{
                                
                            }
                        }
                    })
                }
                )
            }
        })
    }
  
}