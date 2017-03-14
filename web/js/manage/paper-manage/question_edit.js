$(function(){

	var question_id = $('.question-id').html();
	$.ajax({
	    type: 'GET',
	    url: '/manage/question/QTJSON/' + question_id,
	    dataType: 'json',
	    async: true,
	    success: function (data) {
	    	item = JSON.parse(data.item);

	    	// 显示Item
	    	ReactDOM.render(
	    		React.createElement(Item, null),
	    		$('#item-content')[0]
	    	);
	    },
	    error: function (XMLHttpRequest, textStatus, errorThrown) {
	        console.log("error " + textStatus);
	        console.log("网络或服务器异常！" + 'ERROR');

	        //网络或服务器异常！无法获取题型结构相关！给予提示
	        var $warning_message = $('<div>').html('网络或服务器异常！无法获取题型结构相关！').addClass('notice error');
	        $('.flash-message').append($warning_message);
	    }
	});


	var item = {};
	var $itemStructure = $('.question-structure');
	var Item = React.createClass({displayName: "Item",
	  	getInitialState: function(){
	    	return {
	      		item: item
	    	}
	  	},
	  	handleChangeState: function() {
			this.setState({
				item: item
			});
			$itemStructure.val(JSON.stringify(item));
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
		getInitialState: function(){//出题的时候初始化为空
			//item.stem = '';
	    	return null;
	  	},
		//每次输入值改变的时候，获取题干内容
		handleStemLength: function(event) {
			item.stem = event.target.value;
			//长度值改变
			$('#stem-length').text('('+item.stem.split(' ').length+'words)'); 
			this.props.changeItemState();       
		},
		//删除试题题干
		deleteItemStem: function(event){
			//此处手动移出鼠标，否则tooltips不会消失
			$(event.target).mouseout();
			//删除item的stem相关属性
			delete item.stem;
			delete item['show-stem-length'];
			//改变item state
			this.props.changeItemState();
		},
	  	render: function() {
	  		var self = this;
	    	var showStemLength = this.props.showStemLength ? true : false;
	    	var stem = this.props.stem;
		    return (
		      React.createElement("div", {className: "item-stem"}, 
		        React.createElement("div", {className: "item-stem-area"}, 
		          React.createElement("div", {className: "item-stem-content"}, 
		          	React.createElement("textarea",{rows:"8",cols:"100",className: "item-stem-input",value: stem,placeholder:stem,onChange:self.handleStemLength}),
		          	
		          	showStemLength ? React.createElement("span",{id:'stem-length'},'(0word)') : '',
		          	React.createElement("a", {href: "javascript:void(0)", className: "delete-item-stem", onClick: this.deleteItemStem, title: "删除试题题干"}, 
						React.createElement("img", {src: "/images/manage/delete-min.png", width: "16", height: "16", alt: "删除试题题干"})
					),     
		          	React.createElement("div",{className:"item-stem-file"},
		          		React.createElement("label",{className:'upload-label',htmlFor:'item-stem-file'},'上传多媒体元素'),
		          		React.createElement("input",{type:'file',className:"item-file-upload",id:'item-stem-file'})
		          	)    
		          )
		        )
		      )
		    );
	  	}
	});

	// 试题item的options
	var ItemOptions = React.createClass({displayName: "ItemOptions",
		handleItemOptionContent: function(event){

			var index = event.target.getAttribute('name');
			var optionValue = event.target.value;

		    var options = this.props.options;  
		    options[index] = optionValue;  
		    item.options = options;
		    this.props.changeItemState();
		},
		addItemOption: function(event){
			//添加试题选项输入框
			var new_item_stem = '试题选项内容';
			//如果item中不存在options，设为空数组
			item.options = item.options ? item.options : [];
			item.options.push(new_item_stem);
			//改变item state
			this.props.changeItemState();
		},
		deleteItemOption:function(event){
			//此处手动移出鼠标，否则tooltips不会消失
			$(event.target).mouseout();
			
			//移除试题选项中的一个
			//item.options.splice(index,1);
			item.options.pop();
			//改变item state
			this.props.changeItemState();
		},
	  	render: function() {
		    var self = this;
		    var options = this.props.options;
		    var showOptionsOrderNum = this.props.showOptionsOrderNum;
		    var shuffle = this.props.shuffle;
		    return (
		      React.createElement("div", {className: "item-options"}, 
		          React.createElement("div", {className: "item-options-area"}, 
		            React.createElement("ul", {className: "item-options-list"}, 
		          
		            options.map(function(option, i, options) {
		              return (
		                React.createElement("li", {className:  showOptionsOrderNum ? 'show-order-num' : 'no-order-num'}, 
		                  React.createElement("input", {type:'text',value: option,placeholder:option,'name':i,onChange:self.handleItemOptionContent}),

		                  options.length>2 ?
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
	                  React.createElement(Question, {question: question, itemOptions: item_options, showQuestionsOptionsContent: showQuestionsOptionsContent, order: i,changeItemState: self.props.changeItemState})
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
		getInitialState: function(){//初始化时单选题、多选题、判断题、排序题答案是严格匹配，填空、简答、录音、改错是不严格匹配
			var question = this.props.question; 
		    var type = question.type;
		    if(type == 'SingleChoice' || type == 'MultipleChoice' || type == 'TrueOrFalse' || type == 'Sort'){
		    	question['strict'] = true;
		    }else{
		    	question['strict'] = false;
		    }
			return null;
		},
		handleQuestionStemTextContent: function(event){//题目是文本
			//当有文本选项的时候多媒体元素禁用
			var stemText = event.target.value;
			if(stemText != ''){
				event.target.nextSibling.value = '';
				event.target.nextSibling.disabled = true;
			}else{
				event.target.nextSibling.disabled = false;
			}
			var question = this.props.question;  
		    question.stem = stemText;
		    this.props.changeItemState();
		},
		handleQuestionStemMediaContent: function(event){//选择多媒体元素
			//如果选择了多媒体元素则文本选项失效
			var stemMedia = event.target.value;
			if(stemMedia !=''){
				event.target.previousSibling.value = '如果选择了多媒体元素则文本选项失效';
				event.target.previousSibling.disabled = 'true';
			}
			var question = this.props.question;  
		    question.stem = stemMedia;
		},
		deleteQuestionStem: function(event){//删除题干
			$(event.target).mouseout();
			var order = this.props.order;
			//删除题干
			delete item.questions[order].stem;

			//改变item state
			this.props.changeItemState();
		},
		addQuestionStem: function(event){//添加题干
			$(event.target).mouseout();
	
			var order = this.props.order;
			//添加
			item.questions[order].stem = "此处为小题题干，题干内容可以包括图片、音频以及视频等多媒体。";

			//改变item state
			this.props.changeItemState();
		},
		deleteQuestion: function(event){//删除整个小题
			$(event.target).mouseout();

			var order = this.props.order;
			//插入item
			item.questions.splice(order, 1);

			//改变item state
			this.props.changeItemState();
		},
		addQuestionFromCurrent: function(event){//以此题为基础添加小题
			var question = this.props.question;
			var order = this.props.order;
			//复制当前小题为新小题
			var new_question = deepCopy(question);

			//插入item
			item.questions.splice(order, 0, new_question);

			//改变item state
			this.props.changeItemState();
		},
		handleReferenceAnswer: function(event){//处理参考答案
			var question = this.props.question;
			var referenceAnswer = '';
			if(question.type == 'MultipleChoice'){
				var order = this.props.order;
				var chk_value =[];
				$('input[name=question_'+order+']:checked').each(function(){
					chk_value.push($(this).val());
				}); 
				referenceAnswer = chk_value.join(',');
			}else{
				referenceAnswer = event.target.value;
			};
			var question = this.props.question;
			question['reference-answer'] = referenceAnswer;
			this.props.changeItemState();
		},
		handleStrictMatch: function(event){//答案是否严格匹配
			
			var question = this.props.question;
			var strict = event.target.checked;
			question['strict'] = strict;
			//改变item state
			this.props.changeItemState();
		},
		handleAnswerAnalysis: function(event){//答案解析
			var question = this.props.question;
			question['answer-analysis'] = event.target.value;
			this.props.changeItemState();
		},
	  render: function() {
	    var self = this;
	    var item_options = this.props.itemOptions;
	    var question = this.props.question;
	    var order = this.props.order;
	    var type = question.type;
	    var options = question.options;//选择题的试题选项
	    var strict = question.strict;//是否严格匹配
	    var answer_analysis = question['answer-analysis'];
	    var showQuestionsOptionsContent = this.props.showQuestionsOptionsContent;
	    var answer = question['reference-answer'];
	    var question_stem = question.stem ? 
	      React.createElement("div", {className: "question-stem"},
	        React.createElement("input", {type:'text',value: question.stem,placeholder:question.stem,onChange:self.handleQuestionStemTextContent}),
	        React.createElement("input",{type:'file',onChange:self.handleQuestionStemMediaContent}),
	        React.createElement("a", {href: "javascript:void(0)", className: "delete-question-stem-a", onClick: this.deleteQuestionStem, title: "删除小题题干"},
				React.createElement("img", {src: "/images/manage/delete-min.png", width: "16", height: "16", alt: "删除小题题干"})
			)
	      ) 
	      : '';

	    //小题显示区域  
	    var question_show;

	    if(type == "SingleChoice") {
	      	question_show = React.createElement(SingleChoice, {itemOptions: item_options, options: options,referenceAnswer:answer, strict:strict,
	      		showQuestionsOptionsContent: showQuestionsOptionsContent, questionOrder: order,
	      			handleReferenceAnswer:this.handleReferenceAnswer,handleStrictMatch:this.handleStrictMatch,changeItemState: self.props.changeItemState});

	    }else if(type == "MultipleChoice") {
	      	question_show = React.createElement(MultipleChoice, {options: options, questionOrder: order,referenceAnswer:answer, strict: strict,handleReferenceAnswer:this.handleReferenceAnswer,
	      		handleStrictMatch:this.handleStrictMatch,changeItemState: self.props.changeItemState});

	    }else if(type == "SimpleAnswer") {
	      	question_show = React.createElement(SimpleAnswer, {referenceAnswer:answer, strict: strict,handleReferenceAnswer:this.handleReferenceAnswer,
	      		handleStrictMatch:this.handleStrictMatch,changeItemState: self.props.changeItemState});

	    }else if(type == "BlankFilling") {
	      	question_show = React.createElement(BlankFilling, {referenceAnswer:answer,strict: strict,handleReferenceAnswer:this.handleReferenceAnswer,
	      		handleStrictMatch:this.handleStrictMatch,changeItemState: self.props.changeItemState});
	    
	    }else if(type == "TrueOrFalse") {
	      	question_show = React.createElement(TrueOrFalse, {questionOrder: order,referenceAnswer:answer,strict: strict,handleReferenceAnswer:this.handleReferenceAnswer,
	      		handleStrictMatch:this.handleStrictMatch,changeItemState: self.props.changeItemState});
	    
	    }else if(type == "Record") {
	      	question_show = React.createElement(Record, {referenceAnswer:answer,strict: strict,handleReferenceAnswer:this.handleReferenceAnswer,
	      		handleStrictMatch:this.handleStrictMatch,changeItemState: self.props.changeItemState});
	    }


	    //答案解析区域
	    var answer_analysis = React.createElement("textarea",{rows:"3",cols:"100",className: "answer-analysis",value: answer_analysis, placeholder:'答案解析',onChange:this.handleAnswerAnalysis});

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
	        question_show,
	        answer_analysis
	      )
	    );
	  }
	});

	//小题Question中的小题显示部分————单选题
	var SingleChoice = React.createClass({displayName: "SingleChoice",
		handleQuestionOptionChange: function(event){
			var options = this.props.options;
			var i = event.target.getAttribute('name');
			options[i] = event.target.value;
			this.props.changeItemState();
		},
		deleteQuestionOption: function(event){//删除当前小题的一个选项
			var question_order = this.props.questionOrder;
			
			item.questions[question_order].options.pop();

			//改变item state
			this.props.changeItemState();
		},
		addQuestionOption: function(event){//添加一个新的选项
			var question_order = this.props.questionOrder;
			
			var new_question_option = '单选小题选项内容';
			item.questions[question_order].options.push(new_question_option);

			//改变item state
			this.props.changeItemState();
		},
		handleReferenceAnswer: function(event){
			this.props.handleReferenceAnswer(event);
		},
		handleStrictMatch: function(event){
			this.props.handleStrictMatch(event);
		},
	  render: function() {
	    var self = this;

	    var options = this.props.options;

	    //小题选项是否显示
	    var showQuestionsOptionsContent = this.props.showQuestionsOptionsContent;

	    var itemOptions = this.props.itemOptions;

	    //需要显示小题选项时，为小题选项，否则为试题选题
	    options = showQuestionsOptionsContent ? options : itemOptions;

	    //初始的是否严格匹配
	    var question_order = this.props.questionOrder;
	    var strict = this.props.strict;
	    var referenceAnswer = this.props.referenceAnswer;
	    //出题填写答案区域
	    var answer_area = React.createElement("div",{className:'question-answer'},
	    	"正确答案： ",
	    	options.map(function(option,i,a){
	    		return (
	    			React.createElement("label",{className:'correct-answer'},
	    				referenceAnswer == i ? 
	    				React.createElement('input',{type:'radio',name:'question_'+question_order,value:i,checked:'checked',onChange:self.handleReferenceAnswer}) :
						React.createElement('input',{type:'radio',name:'question_'+question_order,value:i,onChange:self.handleReferenceAnswer})
	    			)
	    		)
	    	}),
	    	React.createElement("label", {title: "考生答案和标准参考答案是否完全一致",className:'strict-match'}, 
                React.createElement("input", {type: "checkbox", name: "strict-match",checked:strict, onChange: this.handleStrictMatch}), 
                   	"是否严格匹配"
            )
	    );
	    
	    return (
	    	React.createElement('div',null,
	    		React.createElement("ul", {className: "question-options"},
	      
			        options.map(function(option, i, a) {
			          return (
			            showQuestionsOptionsContent ?  
			            React.createElement("li", {className: ""}, 
			              	React.createElement("input", {type:'text',value: option,placeholder:option,name:i,onChange:self.handleQuestionOptionChange}),
			             	a.length > 2
							? 
							React.createElement("a", {href: "javascript:void(0)", className: "delete-question-option", onClick: self.deleteQuestionOption, title: "删除小题选项"},
								React.createElement("img", {src: "/images/manage/delete-min.png", width: "16", height: "16", alt: "删除小题选项"})
							)
							: 
							React.createElement("a", {href: "javascript:void(0)", className: "delete-question-option", title: "无法删除小题选项。小题选项不能少于两个。"},
								React.createElement("img", {src: "/images/manage/delete-disabled.png", width: "16", height: "16", alt: "无法删除小题选项。小题选项不能少于两个。"})
							), 
						
							React.createElement("a", {href: "javascript:void(0)", className: "add-question-option", onClick: self.addQuestionOption, title: "添加小题选项"},
								React.createElement("img", {src: "/images/manage/add-min.png", width: "16", height: "16", alt: "添加小题选项"})
							)
			            )
			            : 
			            React.createElement("li", {className: showQuestionsOptionsContent ? '' : 'inline', title: "与试题选项相关联的小题选项，无法进行其他操作"}
			            )
			          )
			        })
			    ),
			    answer_area
	    	)
	    )
	  }
	});

	//小题Question中的小题显示部分————多选题
	var MultipleChoice = React.createClass({displayName: "MultipleChoice",
		handleQuestionOptionChange: function(event){
			var options = this.props.options;
			var i = event.target.getAttribute('name');
			options[i] = event.target.value;
			this.props.changeItemState();
		},
		deleteQuestionOption: function(event){//删除当前小题的一个选项
			var question_order = this.props.questionOrder;
			
			item.questions[question_order].options.pop();

			//改变item state
			this.props.changeItemState();
		},
		addQuestionOption: function(event){//添加一个新的选项
			var question_order = this.props.questionOrder;
			
			var new_question_option = '多选小题选项内容';
			item.questions[question_order].options.push(new_question_option);

			//改变item state
			this.props.changeItemState();
		},
		handleReferenceAnswer: function(event){
			this.props.handleReferenceAnswer(event);
		},
		handleStrictMatch: function(event){
			this.props.handleStrictMatch(event);
		},
	  render: function() {
	    var self = this;

	    var options = this.props.options;

	    //初始的是否严格匹配
	    var question_order = this.props.questionOrder;
	    var strict = this.props.strict;
	    var referenceAnswer = this.props.referenceAnswer;
	    var answerArr = referenceAnswer.split(',');
	    //出题填写答案区域
	    var answer_area = React.createElement("div",{className:'question-answer'},
	    	"正确答案： ",
	    	options.map(function(option,i,a){
	    		return (
	    			React.createElement("label",{className:'correct-answer'},
						React.createElement('input',{type:'checkbox',name:'question_'+question_order,value:i,onChange:self.handleReferenceAnswer})
	    			)
	    		)
	    	}),
	    	React.createElement("label", {title: "考生答案和标准参考答案是否完全一致",className:'strict-match'}, 
                React.createElement("input", {type: "checkbox", name: "strict-match",checked:strict, onChange: this.handleStrictMatch}), 
                   	"是否严格匹配"
            )
	    );
	    
	    return (
	    	React.createElement('div',null,
	    		React.createElement("ul", {className: "question-options"},
	      
			        options.map(function(option, i, a) {
			          return ( 
			            React.createElement("li", {className: ""}, 
			              	React.createElement("input", {type:'text',value:option,placeholder:option,name:i,onChange:self.handleQuestionOptionChange}),
			             	a.length > 2
							? 
							React.createElement("a", {href: "javascript:void(0)", className: "delete-question-option", onClick: self.deleteQuestionOption, title: "删除小题选项"},
								React.createElement("img", {src: "/images/manage/delete-min.png", width: "16", height: "16", alt: "删除小题选项"})
							)
							: 
							React.createElement("a", {href: "javascript:void(0)", className: "delete-question-option", title: "无法删除小题选项。小题选项不能少于两个。"},
								React.createElement("img", {src: "/images/manage/delete-disabled.png", width: "16", height: "16", alt: "无法删除小题选项。小题选项不能少于两个。"})
							), 
						
							React.createElement("a", {href: "javascript:void(0)", className: "add-question-option", onClick: self.addQuestionOption, title: "添加小题选项"},
								React.createElement("img", {src: "/images/manage/add-min.png", width: "16", height: "16", alt: "添加小题选项"})
							)
			            )
			          )
			        })
			    ),
			    answer_area
	    	)
	    )
	  }
	});

	//小题Question中的答题区域部分————填空题
	var BlankFilling = React.createClass({displayName: "BlankFilling",
		handleReferenceAnswer: function(event){
			this.props.handleReferenceAnswer(event);
		},
		handleStrictMatch: function(event){
			this.props.handleStrictMatch(event);
		},
	  render: function() {
	  	//填空题初始的非严格匹配
	    var strict = this.props.strict;//false
	    var referenceAnswer = this.props.referenceAnswer
	  	var answer_area = React.createElement("div",{className:'question-answer'},
	    	"正确答案： ",
	    	React.createElement("input",{type:'text',value:referenceAnswer, placeholder:'正确答案',onChange:this.handleReferenceAnswer}),
	    	React.createElement("label", {title: "考生答案和标准参考答案是否完全一致",className:'strict-match'}, 
                React.createElement("input", {type: "checkbox", name: "strict-match",defaultChecked:strict, onChange: this.handleStrictMatch}), 
                   	"是否严格匹配"
            )
    	);
	    return (
	    	answer_area
	    )
	  }
	});

	//小题Question中的答题区域部分————简答题
	var SimpleAnswer = React.createClass({displayName: "SimpleAnswer",
	  	handleReferenceAnswer: function(event){
			this.props.handleReferenceAnswer(event);
		},
		handleStrictMatch: function(event){
			this.props.handleStrictMatch(event);
		},
	  render: function() {
	  	//初始的非严格匹配
	    var strict = this.props.strict;//false
	    var referenceAnswer = this.props.referenceAnswer;
	  	var answer_area = React.createElement("div",{className:'question-answer'},
	    	React.createElement("textarea",{rows:"5",cols:"85",value:referenceAnswer,placeholder:'正确答案',onChange:this.handleReferenceAnswer}),
	    	React.createElement("label", {title: "考生答案和标准参考答案是否完全一致",className:'strict-match'}, 
                React.createElement("input", {type: "checkbox", name: "strict-match",defaultChecked:strict, onChange: this.handleStrictMatch}), 
                   	"是否严格匹配"
            )
    	);
	    return (
	    	answer_area
	    )
	  }
	});

	//小题Question中的答题区域部分————判断题
	var TrueOrFalse = React.createClass({displayName: "TrueOrFalse",
	  	handleReferenceAnswer: function(event){
			this.props.handleReferenceAnswer(event);
		},
		handleStrictMatch: function(event){
			this.props.handleStrictMatch(event);
		},
	  render: function() {
	  	//初始的严格匹配
	    var strict = this.props.strict;//true
	    var question_order = this.props.questionOrder;
	    var referenceAnswer = this.props.referenceAnswer;
	  	var answer_area = React.createElement("div",{className:'question-answer'},
	  		"正确答案： ",
	  		referenceAnswer == 0 ? 
	  		React.createElement("input",{type:"radio",name:"question_"+question_order,className:'true-option',checked:'checked',value:0,onChange:this.handleReferenceAnswer}) :
	  		React.createElement("input",{type:"radio",name:"question_"+question_order,className:'true-option',value:0,onChange:this.handleReferenceAnswer}),
	  		referenceAnswer == 1 ?
	  		React.createElement("input",{type:"radio",name:"question_"+question_order,className:'false-option',checked:'checked', value:1,onChange:this.handleReferenceAnswer}):
	  		React.createElement("input",{type:"radio",name:"question_"+question_order,className:'false-option',value:1,onChange:this.handleReferenceAnswer}),
			React.createElement("label", {title: "考生答案和标准参考答案是否完全一致",className:'strict-match'}, 
            React.createElement("input", {type: "checkbox", name: "strict-match",defaultChecked:strict, onChange: this.handleStrictMatch}), 
               	"是否严格匹配"
        	)
    	);
	    return (
	    	answer_area
	    )
	  }
	});

	//小题Question中的答题区域部分————录音题
	var Record = React.createClass({displayName: "Record",
		handleReferenceAnswer: function(event){
			this.props.handleReferenceAnswer(event);
		},
		handleStrictMatch: function(event){
			this.props.handleStrictMatch(event);
		},
	  render: function() {
	  	//填空题初始的非严格匹配
	    var strict = this.props.strict;//false
	    var referenceAnswer = this.props.referenceAnswer;
	  	var answer_area = React.createElement("div",{className:'question-answer'},
	    	"正确答案： ",
	    	React.createElement("input",{type:'button',value: "点击录音",onChange:this.handleReferenceAnswer}),
	    	React.createElement("a", {href: "javascript:void(0)", className: "delete-record", onClick: self.deleteQuestionOption, title: "删除录音"},
				React.createElement("img", {src: "/images/manage/delete-min.png", width: "16", height: "16", alt: "删除录音"})
			),
	    	React.createElement("label", {title: "考生答案和标准参考答案是否完全一致",className:'strict-match'}, 
                React.createElement("input", {type: "checkbox", name: "strict-match",defaultChecked:strict, onChange: this.handleStrictMatch}), 
                   	"是否严格匹配"
            )
    	);
	    return (
	    	answer_area
	    )
	  }
	});

	
	//试题出题完成按钮
	$('.item-finish-btn .complete-btn').click(function(){
		var flag = true;//提交之前的标记
		//提交之前判断大题题干、小题题干、小题选项是否都不为空
		$('.item-stem textarea, .question-stem input[type = "text"],.question-options input[type="text"]').each(function(){
			if(!$(this).attr('disabled') && $(this).val() == ''){
				alert('题干或者试题选项没有填写！');
				return false;
			}
		});

		//用来判断单选题和多选题是否都填写了正确答案
		var question_length = item.questions.length;//得到小题数量，根据radio的name属性判断是否单选和多选答案
		var val = '';var len = 0;
		for (var i = 0; i < question_length; i++) {
			val = $('#item-content input[name=question_'+i+']:checked').val();
			var len = $('#item-content input[name=question_'+i+']:checked').length;
			if(len!=0 && !val){
				alert('请填写正确答案aaa！');
				return false;
			}
		}

		//判断填空题，简答题答案是否填写
		$(".question-answer input,question-answer textarea").each(function(){
			if($(this).val() == ''){
				alert('请填写正确答案！');
				return false;
			}
		})
		
		//最终要出题的item的内容
		$itemStructure.val(JSON.stringify(item));

		//使用次数
		$('.question_usagecount').val(1);
	
		$('.form-add-question button').click();
		//console.log(JSON.stringify(item));
	});
});
