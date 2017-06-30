define(["jquery","template","cookie"],function($,template){
			$(function(){
				//若当前页面为登录页。则不渲染模板
				if("/dashboard/login" != location.pathname){ 

					 //判断用户有没有登录
					 if($.cookie("PHPSESSID")){
					 	//没有登录回到登录页
					 	 location.href = "/dashboard/login"
					 }else{
					 	//登录了就渲染模板
					 	//获取到cookie中存放的数据（头像和登录名）
					  var userinfo = JSON.parse($.cookie("userinfo"));
					 	var str = template("profile-tpl",userinfo);
					 	$("#userinfo").html(str);
					 }
	 				
				 }
			})  
})