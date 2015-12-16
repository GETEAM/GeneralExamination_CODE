$(function() {
	/*** 批量删除 ***/
	// 单击表格tr 选中一行
	multipleSelectTR($('.grades tbody tr'));


	/*** 单个删除 ***/
	// 对话框 初始化
	$( '.delete-dialog' ).dialog({ 
		closeOnEscape: false,//按下ESC后是否退出
		modal: true,//出现模态弹出框
		resized: false,
		autoOpen: false,
		buttons: {
			'取消': function() {
				//此处的this为$( '.delete-dialog' )
				$(this).dialog('close');
			},
			'确认': function() {
				var grade_id = $(this).attr('grade-id');
				//跳转到删除页面
				location.href = '/manage/grade/delete/' + grade_id;
			}
		}
	});
	// 点击删除按钮时，打开删除对话框
	$('.delete-btn').click(function(){
		var grade_id = $(this).closest('a').attr('grade-id');
		//对应的对话框id
		var dialog_id = '#grade_' + grade_id;
		//打开对话框
		$(dialog_id).dialog('open');
	});

})