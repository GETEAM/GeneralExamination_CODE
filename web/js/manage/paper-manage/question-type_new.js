$(function(){
	// /*★★★★★★★★★★注意：添加位置如何决定*/
	// /*添加删除试题选项*/
	// //点击添加试题选项时，添加试题选项
	// $('.add-item-option').click(function() {
	// 	//添加试题选项
	// 	$(this).addItemOption();
	// });

	// /*添加、删除小题*/
	// $('.add-single-choice').click(function(){
	// 	//添加小题
	// 	$(this).addQuestion();
	// });
	
	var deepCopy= function(source) { 
		var result={};
		for (var key in source) {
	     	result[key] = typeof source[key]==='object' ? deepCopy(source[key]): source[key];
	   	} 
	   	return result; 
	}

	var item = {	
		"stem": "此处为试题题干内容，题干中可以包括图片、音频以及视频等多媒体。",
		"length": 300,
		"showLength": true, 
		"options": [ 		
			"试题选项内容",			
			"试题选项内容",	
			"试题选项内容",	
			"试题选项内容",	
			"试题选项内容",	
			"试题选项内容",	
			"试题选项内容"
		],
		"shuffle": true,
		"preShow": true,
		"questions": [			
			{
				"type": "SingleChoice",	
				"pause": 20, //此处单位为秒
				"shuffle": true, //只有当type为多选或者单选时，该选项才有效			
				"stem": "此处为单选小题题干，题干内容可以包括图片、音频以及视频等多媒体。",
				"options": [		//question的各个选项
					"单选小题选项内容",
					"单选小题选项内容",
					"单选小题选项内容",
					"单选小题选项内容"
				],
				"strict": true,	//正确答案是否要与参考答案完全匹配
				"reference-answer": "参考答案",		
				"answer-analysis": "参考答案解析"
			},
			{
				"type": "SingleChoice",	
				"pause": 20, //此处单位为秒
				"shuffle": true, //只有当type为多选或者单选时，该选项才有效			
				"stem": "此处为单选小题题干，题干内容可以包括图片、音频以及视频等多媒体。",
				"options": [		//question的各个选项
					"单选小题选项内容",
					"单选小题选项内容",
					"单选小题选项内容",
					"单选小题选项内容"
				],
				"strict": true,	//正确答案是否要与参考答案完全匹配
				"reference-answer": "参考答案",		
				"answer-analysis": "参考答案解析"
			}
		]
	};

	//试题Item
	var Item = React.createClass({
		getInitialState: function(){
			return {
				item: item
			}
		},
		handleChangeState: function() {
			this.setState({
				item: item
			});
		},
		render: function() {
			var item = this.state.item;

			var options = item.options;

			//如果item选项存在，则插入ItemOptions
			var item_options = options ?　<ItemOptions options={options} changeItemState={this.handleChangeState} /> : '';

			//如果存在questions，则插入Question
			var questions = item.questions ? <Questions questions={item.questions} itemOptions={options} changeItemState={this.handleChangeState}/> : '';
			
			return (
				<div className="item">
					<ItemStem stem={item.stem}/>
					{item_options}
					{questions}
				</div>
			);
		}
	});

	//试题item题干
	var ItemStem = React.createClass({
		render: function() {
			return (
				<div className="item-stem">
					<label>题干</label>
					<div className="item-stem-content">
						{this.props.stem}
					</div>
				</div>
			);
		}
	});

	// 试题item的options
	var ItemOptions = React.createClass({
		deleteItemOption: function() {
			//移除试题选项中的一个
			item.options.pop();
			//改变item state
			this.props.changeItemState();
		},
		render: function() {
			var self = this;
			var options = this.props.options;
			return (
				<div className="item-options">
	    			<label>试题选项</label>
	    			<ul className="item-options-list">
    				{
    					options.map(function(option) {
    						return (
    							<li>
    								<span>{option}</span>
    								<a href="javascript:void(0)" className="delete-item-option" onClick={self.deleteItemOption}>
    									<img src="/images/manage/delete-min.png" width="16" height="16" alt="删除试题选项" title="删除试题选项" />
    								</a>
    							</li>
    						);
    					})
    				}
	    			</ul>
	    		</div>
			)
		}
	});

	//试题item内的questions
	var Questions = React.createClass({
		render: function() {
			var self = this;
			var item_options = this.props.itemOptions;
			var questions = this.props.questions;

			return (
				<div className="item-questions">
					<label>包含小题</label>
					<div className="questions">
					{
						 questions.map(function( question, i, questions ){
							return (
								<Question question={question} itemOptions={item_options} order={i} changeItemState={self.props.changeItemState} />
							);
						})
					}
					</div>
				</div>
			);
		}
	});
	
	//试题item中包含的小题Question
	var Question = React.createClass({
		addQuestionFromCurrent: function() {
			var question = this.props.question;
			var order = this.props.order;
			//复制当前小题为新小题
			var new_question = deepCopy(question);
			//插入item
			item.questions.splice(order, 0, new_question);

			//改变item state
			this.props.changeItemState();
		},
		deleteQuestion: function() {
			var order = this.props.order;
			//插入item
			item.questions.splice(order, 1);

			//改变item state
			this.props.changeItemState();
		},
		render: function() {
			var self = this;
			var item_options = this.props.itemOptions;
			var question = this.props.question;
			var order = this.props.order;
			var type = question.type;

			var question_stem = question.stem ? 
				<div className="question-stem">
					<span>{question.stem}</span>
					<a href="javascript:void(0)" className="delete-question-a" onClick={this.deleteQuestion}>
						<img src="/images/manage/delete-min.png" width="16" height="16" alt="删除小题" title="删除小题" />
					</a>
					<a href="javascript:void(0)" className="add-question-a" onClick={this.addQuestionFromCurrent}>
						<img src="/images/manage/add-min.png" width="16" height="16" alt="添加小题" title="添加小题" />
					</a>
				</div> 
				: '';

			//小题做答区域
			var answer_area;

			//当item_options存在时，小题默认为单选题
			// if(item_options) {
			// 	//展示选项时，是否展示选项内容
			// 	var showOption = false;
			// 	answer_area = <SingleChoice options={item_options} questionId={id} showOption={showOption} />
			// }else {
			//当item_options不存在时，判断小题类型，再做相应处理
				if(type == "SingleChoice") {
					answer_area = <SingleChoice options={question.options} questionOrder={order} changeItemState={self.props.changeItemState} />
				}
				// else if(type == "SimpleAnswer") {
				// 	answer_area = <SimpleAnswer questionId={id} />
				// }else if(type == "BlankFilling") {
				// 	answer_area = <BlankFilling questionId={id} />
				// }
			// }

			return (
				<div className="question">
					<div className="question-content">
						{question.stem}
						{answer_area}
					</div>
				</div>
			);
		}
	});

	//小题Question中的答题区域部分————单选题
	var SingleChoice = React.createClass({
		deleteQuestionOption: function() {
			var question_order = this.props.questionOrder;
			//删除当前小题的一个选项
			item.questions[question_order].options.pop();

			//改变item state
			this.props.changeItemState();
		},
		addQuestionOption: function() {
			var question_order = this.props.questionOrder;

			//添加一个新的选项
			var new_question_option = item.questions[question_order].options[0];
			item.questions[question_order].options.push(new_question_option);

			//改变item state
			this.props.changeItemState();
		},
		render: function() {
			var self = this;
			var options = this.props.options;

			return (
				<ul className="question-options">
				{
					options.map(function(option, i, a) {
						return (
							<li>
								<span>{option}</span>
								<a href="javascript:void(0)" className="delete-question-option" onClick={self.deleteQuestionOption}>
									<img src="/images/manage/delete-min.png" width="16" height="16" alt="删除小题选项" title="删除小题选项" />
								</a>
								<a href="javascript:void(0)" className="add-question-option" onClick={self.addQuestionOption}>
									<img src="/images/manage/add-min.png" width="16" height="16" alt="添加小题选项" title="添加小题选项" />
								</a>
							</li>
						)
					})
				}
				</ul>
			)
		}
	});

	// 显示Item
	ReactDOM.render(
		<Item />,
		$('#item-area')[0]
	);

});

