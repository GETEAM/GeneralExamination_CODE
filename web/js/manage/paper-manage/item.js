//初始化item
var item= {
	'questions-num-limit': true,
	'pre-show': true
};

//结构区域赋初始值
var $item_structure = $('.item-structure textarea');
$item_structure.val(JSON.stringify(item));

//试题Item
var Item = React.createClass({displayName: "Item",
	getInitialState: function(){
		return {
			item: item
		}
	},
	/*判断item中是否存在单选类型的试题*/
	hasSingleChoiceQuestion: function() {
		var questions = this.state.item.questions;
		if( questions && questions.length != 0 ){
			for(var i = 0, len = questions.length; i < len; i++){
				if(questions[i]['type'] == "SingleChoice"){
					return true;
				}
			}
		}
		return false;
	},
	/*控制item外部的DOM，添加题型的各步骤的操作*/
	handleOutDOM: function() {
		//控制添加题干功能
		var hasStem = this.state.item.stem ? true : false;
		if(hasStem){
			//修改title之前 要先移出鼠标
			$('.add-item-stem').mouseout().unbind().removeClass('active').attr({
				'title': "已存在题干，无法进行此操作",
			});
		}else{
			//修改title之前 要先移出鼠标
			$('.add-item-stem').mouseout().addClass('active').click(handleAddItemStem).attr('title', "点击添加题干");
		}

		//控制item的添加试题选项功能
		var hasSingleChoiceQuestion = this.hasSingleChoiceQuestion();
		var hasOptions = ( this.state.item.options && this.state.item.options.length != 0 ) ? true : false;
		if(hasOptions){
			$('.add-item-option').mouseout().unbind().removeClass('active').attr({
				'title': "已存在试题选项，无法进行此操作",
			});
		}else{
			if(hasSingleChoiceQuestion){
				$('.add-item-option').mouseout().unbind().removeClass('active').attr({
					'title': "已存在单选小题，无法进行此操作",
				});
			}else{
				$('.add-item-option').mouseout().addClass('active').click(handleAddItemOption).attr({
					'title': "点击添加试题选项"
				});					
			}
		}

		var hasQuestions = ( this.state.item.questions && this.state.item.questions.length != 0 ) ? true : false;
		if(!hasQuestions){
			$('.complete-btn').addClass('disabled').unbind().attr('title', '不存在小题，无法完成');				
		}else{
			$('.complete-btn').removeClass('disabled').removeAttr('title').click(function() {
				$('.form-add button').click();
			});
		}

		//点击各区域标题，显示/隐藏相应内容.且判断点击的不是a链接或者a链接中的图片
		$('.title').unbind().click(function(event) {
			if(event.target.tagName != 'A' && event.target.tagName != 'IMG'){
				$(this).toggleClass('close').next().toggle();					
			}
		});
	},
	componentDidMount: function() {
		this.handleOutDOM();
	},
	componentDidUpdate: function() {
		this.handleOutDOM();			
	},
	handleChangeState: function() {
		this.setState({
			item: item
		});
		$item_structure.val(JSON.stringify(item));
	},
	render: function() {
		var item = this.state.item;

		var options = item.options;

		//该值默认为true
		var showOptionsOrderNum = item['show-options-order-num'] === false ? false : true;

		//该值默认为true
		var questionsNumLimit = item['questions-num-limit'] === false ? false : true;

		//该值默认为true
		var preShow = item['pre-show'] === false ? false : true;

		//该值根据item自动确认。默认为true (当item中不存在该参数，且试题选项存在时，该参数默认为false,不显示小题选项内容)
		var showQuestionsOptionsContent = ( options && options.length > 0 && showOptionsOrderNum ) ? false : true; 

		var hasSingleChoiceQuestion = this.hasSingleChoiceQuestion();

		//如果item题干存在，则插入ItemStem
		var item_stem = item.stem 
						?　React.createElement(ItemStem, {
							stem: item.stem, 
							showStemLength: item['show-stem-length'], 
							changeItemState: this.handleChangeState}) 
						: '';

		//如果item选项存在，则插入ItemOptions
		var item_options = (options && options.length != 0) 
							? React.createElement(ItemOptions, {
								options: options, 
								hasSingleChoiceQuestion: hasSingleChoiceQuestion, 
								showOptionsOrderNum: showOptionsOrderNum, 
								changeItemState: this.handleChangeState}) 
							: '';

		//如果存在questions，则插入Question
		var questions = (item.questions && item.questions.length != 0) 
					? React.createElement(Questions, {
						questionsNumLimit: questionsNumLimit, 
						preShow: preShow, 
						itemOptions: options, 
						showQuestionsOptionsContent: showQuestionsOptionsContent, 
						questions: item.questions, 
						changeItemState: this.handleChangeState}) 
					: '';
		
		return (
			React.createElement("div", {className: "item"}, 
				item_stem, 
				item_options, 
				questions
			)
		);
	}
});

