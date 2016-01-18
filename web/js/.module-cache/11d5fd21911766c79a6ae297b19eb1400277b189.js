$(function(){
	

	//修改流程性选项时，修改item
	$('[name="papermanage_question_type_new[flowable]"]').change(function(){
		var flowable = $(this)[0].checked ? true : false;
		item.flowable = flowable;

		//改变item_structure输入框的值
		$item_structure.val(JSON.stringify(item));
	});

	//修改选项乱序时，修改item
	$('[name="papermanage_question_type_new[shuffle]"]').change(function(){
		var shuffle = $(this)[0].checked ? true : false;
		item.shuffle = shuffle;

		//改变item_structure输入框的值
		$item_structure.val(JSON.stringify(item));
	});

	// 显示Item
	ReactDOM.render(
		React.createElement(Item, null),
		$('#item-area')[0]
	);

});
