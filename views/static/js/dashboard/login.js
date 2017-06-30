define(["jquery","form","cookie"],function($){
	 $("#login-form").submit(function(){
	      $(this).ajaxSubmit({
	          url:"/api/login",
	          type:"post",
	          success:function(data){
	              if(data.code == 200){
	                //将当前后台数据的头像用户名放到cookie中，方便下个页面使用
	                $.cookie("userinfo",JSON.stringify(data.result),{path:"/"}); 
	                 //跳转到根目录（index页面）                             
	                  location.href = "/";
	              }
	          }
	      })
	       return false;
	 }) 
})