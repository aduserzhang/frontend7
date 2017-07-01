define(["jquery","template","util","form"],function($,template,util){
		$(function(){

			//用地址栏上的ID来区别当前是进行编辑讲师信息还是添加讲师信息
			//所有要判断地址上上有ID就是编辑，没有就是添加
			//获取地址栏上的ID
			var query = util.getQueryObj();
			//若获取到ID 则为编辑信息
			if(query.id){
				//发送ajax请求，获取后台编辑信息，渲染到模板
				$.ajax({
					url:"/api/teacher/edit",
					type:"post",
					data:{tc_id:query.id},
					success:function(data){
						if(data.code == 200){
							// 这是编辑页面 所有要将标题设为 讲师编辑 文字按钮设为保存
							data.result.title = "讲师编辑";
							data.result.btnText = "保 存";
							// 将保存的类型设为 type = "edit"
							data.result.type = "edit";

							var strTpl = template("operate-tpl",data.result);
							$(".teacher").html(strTpl);						
						}
					}
				})

				// 没有获取到ID 则是添加信息
			}else{
				//  渲染到模板
				var html = template("operate-tpl",{
					title:"讲师添加",
					btnText:"添加",
					type:"add"
				});
				$(".teacher").html(html);
			}

			// 给保存按钮添加事件
			$(".teacher").on("click","#btnSave",function(){
				  var type = $(this).data("type");
				  var url = "";
				  // 通过获取按钮的类型 判断提交是编辑 还是 保存 接口
				  if(type == "edit"){
				  	url = "/api/teacher/update";
				  }else{
				  	url = "/api/teacher/add";

				  }
				  //使用jQuery.form插件将表单进行一步提交
				  $("#teacherform").ajaxSubmit({
				  	url:url,
				  	type:"post",
				  	success:function(data){
				  		if(data.code == 200){
				  			location.href = "/teacher/list";
				  		}
				  	}
				  })
				  return false;
			})
			 
		});
})