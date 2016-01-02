$(function(){
	//图片上传时，ajaxForm的option参数
	var upload_image_option = {  
        type:"post",  //提交方式  
        dataType:"json", //数据类型  
        success:function(data){ //提交成功的回调函数  
            alert(data.success);  
        }  
    };
    //图片上传表单异步提交初始化
	$('#upload-image-form').ajaxForm(upload_image_option);

	//图片上传表单的展示
	$( '.upload-image-dialog' ).dialog({ 
		width: 400,
		closeOnEscape: true,//按下ESC后是否退出
		modal: true,//出现模态弹出框
		resized: false,
		autoOpen: false,
		buttons: {
			'确认': function() {
				// console.log($('.upload-image-form', $(this)));  
				$('#upload-image-form').submit();
			},
			'取消': function() {
				//此处的this为$( '.delete-dialog' )
				$(this).dialog('close');
			}
		}
	});
	// 点击删除按钮时，打开删除对话框
	$('.upload-image').click(function(){
		//打开对话框
		$( '.upload-image-dialog' ).dialog('open');
	});
});