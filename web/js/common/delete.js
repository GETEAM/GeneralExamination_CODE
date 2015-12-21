//这是单个删除的方法，写到公用里面可以让任何删除都可以调用
function singleDelete(name){
	$( '.delete-dialog' ).dialog({ 
		closeOnEscape: true,//按下ESC后是否退出
		modal: true,//出现模态弹出框
		resized: false,
		autoOpen: false,
		buttons: {
			'确认': function() {
				$(this).dialog('close');
				$('.loading-description').text("正在删除,请稍等……");
				$('.loading').show();
				var delete_id = $(this).attr(name +'-id');
				//跳转到删除页面
				location.href = '/manage/' + name +'/delete/' + delete_id;
			},
			'取消': function() {
				//此处的this为$( '.delete-dialog' )
				$(this).dialog('close');
			}
		}
	});
	// 点击删除按钮时，打开删除对话框
	$('.delete-btn').click(function(){
		var name_id = $(this).closest('a').attr(name + '-id');
		//对应的对话框id
		var dialog_id = '#'+ name +'_delete_dialog_' + name_id;
		//打开对话框
		$(dialog_id).dialog('open');
	});
}