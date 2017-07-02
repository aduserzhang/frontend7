define(["jquery","template","util","form","datepicker","datepicker.zh","validate"],function($,template,util){
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
							// 时间日历插件
							$("input[name=tc_join_date]").datepicker({
									format:"yyyy-mm-dd",
									language:"zh-CN"
							});	
							//表单验证插件
							$("#teacherform").validate({
								//为当前表单项提供验证信息
								description:{
									"tcname":{
										required:"请输入用户名!",
									},
									"tcpass":{
										required:"请输入密码!"
									},
									"tcjoindata":{
										required:"请输入入职时间"
									}
								},
								onBlur:true,
								onKeyup:true,
								// 当前表单元素验证通过后，是否自动提交表单 默认是true
								sendForm:false,
								// 当前表单元素没有通过校验 调用
								eachInvalidField:function(){
									// 当前元素校验没有通过，设置错误的提示
									this.parent().parent().addClass("has-error").removeClass("has-success");
									this.parent().next().removeClass("hide");
								},
								// 当前元素通过验证，调用
								eachValidField:function(){
									// 设置校验通过样式
									this.parent().parent().addClass("has-success").removeClass("has-error");
								},
								// 当表单内所有的元素都验证通过，调用
								valid:function(){
									console.log("验证通过了");
									// 验证通过，提交表单
									 	var type = $("#btnSave").data("type");
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
									  		console.log(456);
									  		if(data.code == 200){
									  			console.log(data);
									  			location.href = "/teacher/list";
									  		}
									  	}
									  })
								}
				      });			
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
				// 时间日历插件
				$("input[name=tc_join_date]").datepicker({
						format:"yyyy-mm-dd",
						language:"zh-CN"
				});
				// 表单验证插件
				$("#teacherform").validate({
					//为当前表单项提供验证信息
					description:{
						"tcname":{
							required:"请输入用户名!",
						},
						"tcpass":{
							required:"请输入密码!"
						},
						"tcjoindata":{
							required:"请输入入职时间"
						}
					},
					onBlur:true,
					onKeyup:true,
					// 当前表单元素验证通过后，是否自动提交表单 默认是true
					sendForm:false,
					// 当前表单元素没有通过校验 调用
					eachInvalidField:function(){
						// 当前元素校验没有通过，设置错误的提示
						this.parent().parent().addClass("has-error").removeClass("has-success");
						this.parent().next().removeClass("hide");
					},
					// 当前元素通过验证，调用
					eachValidField:function(){
						// 设置校验通过样式
						this.parent().parent().addClass("has-success").removeClass("has-error");
					},
					// 当表单内所有的元素都验证通过，调用
					valid:function(){
						console.log("验证通过了");
						// 验证通过，提交表单
						 	var type = $("#btnSave").data("type");
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
						  		console.log(456);
						  		if(data.code == 200){
						  			console.log(data);
						  			location.href = "/teacher/list";
						  		}
						  	}
						  })
					}
				});
			}

			// 给保存按钮添加事件
			// $(".teacher").on("click","#btnSave",function(){
				 
			// 	  return false;
			// })
			 
		});
})