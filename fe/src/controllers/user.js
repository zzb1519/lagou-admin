import userView from '../views/user.art'

let _url = ''
let _type = ''
export default {

    async render(){
        let result = await this.isSignin()

        let html = userView({
            isSignin:result.ret,
            username:result.data.username
        })
        $('.user-menu').html(html)
        this.bindEventToBtn()
    },

    isSignin(){
        return $.ajax({
            url:'/api/users/isSignin',
            dataType:'json',
            success(result){
                return result
            }
        })
    },

    bindEventToBtn(){
      $('#user-menu').on('click' ,'.hidden-xs' ,function(){
        //   if($(this).attr('id') === 'btn-signin'){
            console.log(this)
              _type = $(this).attr('id')
              _url = _type ===  'btn-signin' ? '/api/users/signin' : '/api/users/signup'
              $('input').val('')
          }
      )
      $('#user-menu').on('click' ,'#btn-submit' ,() => {
          let data = $('#user-form').serialize()  //接受form表单的数据。。
          console.log(data);
          $.ajax({
              url:_url,
              type:'POST',
              data,
              success(result){
                  console.log(result);
                if(_type === 'btn-signin'){
                    if(result.ret){
                        //登录成功
                        let html = userView({
                            isSignin:true,
                            username:result.data.username
                        })
                        $('.user-menu').html(html)
                    }else{
                        alert(result.data.msg)
                    }
                }else{
                    if(result.ret){
                        //登录成功
                        alert('注册成功.')
                    }else{
                        alert(result.data.msg)
                    }
                }

              }
          })
      })

      $('#user-menu').on('click' ,'#btn-signout', () => {
        $.ajax({
            url:'/api/users/signout',
            success(result){
                
                if (_type === 'btn-signup') {
                    alert(result.data.msg)
                  } else if (_type === 'btn-signin') {
                    if (result.ret) {
                      let html = userView({
                        isSignin: true,
                        username: result.data.username
                      })
                  
                      $('#user-menu').html(html)
                    } else {
                      alert(result.data.msg)
                    }
                  } else {
                    location.reload() 
                }
            }
        })
      })
    }
}