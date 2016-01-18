$(function(){
	//修改流程性选项时，修改item
	$('[name="papermanage_question_type_edit[flowable]"]').change(function(){
		var flowable = $(this)[0].checked ? true : false;
		item.flowable = flowable;

		//改变item_structure输入框的值
		$item_structure.val(JSON.stringify(item));
	});

	//修改选项乱序时，修改item
	$('[name="papermanage_question_type_edit[shuffle]"]').change(function(){
		var shuffle = $(this)[0].checked ? true : false;
		item.shuffle = shuffle;

		//改变item_structure输入框的值
		$item_structure.val(JSON.stringify(item));
	});

	$.ajax({
	    type: 'GET',
	    url: '/manage/question_type/QTJSON/' + question_type_id,
	    dataType: 'json',
	    async: true,
	    success: function (data) {
	    	item = JSON.parse(data.item);

	    	// 显示Item
	    	ReactDOM.render(
	    		React.createElement(Item, null),
	    		$('#item-area')[0]
	    	);
	    },
	    error: function (XMLHttpRequest, textStatus, errorThrown) {
	    	//网络或服务器异常！无法获取题型结构相关！给予提示
	    	var $warning_message = $('<div>').html('网络或服务器异常！无法获取题型结构相关！').addClass('notice error');
	    	$('.flash-message').append($warning_message);
	    	
	        console.log("error " + textStatus);
	        console.log("网络或服务器异常！" + 'ERROR');
	    }
	});
});