//试题item题干
var ItemStem = React.createClass({displayName: "ItemStem",
	handleShowStemLengthChange: function(event) {
		var showStemLength = event.target.checked;
		//改变item的show-stem-length
		item['show-stem-length'] = showStemLength;
		//改变item state
		this.props.changeItemState();
	},
	deleteItemStem: function(event) {
		//此处手动移出鼠标，否则tooltips不会消失
		$(event.target).mouseout();
		//删除item的stem相关属性
		delete item.stem;
		delete item['show-stem-length'];
		//改变item state
		this.props.changeItemState();
	},
	render: function() {
		var showStemLength = this.props.showStemLength ? true : false;
		var stem = this.props.stem;

		return (
			React.createElement("div", {className: "item-stem"}, 
				React.createElement("div", {className: "title", title: "点击显示/隐藏该区域"}, 
					"试题题干", 
					React.createElement("div", {className: "title-oprations"}, 
					    React.createElement("a", {href: "javascript:void(0)", onClick: this.deleteItemStem, title: "删除试题题干"}, 
					        React.createElement("img", {src: "/images/manage/delete-min.png", width: "16", height: "16", alt: "删除试题题干"})
					    )
					)
				), 
				React.createElement("div", {className: "item-stem-area"}, 
					React.createElement("div", {className: "params"}, 
						React.createElement("label", {title: "是否在题干末尾显示题干长度(题干长度自动计算)。该参数在具体试题内可作修改！"}, 
							React.createElement("input", {type: "checkbox", name: "show-stem-length", defaultChecked: showStemLength, onChange: this.handleShowStemLengthChange}), 
							"显示题干字数"
						)
					), 
					React.createElement("div", {className: "item-stem-content"}, 
						stem, 
						
							showStemLength ? ('(' + stem.length + 'words)') : '', 
						
						React.createElement("a", {href: "javascript:void(0)", className: "delete-item-stem", onClick: this.deleteItemStem, title: "删除试题题干"}, 
							React.createElement("img", {src: "/images/manage/delete-min.png", width: "16", height: "16", alt: "删除试题题干"})
						)
					)
				)
			)
		);
	}
});

