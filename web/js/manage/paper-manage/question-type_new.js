$(function(){
	/*★★★★★★★★★★注意：添加位置如何决定*/
	/*添加删除试题选项*/
	//点击添加试题选项时，添加试题选项
	$('.add-item-option').click(function() {
		var $item_options = $('.item-options');
		var $delete_img = $('<img>').attr({
			'width': 16,
			'height': 16,
			'alt': '删除试题选项',
			'title': '删除试题选项',
			'src': '/images/manage/delete-min.png'
		});
		var $delete_item_option = $('<a>').attr('href', 'javascript:void(0)').addClass('delete-item-option').append($delete_img);
		var $item_option_li = $('<li>').html('试题选项内容').append($delete_item_option);
		//如果已经存在试题选项，直接添加选项内容
		if($item_options.length > 0){
			$item_option_li.appendTo($('.item-options-list'));
		}else{
			//如果不存存在试题选项，添加框架
			var $item_options = $('<div>').addClass('item-options');
			$('<label>').html('试题选项').appendTo($item_options);

			var $item_options_list = $('<ul>').addClass('item-options-list');
			$item_option_li.appendTo($item_options_list);
			$item_options.append($item_options_list);
			$('.item').append($item_options);
		}

		//添加试题选项后，添加删除事件
		//点击删除试题选项时，删除试题选项 
		$('.delete-item-option').click(function(){
			$(this).deleteItemOption();
		});
	});

	//点击删除试题选项时，删除试题选项 
	$('.delete-item-option').click(function(){
		$(this).deleteItemOption();
	});

	/*添加、删除小题*/
	$('.add-single-choice').click(function(){
		var $item_questions = $('.item-questions');
		
		var $question = $('<div>').attr({
			'class': 'question',
			'question-type': 'SingleChoice'
		});
		var $question_stem = $('<div>')
					.html('此处为单选小题题干，题干内容可以包括图片、音频以及视频等多媒体。')
					.appendTo($question);
		var $question_options = $('<ul>').addClass('question-options');
		var $question_option = $('<li>').html('单选小题选项内容');
		var $delete_question_option = $('<a>')
				.attr('href', 'javascript:void(0)')
				.addClass('delete-question-option');
		var $delete_img = $('<img>').attr({
			'width': 16,
			'height': 16,
			'alt': '删除试题选项',
			'title': '删除试题选项',
			'src': '/images/manage/delete-min.png'
		}).appendTo($delete_question_option);
		$delete_question_option.appendTo($question_option);
		var $add_question_option = $('<a>')
				.attr('href', 'javascript:void(0)')
				.addClass('add-question-option');
		var $add_img = $('<img>').attr({
			'width': 16,
			'height': 16,
			'alt': '删除试题选项',
			'title': '删除试题选项',
			'src': '/images/manage/add-min.png'
		}).appendTo($add_question_option);
		$add_question_option.appendTo($question_option);
		//默认添加四个选项
		for(var i = 0; i < 4; i++){
			$question_option.clone().appendTo($question_options);
		}
		$question_options.appendTo($question);

		//如果已经存在试题选项，直接添加选项内容
		if($item_questions.length > 0){
			$question.appendTo($('.item-questions .questions'));
		}else{
			//如果不存存在试题选项，添加框架
			var $item_questions = $('<div>').addClass('item-questions');
			$('<label>').html('包含小题').appendTo($item_questions);

			var $item_questions_list = $('<ul>').addClass('item-options-list');
			$item_option_li.appendTo($item_questions_list);
			$item_questions.append($item_questions_list);
			$('.item').append($item_questions);
		}

		//添加试题选项后，添加删除事件
		//点击删除试题选项时，删除试题选项 
		$('.delete-item-option').click(function(){
			$(this).deleteItemOption();
		});
	});

});

//删除试题选项
$.fn.deleteItemOption = function (){
	var $item_options = $(this).closest('.item-options');
	var item_option_num = $item_options.find('li').length;
	//如果试题选项多于1个，则删除当前li
	if( item_option_num > 1 ){
		$(this).closest('li').remove();
	}else {
	//如果试题个数小于等于1，则删除整个列表
		$item_options.remove();
	}
};

//添加小题
$.fn.addQuestion = function() {
	var self = $(this)[0];
	var Add =  React.createClass({
		render: function() {
			return (
				<div className="add-question">
					<img src="/images/manage/add.png" width="20" height="20" alt="添加小題" title="添加小題" />
					<ul className="add-question-of-type">
						<li className="add-single-choice">单项选择题</li>
						<li>多项选择题</li>
						<li>填空题</li>
						<li>简答题</li>
						<li>录音题</li>
					</ul>
				</div>
			);
		}
	});
	ReactDOM.render(
		<Add />,
		self
	);
	// var $single_choice = 
};