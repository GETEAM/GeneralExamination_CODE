$(function(){
	//初始化的时候不打开
	$( ".delete-dialog" ).dialog({ autoOpen: false });
	//调用的时候打开
	$(".delete_btn").click(function(){
		$( ".delete-dialog" ).dialog("open");
	});
	$( ".delete-dialog" ).dialog({
	  dialogClass: "no-close",
	  closeOnEscape: false,//按下ESC后是否退出
	  modal: true,//出现模态弹出框
	  resized: false,
	});
	$('.close').click(function(){
		$(".delete-dialog").dialog("close");
	})
});