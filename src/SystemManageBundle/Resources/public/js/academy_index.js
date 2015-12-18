$(function() {
	//单击表格tr 选中一行
	multipleSelectTR($('.academies tbody tr'));

	$('.delete-dialog').dialog({
		closeOnEscape: true,//按下ESC后是否退出
		modal: true,//出现模态弹出框
		resized: false,
		autoOpen: false,
		buttons: {
			'确认': function() {
				$(this).dialog('close');
				$('.load-describe').text("正在删除,请稍等！");
				$('.wait-load').show();
				var academy_id = $(this).attr('academy-id');
				//跳转到删除页面
				location.href = '/manage/academy/delete/' + academy_id;
			},
			'取消': function() {
				//此处的this为$( '.delete-dialog' )
				$(this).dialog('close');
			}
		}
	})

	$('.delete-btn').click(function(){
		var academy_id=$(this).closest('a').attr('academy-id');
		var dialog_id="#academy_" + academy_id;
		$(dialog_id).dialog("open");
	})
})