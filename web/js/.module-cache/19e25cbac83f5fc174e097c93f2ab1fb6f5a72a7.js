$(function(){
	
	//点击完成添加时，提交表单
	$('.complete-add').click(function() {
		$('.form-add button').click();
	});

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

	/*添加删除题干*/
	$('.add-item-stem').click(handleAddItemStem);

	/*添加删除试题选项*/
	//点击添加试题选项时，添加试题选项
	$('.add-item-option').click(handleAddItemOption);

	/*添加单选小题*/
	$('.add-single-choice').click(function(){
		//设置小题数量是否限制默认值
		item['questions-num-limit'] = true;
		//设置小题是否提前显示默认值
		item['pre-show'] = true;

		var item_options = item.options;
		var showOptionsOrderNum = item['show-options-order-num'] === false ? false : true;
		var new_question1 = {
			"type": "SingleChoice",			
			"stem": "此处为单选小题题干，题干内容可以包括图片、音频以及视频等多媒体。",
			"options": [		//question的各个选项
				"单选小题选项内容",
				"单选小题选项内容",
				"单选小题选项内容",
				"单选小题选项内容"
			]
		};
		var new_question2 = {
			"type": "SingleChoice"
		};

		var new_question = ( item_options && item_options.length > 0 && showOptionsOrderNum ) ? new_question2 : new_question1;

		//如果item中不存在questions，设为空数组
		item.questions = item.questions ? item.questions : [];
		item.questions.push(new_question);

		//关闭所有添加区域title 显示对应添加区域
		$('.title').each(function(){
			$(this).addClass('close').next().hide();
		});
		$('.item-questions .title').removeClass('close').next().show();

		//改变item_structure输入框的值
		$item_structure.val(JSON.stringify(item));

		//重新渲染Item
		ReactDOM.render(
			React.createElement(Item, null),
			$('#item-area')[0]
		);
	});



	// 显示Item
	ReactDOM.render(
		React.createElement(Item, null),
		$('#item-area')[0]
	);

});