// 试题item的options
var ItemOptions = React.createClass({displayName: "ItemOptions",
	deleteItemOptions: function(event) {
		//此处手动移出鼠标，否则tooltips不会消失
		$(event.target).mouseout();

		//移除试题选项
		delete item.options;
		delete item['show-options-order-num'];

		//改变item state
		this.props.changeItemState();
	},
	deleteItemOption: function(event) {
		//此处手动移出鼠标，否则tooltips不会消失
		$(event.target).mouseout();
		//移除试题选项中的一个
		item.options.pop();
		//改变item state
		this.props.changeItemState();
	},
	addItemOption: function() {
		//添加试题选项
		var new_item_stem = '试题选项内容';

		//如果item中不存在options，设为空数组
		item.options = item.options ? item.options : [];
		item.options.push(new_item_stem);
		//改变item state
		this.props.changeItemState();
	},
	handleShowOptionsOrderNum: function(event) {
		var showOptionsOrderNum = event.target.checked;
		//改变item的show-stem-length
		item['show-options-order-num'] = showOptionsOrderNum;
		//改变item state
		this.props.changeItemState();
	},
	render: function() {
		var self = this;
		var options = this.props.options;
		var showOptionsOrderNum = this.props.showOptionsOrderNum;
		var hasSingleChoiceQuestion = this.props.hasSingleChoiceQuestion;
		var shuffle = this.props.shuffle;
		return (
			React.createElement("div", {className: "item-options"}, 
    			React.createElement("div", {className: "title", title: "点击显示/隐藏该区域"}, 
    				"试题选项", 
					React.createElement("div", {className: "title-oprations"}, 
					
						hasSingleChoiceQuestion
						?
						React.createElement("a", {href: "javascript:void(0)", title: "已存在和试题选项相关联的单项选择题，无法删除试题选项"}, 
						    React.createElement("img", {src: "/images/manage/delete-disabled.png", width: "16", height: "16", alt: "已存在和试题选项相关联的单项选择题，无法删除试题选项"})
						)
						:
						React.createElement("a", {href: "javascript:void(0)", onClick: self.deleteItemOptions, title: "删除试题选项"}, 
						    React.createElement("img", {src: "/images/manage/delete-min.png", width: "16", height: "16", alt: "删除试题选项"})
						)
					
					)
    			), 
    			React.createElement("div", {className: "item-options-area"}, 
    				React.createElement("div", {className: "params"}, 
    				
    					hasSingleChoiceQuestion
    					?
    					React.createElement("label", {title: "题型中已存在单选小题，无法修改此参数"}, 
                        	React.createElement("input", {type: "checkbox", name: "show-options-order-num", defaultChecked: showOptionsOrderNum, onChange: this.handleShowOptionsOrderNum, disabled: true}), 
                       		"显示试题选项序号"
                    	)
    					:
    					React.createElement("label", {title: "是否显示选项序号(如A/B/C/D)。该参数在具体试题内不可作修改！"}, 
                        	React.createElement("input", {type: "checkbox", name: "show-options-order-num", defaultChecked: showOptionsOrderNum, onChange: this.handleShowOptionsOrderNum}), 
                       		"显示试题选项序号"
                    	)
    				
    				), 
	    			React.createElement("ul", {className: "item-options-list"}, 
					
						options.map(function(option, i, options) {
							return (
								React.createElement("li", {className:  showOptionsOrderNum ? 'show-order-num' : 'no-order-num'}, 
									React.createElement("span", null, option), 
									
										options.length > 2 
										? 
										React.createElement("a", {href: "javascript:void(0)", className: "delete-item-option", onClick: self.deleteItemOption, title: "删除试题选项"}, 
											React.createElement("img", {src: "/images/manage/delete-min.png", width: "16", height: "16", alt: "删除试题选项"})
										)
										: 
										React.createElement("a", {href: "javascript:void(0)", className: "delete-item-option", title: "无法删除试题选项！试题选项不得少于2个"}, 
											React.createElement("img", {src: "/images/manage/delete-disabled.png", width: "16", height: "16", alt: "无法删除试题选项！试题选项不得少于2个"})
										), 
									
									React.createElement("a", {href: "javascript:void(0)", className: "add-item-option-a", onClick: self.addItemOption, title: "添加试题选项"}, 
										React.createElement("img", {src: "/images/manage/add-min.png", width: "16", height: "16", alt: "添加试题选项"})
									)
								)
							);
						})
					
	    			)
    			)
    		)
		)
	}
});

//试题item内的questions
var Questions = React.createClass({displayName: "Questions",
	deleteQuestions: function(event) {
		//此处手动移出鼠标，否则tooltips不会消失
		$(event.target).mouseout();

		//移除试题选项
		delete item.questions;
		delete item['questions-num-limit'];
		delete item['pre-show'];

		//改变item state
		this.props.changeItemState();
	},
	handleQuestionsNulLimit: function(event) {
		var questionsNumLimit = event.target.checked;
		//改变item的show-stem-length
		item['questions-num-limit'] = questionsNumLimit;
		//改变item state
		this.props.changeItemState();
	},
	handlePreShow: function(event) {
		var preShow = event.target.checked;
		//改变item的show-stem-length
		item['pre-show'] = preShow;
		//改变item state
		this.props.changeItemState();
	},
	render: function() {
		var self = this;
		
		var questionsNumLimit = this.props.questionsNumLimit;

		var showQuestionsOptionsContent = this.props.showQuestionsOptionsContent;

		var preshow = this.props.preShow;

		var item_options = this.props.itemOptions;

		var questions = this.props.questions;

		return (
			React.createElement("div", {className: "item-questions"}, 
				React.createElement("div", {className: "title", title: "点击显示/隐藏该区域"}, 
					"包含小题", 
					React.createElement("div", {className: "title-oprations"}, 
					    React.createElement("a", {href: "javascript:void(0)", onClick: self.deleteQuestions, title: "删除包含的所有小题"}, 
					        React.createElement("img", {src: "/images/manage/delete-min.png", width: "16", height: "16", alt: "删除包含的所有小题"})
					    )
					)
				), 
				React.createElement("div", {className: "questions-area"}, 
    				React.createElement("div", {className: "params"}, 
    					React.createElement("label", {title: "是否限制小题数量。不限制小题数量的题型，在添加具体试题时，可以额外增加相同类型小题。限制小题数量时，不可额外增加小题。该参数在具体试题内不可作修改！"}, 
                        	React.createElement("input", {type: "checkbox", name: "questions-num-limit", checked: questionsNumLimit, onChange: this.handleQuestionsNulLimit}), 
                       		"限制小题数量"
                    	), 
                    	React.createElement("label", {title: "是否提前显示试题所包含的各小题（题型可能需求小题先隐藏达到一定条件后显示，一般在流程性试题中使用，当听力或视频播放结束后显示小题）。该参数在具体试题内可作修改！"}, 
                        	React.createElement("input", {type: "checkbox", name: "pre-show", checked: preshow, onChange: this.handlePreShow}), 
                       		"提前显示各小题"
                    	)
    				), 
    				React.createElement("div", {className: "questions"}, 
						
							 questions.map(function( question, i, questions ){
								return (
									React.createElement(Question, {question: question, itemOptions: item_options, showQuestionsOptionsContent: showQuestionsOptionsContent, order: i, changeItemState: self.props.changeItemState})
								);
							})
						
					)
				)
			)
		);
	}
});

