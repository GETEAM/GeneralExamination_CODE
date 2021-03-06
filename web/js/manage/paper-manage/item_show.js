var item={};
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
	render: function() {
		var item = this.state.item;

		var options = item.options;

		//该值默认为true
		var showOptionsOrderNum = item['show-options-order-num'] === false ? false : true;

		//该值默认为true
		var questionsNumLimit = item['questions-num-limit'] === false ? false : true;

		//该值默认为true
		var preShow = item['pre-show'] === false ? false : true;

		//该值根据item自动确认。默认为true (item中不存在该参数，试题选项存在时且有序号时，该参数默认为false,即不显示小题选项内容)
		var showQuestionsOptionsContent = ( options && options.length > 0 && showOptionsOrderNum ) ? false : true; 

		var hasSingleChoiceQuestion = this.hasSingleChoiceQuestion();

		//如果item题干存在，则插入ItemStem
		var item_stem = item.stem 
						?　React.createElement(ItemStem, {
							stem: item.stem, 
							showStemLength: item['show-stem-length']}) 
						: '';

		//如果item选项存在，则插入ItemOptions
		var item_options = (options && options.length != 0) 
							? React.createElement(ItemOptions, {
								options: options, 
								hasSingleChoiceQuestion: hasSingleChoiceQuestion, 
								showOptionsOrderNum: showOptionsOrderNum}) 
							: '';

		//如果存在questions，则插入Question
		var questions = (item.questions && item.questions.length != 0) 
					? React.createElement(Questions, {
						questionsNumLimit: questionsNumLimit, 
						preShow: preShow, 
						itemOptions: options, 
						showQuestionsOptionsContent: showQuestionsOptionsContent, 
						questions: item.questions}) 
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
	render: function() {
		var showStemLength = this.props.showStemLength ? true : false;
		var stem = this.props.stem;

		return (
			React.createElement("div", {className: "item-stem"}, 
				React.createElement("div", {className: "item-stem-area"}, 
					React.createElement("div", {className: "item-stem-content"}, 
						stem, 
						
							showStemLength ? ('(' + stem.length + 'words)') : ''
						
					)
				)
			)
		);
	}
});

// 试题item的options
var ItemOptions = React.createClass({displayName: "ItemOptions",
	render: function() {
		var self = this;
		var options = this.props.options;
		var showOptionsOrderNum = this.props.showOptionsOrderNum;
		var hasSingleChoiceQuestion = this.props.hasSingleChoiceQuestion;
		var shuffle = this.props.shuffle;
		return (
			React.createElement("div", {className: "item-options"}, 
    			React.createElement("div", {className: "item-options-area"}, 
	    			React.createElement("ul", {className: "item-options-list"}, 
					
						options.map(function(option, i, options) {
							return (
								React.createElement("li", {className:  showOptionsOrderNum ? 'show-order-num' : 'no-order-num'}, 
									React.createElement("span", null, option)
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
	render: function() {
		var self = this;
		
		var questionsNumLimit = this.props.questionsNumLimit;

		var showQuestionsOptionsContent = this.props.showQuestionsOptionsContent;

		var preshow = this.props.preShow;

		var item_options = this.props.itemOptions;

		var questions = this.props.questions;

		return (
			React.createElement("div", {className: "item-questions"}, 
				React.createElement("div", {className: "questions-area"}, 
    				React.createElement("div", {className: "questions"}, 
						
							 questions.map(function( question, i, questions ){
								return (
									React.createElement(Question, {question: question, itemOptions: item_options, showQuestionsOptionsContent: showQuestionsOptionsContent, order: i})
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
	render: function() {
		var self = this;
		var item_options = this.props.itemOptions;
		var question = this.props.question;
		var order = this.props.order;
		var type = question.type;
		var showQuestionsOptionsContent = this.props.showQuestionsOptionsContent;

		var question_stem = question.stem ? 
			React.createElement("div", {className: "Question-stem"},
				React.createElement("span", null, question.stem)
			) 
			: '';

		//小题做答区域
		var answer_area;
		if(type == "SingleChoice") {
			answer_area = React.createElement(SingleChoice, {itemOptions: item_options, options: question.options, showQuestionsOptionsContent: showQuestionsOptionsContent, questionOrder: order})
		}
		// else if(type == "SimpleAnswer") {
		// 	answer_area = <SimpleAnswer questionId={id} />
		// }else if(type == "BlankFilling") {
		// 	answer_area = <BlankFilling questionId={id} />
		// }
		return (
			React.createElement("div", {className: "question"}, 
				question_stem, 
				answer_area
			)
		);
	}
});

//小题Question中的答题区域部分————单选题
var SingleChoice = React.createClass({displayName: "SingleChoice",
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
							React.createElement("span", null, option)
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

//小题Question中的答题区域部分————填空题
var BlankFilling = React.createClass({displayName: "BlankFilling",
	render: function() {
		return (
			React.createElement("input", {className: "blank-filling", type: "text", disabled: true})
		)
	}
});

//小题Question中的答题区域部分————简答题
var SimpleAnswer = React.createClass({displayName: "SimpleAnswer",
	render: function() {
		return (
			React.createElement("textarea", {className: "simple-answer", disabled: true})
		)
	}
});