//添加试题选项
$.fn.addItemOption = function() {
	var $item_options = $('.item-options');
	var $delete_img = $('<img>').attr({
		'width': 16,
		'height': 16,
		'alt': '删除试题选项',
		'title': '删除试题选项',
		'src': '/images/manage/delete-min.png'
	});
	var $delete_item_option = $('<a>').attr('href', 'javascript:void(0)').addClass('delete-item-option').append($delete_img);	

	//添加试题选项后，添加删除事件
	//点击删除试题选项时，删除试题选项 
	$delete_item_option.click(function(){
		$(this).deleteItemOption();
	});

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
		// $('.item').append($item_options);
		$item_options.insertAfter($('.item-stem'));
	}

};

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
	//判断小题是否存在
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
	var $delete_question = $('<a>')
			.attr('href', 'javascript:void(0)')
			.addClass('delete-question-a');

	var $delete_img = $('<img>').attr({
		'width': 16,
		'height': 16,
		'alt': '删除试题选项',
		'title': '删除试题选项',
		'src': '/images/manage/delete-min.png'
	});
	$delete_img.clone(true).appendTo($delete_question_option);
	$delete_img.clone(true).attr({'alt': '删除小题', 'title': '删除小题'}).
	appendTo($delete_question);

	$delete_question_option.appendTo($question_option);
	$delete_question.appendTo($question_stem);

	var $add_question_option = $('<a>')
			.attr('href', 'javascript:void(0)')
			.addClass('add-question-option');
	var $add_question = $('<a>')
			.attr('href', 'javascript:void(0)')
			.addClass('add-question-a');

	var $add_img = $('<img>').attr({
		'width': 16,
		'height': 16,
		'alt': '删除试题选项',
		'title': '删除试题选项',
		'src': '/images/manage/add-min.png'
	});
	$add_img.clone(true).appendTo($add_question_option);
	$add_img.clone(true).attr({'alt': '以该题为模板添加小题', 'title': '以该题为模板添加小题'})
		.appendTo($add_question);

	$add_question_option.appendTo($question_option);
	$add_question.appendTo($question_stem);

	/*小题选项，注册删除、添加事件.*/
	//点击删除小题选项时，删除小题选项 
	$delete_question_option.click(function(){
		$(this).deleteQuestionOption();
	});

	//点击添加小题选项时，添加小题选项 
	$add_question_option.click(function(){
		$(this).addQuestionOption();
	});

	/*小题，注册删除、添加事件.*/
	//点击删除小题时，删除小题 
	$delete_question.click(function(){
		$(this).deleteQuestion();
	});
	
	//点击以当前模板添加小题时，添加小题 
	$add_question.click(function(){
		$(this).addQuestionFromCurrent();
	});

	//默认添加四个选项
	for(var i = 0; i < 4; i++){
		$question_option.clone(true).appendTo($question_options);
	}
	$question_options.appendTo($question);

	//如果已经存在小题，直接添加小题
	if($item_questions.length > 0){
		$question.appendTo($('.item-questions .questions'));
	}else{
		//如果不存存在小题，添加框架
		var $item_questions = $('<div>').addClass('item-questions');
		$('<label>').html('包含小题').appendTo($item_questions);
		var $questions = $('<div>').addClass('questions');
		$questions.append($question).appendTo($item_questions);
		$('.item').append($item_questions);
	}
};