//试题item中包含的小题Question
var Question = React.createClass({displayName: "Question",
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
	deleteQuestion: function(event) {
		$(event.target).mouseout();

		var order = this.props.order;
		//插入item
		item.questions.splice(order, 1);

		//改变item state
		this.props.changeItemState();
	},
	addQuestionStem: function(event) {
		$(event.target).mouseout();
		
		var order = this.props.order;
		//添加
		item.questions[order].stem = "此处为小题题干，题干内容可以包括图片、音频以及视频等多媒体。";

		//改变item state
		this.props.changeItemState();
	},
	deleteQuestionStem: function(event) {
		$(event.target).mouseout();

		var order = this.props.order;
		//删除题干
		delete item.questions[order].stem;

		//改变item state
		this.props.changeItemState();
	},
	render: function() {
		var self = this;
		var item_options = this.props.itemOptions;
		var question = this.props.question;
		var order = this.props.order;
		var type = question.type;
		var showQuestionsOptionsContent = this.props.showQuestionsOptionsContent;

		var question_stem = question.stem ? 
			React.createElement("div", {className: "Question-stem"},
				React.createElement("span", null, question.stem), 
				React.createElement("a", {href: "javascript:void(0)", className: "delete-Question-stem-a", onClick: this.deleteQuestionStem, title: "删除小题题干"},
					React.createElement("img", {src: "/images/manage/delete-min.png", width: "16", height: "16", alt: "删除小题题干"})
				)
			) 
			: '';

		//小题内容区域
		var content_area;
		if(type == "SingleChoice") {
			content_area = React.createElement(SingleChoice, {itemOptions: item_options, options: question.options, showQuestionsOptionsContent: showQuestionsOptionsContent, questionOrder: order, changeItemState: self.props.changeItemState})
		}if(type == "MultipleChoice") {
			content_area = React.createElement(MultipleChoice, {options: question.options, questionOrder: order, changeItemState: self.props.changeItemState})
		}else if(type == "SimpleAnswer") {
			content_area = React.createElement(SimpleAnswer, null)
		}else if(type == "BlankFilling") {
			content_area = React.createElement(BlankFilling, null)
		}else if(type == "TrueOrFalse"){
			content_area = React.createElement(TrueOrFalse, {questionOrder: order})
		}

		return (
			React.createElement("div", {className: "question"}, 
				React.createElement("div", {className: "question-operations"},
					React.createElement("a", {href: "javascript:void(0)", className: "delete-Question-a", onClick: this.deleteQuestion, title: "删除小题"},
						React.createElement("img", {src: "/images/manage/delete-min.png", width: "16", height: "16", alt: "删除小题"})
					), 
					
						!question_stem ? 
						React.createElement("a", {href: "javascript:void(0)", className: "add-Question-stem-a", onClick: this.addQuestionStem, title: "添加小题题干"},
							React.createElement("img", {src: "/images/manage/add-stem.png", width: "16", height: "16", alt: "添加小题题干"})
						)
						: "", 
					
					React.createElement("a", {href: "javascript:void(0)", className: "add-Question-a", onClick: this.addQuestionFromCurrent, title: "添加小题"},
						React.createElement("img", {src: "/images/manage/add-min.png", width: "16", height: "16", alt: "添加小题"})
					)
				), 
				question_stem, 
				content_area
			)
		);
	}
});

