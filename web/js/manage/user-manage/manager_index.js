$(function() {	
	/*tr单选多选初始化*/
	trSelectInitial($('.managers tbody tr'), 'managers');

	/*** 单个删除 ***/
	singleDelete('manager');

	/*** 批量删除 ***/	
	//批量删除对话框初始化
	$( '.multi-delete-dialog' ).dialog({ 
		closeOnEscape: true,//按下ESC后是否退出
		modal: true,//出现模态弹出框
		resized: false,
		autoOpen: false,
		buttons: {
			'确认': function() {
				$(this).dialog('close');
				$('.loading-description').text("正在删除,请稍等……");
				$('.loading').show();
				
				var managers_ids = getSelectedTRs('managers');

				//post操作 用ajax实现
				$.ajax({
				    type: 'POST',
				    url: '/manage/manager/multi-delete',
				    data: {
				        ids: managers_ids
				    },
				    dataType: 'json',
				    async: true,
				    success: function (data) {
				        if (data.success) {
				            console.log("选中项删除成功！正在更新显示...", 2000, 'TIP');
				            window.location.reload(true);
				        } else {
				            console.log("选中项删除失败!");
				            window.location.reload(true);
				        }
				    },
				    error: function (XMLHttpRequest, textStatus, errorThrown) {
				        console.log("error " + textStatus);
				        console.log("网络或服务器异常！" + 'ERROR');
				    }
				});

			},
			'取消': function() {
				//此处的this为$( '.multi-delete-dialog' )
				$(this).dialog('close');
			}
		}
	});
	// 点击批量删除按钮时，打开删除对话框
	$('.btn-multi-delete').click(function(){
		var managers_ids = getSelectedTRs('managers');
		
		if(managers_ids.length > 0){
			//打开对话框
			$('.multi-delete-dialog').dialog('open');
		}else{
			//没有选中内容时，给予提示
			var $warning_message = $('<div>').html('没有可删除的选中项！').addClass('notice warning');
			$('.flash-message').append($warning_message);
		}
	});
	
})