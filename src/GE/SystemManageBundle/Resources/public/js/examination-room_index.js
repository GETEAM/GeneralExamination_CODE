$(function() {
	//单击表格tr 选中一行
	multipleSelectTR($('.examination-rooms tbody tr'));
	/*** 单个删除 ***/
	// 对话框 初始化
	$( '.delete-dialog' ).dialog({ 
		closeOnEscape: true,//按下ESC后是否退出
		modal: true,//出现模态弹出框
		resized: false,
		autoOpen: false,
		buttons: {
			'确认': function() {
				var examinationroom_id = $(this).attr('examinationroom-id');
				//跳转到删除页面
				location.href = '/manage/examinationroom/delete/' + examinationroom_id;
			},
			'取消': function() {
				//此处的this为$( '.delete-dialog' )
				$(this).dialog('close');
			}
		}
	});
	// 点击删除按钮时，打开删除对话框
	$('.delete-btn').click(function(){
		
		var examinationroom_id = $(this).closest('a').attr('examinationroom-id');
		//对应的对话框id
		var dialog_id = '#examinationroom_' + examinationroom_id;
		//打开对话框
		$(dialog_id).dialog('open');
	});


	//index页面，鼠标悬浮在故障列表时显示表格
	$('.fault-machine-td').mouseover(function(){
		alert('列表');
	});
})