//小题Question中的内容区域部分————单选题
var SingleChoice = React.createClass({displayName: "SingleChoice",
	deleteQuestionOption: function(event) {
		$(event.target).mouseout();

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

		//小题选项是否显示
		var showQuestionsOptionsContent = this.props.showQuestionsOptionsContent;

		var itemOptions = this.props.itemOptions;

		//需要显示小题选项时，为小题选项，否则为试题选题
		options = showQuestionsOptionsContent ? options : itemOptions;

		return (
			React.createElement("ul", {className: "question-options"},
			
				options.map(function(option, i, a) {
					return (
						showQuestionsOptionsContent ?  
						React.createElement("li", {className: ""}, 
							React.createElement("span", null, option), 
							
								a.length > 2
								? 
								React.createElement("a", {href: "javascript:void(0)", className: "delete-Question-option", onClick: self.deleteQuestionOption, title: "删除小题选项"},
									React.createElement("img", {src: "/images/manage/delete-min.png", width: "16", height: "16", alt: "删除小题选项"})
								)
								: 
								React.createElement("a", {href: "javascript:void(0)", className: "delete-Question-option", title: "无法删除小题选项。小题选项不能少于两个。"},
									React.createElement("img", {src: "/images/manage/delete-disabled.png", width: "16", height: "16", alt: "无法删除小题选项。小题选项不能少于两个。"})
								), 
							
							React.createElement("a", {href: "javascript:void(0)", className: "add-Question-option", onClick: self.addQuestionOption, title: "添加小题选项"},
								React.createElement("img", {src: "/images/manage/add-min.png", width: "16", height: "16", alt: "添加小题选项"})
							)
						)
						: 
						React.createElement("li", {className: showQuestionsOptionsContent ? '' : 'inline', title: "与试题选项相关联的小题选项，无法进行其他操作"}
						) 
					)
				})
			
			)
		)
	}
});


//小题Question中的内容区域部分————多选题
var MultipleChoice = React.createClass({displayName: "MultipleChoice",
	deleteQuestionOption: function(event) {
		$(event.target).mouseout();

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

		//小题选项是否显示
		var showQuestionsOptionsContent = this.props.showQuestionsOptionsContent;

		var itemOptions = this.props.itemOptions;

		return (
			React.createElement("ul", {className: "question-options"},
			
				options.map(function(option, i, a) {
					return (
						React.createElement("li", {className: ""}, 
							React.createElement("span", null, option), 
							
								a.length > 2
								? 
								React.createElement("a", {href: "javascript:void(0)", className: "delete-Question-option", onClick: self.deleteQuestionOption, title: "删除小题选项"},
									React.createElement("img", {src: "/images/manage/delete-min.png", width: "16", height: "16", alt: "删除小题选项"})
								)
								: 
								React.createElement("a", {href: "javascript:void(0)", className: "delete-Question-option", title: "无法删除小题选项。小题选项不能少于两个。"},
									React.createElement("img", {src: "/images/manage/delete-disabled.png", width: "16", height: "16", alt: "无法删除小题选项。小题选项不能少于两个。"})
								), 
							
							React.createElement("a", {href: "javascript:void(0)", className: "add-Question-option", onClick: self.addQuestionOption, title: "添加小题选项"},
								React.createElement("img", {src: "/images/manage/add-min.png", width: "16", height: "16", alt: "添加小题选项"})
							)
						)
					) 
				})
			
			)
		)
	}
});


//小题Question中的内容区域部分————填空题
var BlankFilling = React.createClass({displayName: "BlankFilling",
	render: function() {
		return (
			React.createElement("input", {className: "blank-filling", type: "text", disabled: true})
		)
	}
});

//小题Question中的内容区域部分————简答题
var SimpleAnswer = React.createClass({displayName: "SimpleAnswer",
	render: function() {
		return (
			React.createElement("textarea", {className: "simple-answer", disabled: true})
		)
	}
});

//小题Question中的内容区域部分————判断题
var TrueOrFalse = React.createClass({displayName: "TrueOrFalse",
	render: function() {
		var question_order = this.props.questionOrder;
		return (
			React.createElement("div", {className: "true-or-false"},
				React.createElement("input",{type:"radio",name:"question_"+question_order,className:"true-option",value:0,disabled:true}),
				React.createElement("input",{type:"radio",name:"question_"+question_order,className:"false-option",value:1,disabled:true})
			)
		)
	}
});


