$(function(){

  //删除
  singleDelete('question');

  //首先取到要渲染的id
  var questiontypeId= $('.question_sample').attr('id');

  //取到相应的json结构
  var questionTypeStructureId=$('.question_content').attr('id');
  console.log($('#'+questionTypeStructureId).text());
  var item=JSON.parse($('#'+questionTypeStructureId).text());
   /*var item = {
     "flowable":false,
     "shuffle":true,
     "stem":"此处为试题题干内容，题干中可以包括图片、音频以及视频等多媒体。",
     "show-stem-length":false,
     "questions-num-limit":true,
     "pre-show":true,
     "questions": [
        {
          "type":"SingleChoice",
          "stem":"此处为单选小题题干，题干内容可以包括图片、音频以及视频等多媒体。",
          "options":[
            "单选小题选项内容",
            "单选小题选项内容",
            "单选小题选项内容",
            "单选小题选项内容"
            ]
          }
        ]
    }*/
  //试题Item
var Item = React.createClass({displayName: "Item",
  getInitialState: function(){
    return {
      item: item
    }
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
              showStemLength: item['show-stem-length']}) 
            : '';

    //如果item选项存在，则插入ItemOptions
    var item_options = (options && options.length != 0) 
              ? React.createElement(ItemOptions, {
                options: options, 
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
      React.createElement("div", {className: "question-stem"},
        React.createElement("span", null, question.stem)
      ) 
      : '';

    //小题做答区域
    var answer_area;
    if(type == "SingleChoice") {
        answer_area = React.createElement(SingleChoice, {itemOptions: item_options, options: question.options, showQuestionsOptionsContent: showQuestionsOptionsContent})
    }else if(type == "MultipleChoice"){
    	answer_area = React.createElement(MultipleChoice, {options: question.options});
    }else if(type == "SimpleAnswer") {
      	answer_area = React.createElement(SimpleAnswer, null)
    }else if(type == "BlankFilling") {
      	answer_area = React.createElement(BlankFilling, null)
    }else if(type == "TrueOrFalse") {
      	answer_area = React.createElement(TrueOrFalse, {questionOrder:order});
    }else if(type == "Record") {
      	answer_area = React.createElement(Record, null);
    }

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

//小题Question中的答题区域部分————多选题
var MultipleChoice = React.createClass({displayName: "MultipleChoice",
  render: function() {
    var self = this;
    var options = this.props.options;
    return (
      React.createElement("ul", {className: "question-options"},
      
        options.map(function(option, i, a) {
          return (
            React.createElement("li", {className: ""}, 
              React.createElement("span", null, option)
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
      React.createElement("input", {className: "blank-filling", type: "text", placeholder:"请输入答案"})
    )
  }
});

//小题Question中的答题区域部分————简答题
var SimpleAnswer = React.createClass({displayName: "SimpleAnswer",
  render: function() {
    return (
      React.createElement("textarea", {className: "simple-answer", placeholder:"请输入答案"})
    )
  }
});

//小题Question中的答题区域部分————判断题
var TrueOrFalse = React.createClass({displayName: "TrueOrFalse",
  	
  render: function() {
  	var question_order = this.props.questionOrder;
  	return (
  		React.createElement("div",{className:'question-answer-truefalse'},
			React.createElement("input",{type:"radio",className:'true-option',name:"question_"+question_order,}),
			React.createElement("input",{type:"radio",className:'false-option',name:"question_"+question_order,})
		)
  	)
  }
});

//小题Question中的答题区域部分————录音题
var Record = React.createClass({displayName: "Record",
  render: function() {
    return (
    	React.createElement("input",{type:'button',value: "点击录音",className:'record-btn'})
    )
  }
});


  // 显示Item
  ReactDOM.render(
    React.createElement(Item, null),
    $('#'+questiontypeId)[0]
  );

})