//以当前小题为模板添加小题
$.fn.addQuestionFromCurrent = function() {
	var $new_question = $(this).closest('.question').clone(true);
	//在当前小题后添加新题
	$new_question.insertAfter($(this).closest('.question'));
};

//删除小题
$.fn.deleteQuestion = function() {
	var $item_questions = $(this).closest('.item-questions');
	var question_num = $item_questions.find('.question').length;
	//如果试题多于1个，则删除当前试题
	if( question_num > 1 ){
		$(this).closest('.question').remove();
	}else {
	//如果试题个数小于等于1，则删除试题
		$item_questions.remove();
	}
};

/*单选小题*/
//删除小题选项
$.fn.deleteQuestionOption = function() {
	$(this).closest('li').remove();
};

//添加小题选项
$.fn.addQuestionOption = function() {
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

	/*添加小题选项后，注册删除、添加事件.*/
	//点击删除小题选项时，删除小题选项 
	$delete_question_option.click(function(){
		$(this).deleteQuestionOption();
	});

	/****注意添加删除的多次绑定 每次绑定在当前的即可****/
	//点击添加小题选项时，添加小题选项 
	$add_question_option.click(function(){
		$(this).addQuestionOption();
	});

	//向最近的小题选项中添加小题选项
	$question_option.appendTo($(this).closest('.question-options'));
}