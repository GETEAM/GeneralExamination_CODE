$(function(){

  //删除
  singleDelete('question_type');

  //首先取到要渲染的id
  var questiontypeId= $('.question_type_sample').attr('id');

  //取到相应的json结构
  var questionTypeStructureId=$('.question_type_structure').attr('id');

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
var Item = React.createClass({
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
            ?　<ItemStem 
              stem={item.stem} 
              showStemLength={item['show-stem-length']}/> 
            : '';

    //如果item选项存在，则插入ItemOptions
    var item_options = (options && options.length != 0) 
              ? <ItemOptions 
                options={options} 
                showOptionsOrderNum={showOptionsOrderNum} /> 
              : '';

    //如果存在questions，则插入Question
    var questions = (item.questions && item.questions.length != 0) 
          ? <Questions  
            questionsNumLimit={questionsNumLimit} 
            preShow={preShow} 
            itemOptions={options} 
            showQuestionsOptionsContent={showQuestionsOptionsContent}
            questions={item.questions}/> 
          : '';
    
    return (
      <div className="item">
        {item_stem}
        {item_options}
        {questions}
      </div>
    );
  }
});

//试题item题干
var ItemStem = React.createClass({
  render: function() {
    var showStemLength = this.props.showStemLength ? true : false;
    var stem = this.props.stem;

    return (
      <div className="item-stem">
        <div className="item-stem-area">
          <div className="item-stem-content">
            {stem}
            {
              showStemLength ? ('(' + stem.length + 'words)') : ''
            }
          </div>
        </div>
      </div>
    );
  }
});

// 试题item的options
var ItemOptions = React.createClass({
  render: function() {
    var self = this;
    var options = this.props.options;
    var showOptionsOrderNum = this.props.showOptionsOrderNum;
    var shuffle = this.props.shuffle;
    return (
      <div className="item-options">
          <div className="item-options-area">
            <ul className="item-options-list">
          {
            options.map(function(option, i, options) {
              return (
                <li className={ showOptionsOrderNum ? 'show-order-num' : 'no-order-num' }>
                  <span>{option}</span>
                </li>
              );
            })
          }
            </ul>
          </div>
        </div>
    )
  }
});

//试题item内的questions
var Questions = React.createClass({
  render: function() {
    var self = this;
    
    var questionsNumLimit = this.props.questionsNumLimit;

    var showQuestionsOptionsContent = this.props.showQuestionsOptionsContent;

    var preshow = this.props.preShow;

    var item_options = this.props.itemOptions;

    var questions = this.props.questions;

    return (
      <div className="item-questions">
        <div className="questions-area">
            <div className="questions">
            {
               questions.map(function( question, i, questions ){
                return (
                  <Question question={question} itemOptions={item_options} showQuestionsOptionsContent={showQuestionsOptionsContent} order={i}/>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
});

//试题item中包含的小题Question
var Question = React.createClass({
  render: function() {
    var self = this;
    var item_options = this.props.itemOptions;
    var question = this.props.question;
    var order = this.props.order;
    var type = question.type;
    var showQuestionsOptionsContent = this.props.showQuestionsOptionsContent;

    var question_stem = question.stem ? 
      <div className="question-stem">
        <span>{question.stem}</span>
      </div> 
      : '';

    //小题做答区域
    var answer_area;
    if(type == "SingleChoice") {
      answer_area = <SingleChoice itemOptions={item_options} options={question.options} showQuestionsOptionsContent={showQuestionsOptionsContent} questionOrder={order} />
    }else if(type == "SimpleAnswer") {
      answer_area = <SimpleAnswer />
    }else if(type == "BlankFilling") {
      answer_area = <BlankFilling />
    }

    return (
      <div className="question">
        {question_stem}
        {answer_area}
      </div>
    );
  }
});

//小题Question中的答题区域部分————单选题
var SingleChoice = React.createClass({
  render: function() {
    var self = this;

    var options = this.props.options;

    //小题选项是否显示
    var showQuestionsOptionsContent = this.props.showQuestionsOptionsContent;

    var itemOptions = this.props.itemOptions;

    //需要显示小题选项时，为小题选项，否则为试题选题
    options = showQuestionsOptionsContent ? options : itemOptions;

    return (
      <ul className="question-options">
      {
        options.map(function(option, i, a) {
          return (
            showQuestionsOptionsContent ?  
            <li className=''>
              <span>{option}</span> 
            </li>
            : 
            <li className={showQuestionsOptionsContent ? '' : 'inline'} title="与试题选项相关联的小题选项，无法进行其他操作">
            </li> 
          )
        })
      }
      </ul>
    )
  }
});

//小题Question中的答题区域部分————填空题
var BlankFilling = React.createClass({
  render: function() {
    return (
      <input className="blank-filling" type="text" disabled />
    )
  }
});

//小题Question中的答题区域部分————简答题
var SimpleAnswer = React.createClass({
  render: function() {
    return (
      <textarea className="simple-answer" disabled />
    )
  }
});


  // 显示Item
  ReactDOM.render(
    <Item />,
    $('#'+questiontypeId)[0]
  );

})