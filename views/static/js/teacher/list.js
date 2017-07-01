define(["jquery","template","bootstrap"],function($,template){
		$.ajax({
			url:"/api/teacher",
			type:"get",
			success:function(data){
				if(data.code == 200);
				 // console.log(data);
				var str = template("teacher-list-tpl",data);
				$("#teacherlist").html(str);
			 }
		});

		// 利用委托事件,实现点击查看按钮功能
		$("#teacherlist").on("click",".check",function(){
				var tcid = $(this).parent().data("id");
				// console.log(tcid);
				$.ajax({
					url:"/api/teacher/view",
					type:"get",
					data:{
						tc_id:tcid
					},
					success:function(data){
						// console.log(data);
						if(data.code == 200){
						//将数据渲染到模态框找中
						var html = template("tc-check-tpl",data.result);
						$("#teacherModal").html(html);
						//显示模态框
						$("#teacherModal").modal("show");
						}
					}
				})
		});

		// 将注销和启用按钮注册点击事件
		$("#teacherlist").on("click",".onoff",function(){
				var tcid = $(this).parent().data("id");
				var status = $(this).data("status");
				var $that = $(this)
				
				$.ajax({
					url:"/api/teacher/handle",
					type:"post",
					data:{
						tc_id:tcid,
						tc_status:status
					},
					success:function(data){
						if(data.code == 200){
							console.log(data);
							$that.data("status",data.result.tc_status);
							//如果后台数据正常返回数据，页面上的按钮也要变化
							if(data.result.tc_status == 1){
									$that.removeClass("btn-warning");
									$that.addClass("btn-success");
									$that.text("启 用");
							}else{
								  $that.removeClass("btn-success");
									$that.addClass("btn-warning");
									$that.text("注 销");
							}
						}
					}
				})
		});
})