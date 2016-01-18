$(function(){

	//删除
	singleDelete('question_type');

	//首先取到要渲染的id
	var questiontypeId= $('.question_type_sample').attr('id');
	//取到相应的json结构

	var questionTypeStructureId=$('.question_type_structure').attr('id');

	var item2=$('#'+questionTypeStructureId).text();
	var item1=JSON.parse(item2);
       /*var item = {
	       "flowable":false,
	       "shuffle":true,
	       "stem":"此处为试题题干内容，题干中可以包括图片、音频以及视频等多媒体。",
	       "show-stem-length":false,
	       "questions-num-limit":true,
	       "pre-show":true,
	       "questions":	[
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

    //显示每个question里面的选项
    var Options = React.createClass({displayName: "Options",
    	render: function(){
    		var options=this.props.options;

    	var option=options.map(function(option,i,options){
    		return (React.createElement("div", {className: "option"}, option))
    	})
    	return (
    		React.createElement("div", null, 
    		option
    		)
    		);
    	}
    	
    });
    //试题item中包含的小题Question
    var Question = React.createClass({displayName: "Question",
      render: function() {
        var item_options = this.props.itemOptions;
        var question = this.props.question;
        var type = question.type;

        var question_stem = question.stem 
          ? React.createElement("div", {className: "question-stem"}, question.stem) 
          : '';

        return (
          React.createElement("div", {className: "question"}, 
            React.createElement("div", {className: "question-content"}, 
              question_stem
            ), 
            React.createElement("div", {className: "question-option"}, 
            	React.createElement(Options, {options: question.options})
            )
          )
        );
      }
    });

    //试题item内的questions
    var Questions = React.createClass({displayName: "Questions",
      render: function() {
        var item_options = this.props.itemOptions;
        var questions = this.props.questions;

        var questionsArr = questions.map(function( question, i, questions ){
          return (
            React.createElement(Question, {question: question, itemOptions: item_options})
          );
        });
        return (
          React.createElement("div", {className: "questions"}, 
            questionsArr
          )
        );
      }
    });

    //试题item题干
    var ItemStem = React.createClass({displayName: "ItemStem",
      render: function() {
        var stem = {
          '__html': this.props.stem
        }
        return (
          React.createElement("div", {className: "item-stem", dangerouslySetInnerHTML: stem})
        );
      }
    }); 

    //试题item的options
    var ItemOptions = React.createClass({displayName: "ItemOptions",
      optionsToTableRows: function() {
        /*将item的options转化为表格的形式展示，该函数将options变为表格的rows*/
        var options = this.props.options;
        var tableRows = [];

        for( var i = 0, len = options.length; i < len; i = i + 2 ){
          var td2 = options[i+1] ? React.createElement("td", null, options[i+1]) : '';
          var tempRow = 
            React.createElement("tr", null, 
              React.createElement("td", null, options[i]), 
              td2
            );
          tableRows.push(tempRow);
        }

        return tableRows;
      },
      render: function() {
        var options = this.props.options;
        return (
          React.createElement("table", {className: "table table-bordered table-striped table-condensed item-options"}, 
            React.createElement("tbody", null, 
              this.optionsToTableRows()
            )
          )
        )
      }
    });

    //试题item框
    var Item  = React.createClass({displayName: "Item",
      render: function() {
        var item = this.props.item;

        //shuffle指定item的options是否打乱
        var shuffle = item.shuffle ? true : false;

        //因为item的options的顺序打乱，会关系到questions选项的打乱，所以item的options在这个地方做处理
        var options = item.options 
                ? ( shuffle ? item.options.shuffle() : item.options ) 
                : ''; 

        //如果item选项存在，则插入ItemOptions
        var item_options = options ?　React.createElement(ItemOptions, {options: options}) : '';

        return (
          React.createElement("div", {className: "item"}, 
            React.createElement(ItemStem, {stem: item.stem}), 
            item_options, 
            React.createElement(Questions, {questions: item.questions, itemOptions: options})
          )
        );
      }
    });
    
    ReactDOM.render(
      React.createElement(Item, {item: item1}),
      document.getElementById(questiontypeId)
    );


})