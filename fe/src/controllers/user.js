import userView from '../views/user.art'

let _url = ''
// let _type = ''
export default {

    render(){
        let html = userView({
            isSign:true
        })
        $('.user-menu').html(html)
        this.bindEventToBtn()
    },
    bindEventToBtn(){
      $('.hidden-xs').on('click' , function(){
        //   if($(this).attr('id') === 'btn-signin'){
              _url = $(this).attr('id') === 'btn-signin' ? '/api/signin' : '/api/signup'
              console.log(_url);
          }
      )
      $('#btn-submit').on('click' , () => {
          console.log(1);
          let data = $('#user-form').serialize()
          console.log(data);
          $.ajax({
              url:_url,
              type:'POST',
              data,
              success(result){
                  console.log(result);
              }
          })
      })
    }
}