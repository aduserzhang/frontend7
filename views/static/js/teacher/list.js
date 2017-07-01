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
						console.log(data);
						if(data.code == 200){
						//将数据渲染到模态框找中
						var html = template("tc-check-tpl",data.result);
						$("#teacherModal").html(html);
						//显示模态框
						$("#teacherModal").modal("show");
						}
					}
				})
		})
})