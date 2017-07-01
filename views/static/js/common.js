define(["jquery","template","cookie"],function($,template){
			$(function(){
				//若当前页面为登录页。则不渲染模板
				if("/dashboard/login" != location.pathname){ 

					 //判断用户有没有登录
					 if(!$.cookie("PHPSESSID")){
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

				 //退出功能的实现
				 $("#logout").click(function(){
	 					$.ajax({
	 						url:"/api/logout",
	 						type:"post",
	 						success:function(data){
	 								// console.log(data);
	 								if(data.code == 200){
	 									location.href = "dashboard/login"
	 								}
	 						}
 					 })
			 })  
			

			 

				
				
				//给导航栏上所有的li绑定单击事件，点击的时候让当前的背景遍暗
				 $(".navs>ul>li").click(function(){
				 	  $(this).children("a").addClass("active");
				 	  $(this).siblings().children("a").removeClass("active");
				 	  // return false;
				 	 })
				  //导航栏上的二级菜单的显示
				$(".navs>ul>li>ul").parent().click(function(){
					var $ul = $(this).children("ul")
						$ul.slideToggle();
						if($ul.find("a.active").length > 0){
							$(this).children("a").removeClass("active");
						}

				})

				
				//当页面跳转的时候，让当前页面对应的导航栏背景色变暗
				$(".navs a").each(function(i,v){
					 if($(v).attr("href") == location.pathname){
						 	$(v).addClass('active');
						 	$(v).parent().parent().slideDown();
					 		}
				})
   })
})