$(function() {
	/*** 批量删除 ***/
	// tr多选初始化：单击表格tr 选中一行
	multipleSelectTR($('.grades tbody tr'));

	/*** 单个删除 ***/
	// 对话框 初始化
	$( '.delete-dialog' ).dialog({ 
		closeOnEscape: true,//按下ESC后是否退出
		modal: true,//出现模态弹出框
		resized: false,
		autoOpen: false,
		buttons: {
			'确认': function() {
				$(this).dialog('close');
				$('.load-describe').text("正在删除,请稍等！");
				$('.wait-load').show();
				var grade_id = $(this).attr('grade-id');
				//跳转到删除页面
				location.href = '/manage/grade/delete/' + grade_id;
			},
			'取消': function() {
				//此处的this为$( '.delete-dialog' )
				$(this).dialog('close');
			}
		}
	});
	// 点击删除按钮时，打开删除对话框
	$('.delete-btn').click(function(){
		var grade_id = $(this).closest('a').attr('grade-id');
		//对应的对话框id
		var dialog_id = '#delete-dialog_' + grade_id;
		//打开对话框
		$(dialog_id).dialog('open');
	});
})