//点击完成添加时，提交表单
$('.complete-add').click(function() {
	$('.form-add button').click();
});

/*添加删除题干*/
$('.add-item-stem').click(handleAddItemStem);

function handleAddItemStem() {
	//添加试题题干
	var new_item_stem = '此处为试题题干内容，题干中可以包括图片、音频以及视频等多媒体。';
	item.stem = new_item_stem

	//指定是否显示题干字数的默认值
	item['show-stem-length'] = false;

	//关闭所有添加区域title 显示对应添加区域
	$('.title').each(function(){
		$(this).addClass('close').next().hide();
	});
	$('.item-stem .title').removeClass('close').next().show();

	//改变item_structure输入框的值
	$item_structure.val(JSON.stringify(item));

	//重新渲染Item
	ReactDOM.render(
		React.createElement(Item, null),
		$('#item-area')[0]
	);
}

/*添加删除试题选项*/
//点击添加试题选项时，添加试题选项
$('.add-item-option').click(handleAddItemOption);

function handleAddItemOption() {
	//当不存在试题选项或者试题选项个数少于两个时，该添加有效
	if( !item.options || item.options.length < 2 ){
		//添加试题选项 至少两个
		var new_item_options = ['试题选项内容', '试题选项内容'];

		//如果item中不存在options，设为空数组
		item.options = item.options ? item.options : [];
		item.options = item.options.concat(new_item_options);

		//指定是否显示试题选项序号的默认值
		item['show-options-order-num'] = true;

		//指定是否打乱试题选项顺序
		item.shuffle = false;

		//关闭所有添加区域title 显示对应添加区域
		$('.title').each(function(){
			$(this).addClass('close').next().hide();
		});
		$('.item-options .title').removeClass('close').next().show();

		//改变item_structure输入框的值
		$item_structure.val(JSON.stringify(item));

		//重新渲染Item
		ReactDOM.render(
			React.createElement(Item, null),
			$('#item-area')[0]
		);
	}
}

/*将创建好的小题加入item*/
function addNewQuestion(new_question) {
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
}

/*添加单选小题*/
$('.add-single-choice').click(function(){
	/*建立新小题*/
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

	addNewQuestion(new_question);
	
});

/*添加多选题*/
$('.add-multiple-choice').click(function() {
	var new_question = {
		"type": "MultipleChoice",			
		"stem": "此处为多选题小题题干，题干内容可以包括图片、音频以及视频等多媒体。",
		"options": [		//question的各个选项
			"多选小题选项内容",
			"多选小题选项内容",
			"多选小题选项内容",
			"多选小题选项内容"
		]
	};
	addNewQuestion(new_question);
});

/*添加填空题*/
$('.add-blank-filling').click(function() {
	var new_question = {
		"type": "BlankFilling",			
		"stem": "此处为填空题小题题干，题干内容可以包括图片、音频以及视频等多媒体。"
	}

	addNewQuestion(new_question);

});

/*添加简答题*/
$('.add-simple-answer').click(function() {
	var new_question = {
		"type": "SimpleAnswer",			
		"stem": "此处为简答题题干，题干内容可以包括图片、音频以及视频等多媒体。"
	}

	addNewQuestion(new_question);
});

/*添加判断题*/
$('.add-true-or-false').click(function() {
	var new_question = {
		"type": "TrueOrFalse",			
		"stem": "此处为判断题题干，题干内容可以包括图片、音频以及视频等多媒体。",
		"options": [		//question的各个选项
			"正确",
			"错误",
		]
	}

	addNewQuestion(new_question);
});

/*添加录音题*/
$('.add-simple-answer').click(function() {
	var new_question = {
		"type": "SimpleAnswer",			
		"stem": "此处为录音题题干，题干内容可以包括图片、音频以及视频等多媒体。"
	}

	addNewQuestion(new_question);
});

/*添加排序题*/
$('.add-simple-answer').click(function() {
	var new_question = {
		"type": "SimpleAnswer",			
		"stem": "此处为排序题题干，题干内容可以包括图片、音频以及视频等多媒体。"
	}

	addNewQuestion(new_question);
});

/*添加改错题*/
$('.add-simple-answer').click(function() {
	var new_question = {
		"type": "SimpleAnswer",			
		"stem": "此处为改错题题干，题干内容可以包括图片、音频以及视频等多媒体。"
	}

	addNewQuestion(new_question);
});



