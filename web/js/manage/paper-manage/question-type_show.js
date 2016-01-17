$(function(){
	//首先取到要渲染的id
	var questiontypeId= $('.question_type_sample').attr('id');

	Array.prototype.shuffle = function() {
      var newArr = [];
      for( var i = 0, len = this.length; i < len; i++ ){
        newArr.push(this[i]);
      }
      for( var i = 0, newLen = newArr.length; i < newLen; i++ ){
        var random = Math.floor( Math.random() * newLen );
        var temp = newArr[random];
        newArr[random] = newArr[i];
        newArr[i] = temp;
      }
      console.log(newArr);
      return newArr;
    }
    /*这里有一个分开*/
	var capitalLetterArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    var PartOrderNum = 1;
    var QuestionOrderNum = 1;

    window.answer = localStorage['answer'] ? JSON.parse(localStorage['answer']) : {};

    var item={
          "id": 1,
          "stem": "there are four choice ,please choose the best one",
          "questions":[
             {
               "type": "SingleChoice",
               "shuffle": true,
               "options": [
                   "The man is not good at balancing his budget.",
                   "She will go purchase the gift herself.",
                   "The gift should not be too expensive.",
                   "They are gonging to Jane's house-warming party."
                 ],
                 "strict": true,
               "reference-answer": 0,
               "answer-analysis": "答案解析"
             }
           ]
       }

    
    //小题Question中的答题区域部分————单选题
    var SingleChoice = React.createClass({
      handleChange: function(event) {
        var question_id = this.props.questionId;
        var newValue = event.target.checked ? event.target.value : '';

        answer[question_id] = newValue;
        //  //将答案存入localstorage  
        localStorage.setItem('answer', JSON.stringify(answer));       
      },
      render: function() {
        var self = this;
        var options = this.props.options;
        var question_id = this.props.questionId;
        var show_option = this.props.showOption;
        var answer_area = [];
        var question_answer = answer[question_id] || '';

        var answer_area = options.map(function(option, i, a) {
          return (
            <label className={'question-option ' + ( show_option ? 'block' : 'inline' )}>
              <input type="radio" name={question_id} value={option} defaultChecked={question_answer == option} onChange={self.handleChange} />
              <span className={'option' + ( show_option ? ' show-option' : ' hide-option' )}>
                <span className="option-content">{show_option ? option : ''}</span>
              </span>
            </label>
          )
        });
        /****************选项是否打乱顺序尚未做处理*********************/
        return (
          <div className="answer-area">
            {show_option ? answer_area.shuffle() : answer_area}
          </div>
        )
      }
    });

    //小题Question中的答题区域部分————填空题
    var BlankFilling = React.createClass({
      handleChange: function(event) {
        var question_id = this.props.questionId;
        var newValue = event.target.value;
        answer[question_id] = newValue;
        //  //将答案存入localstorage  
        localStorage.setItem('answer', JSON.stringify(answer));
      },
      render: function() {
        var question_id = this.props.questionId;
        var question_answer = answer[question_id] || '';
        var answer_area = <input type="text" placeholder="请输入答案" defaultValue={question_answer} onChange={this.handleChange} />;
        return (
          <div className="answer-area">
            {answer_area}
          </div>
        )
      }
    });

    //小题Question中的答题区域部分————简答题
    var SimpleAnswer = React.createClass({
      handleChange: function(event) {
        var question_id = this.props.questionId;
        var newValue = event.target.value;
        answer[question_id] = newValue;
        //  //将答案存入localstorage  
        localStorage.setItem('answer', JSON.stringify(answer));
      },
      render: function() {
        var question_id = this.props.questionId;
        var question_answer = answer[question_id] || '';
        var answer_area = <textarea placeholder="请输入答案" defaultValue={question_answer} onChange={this.handleChange}></textarea>;
        return (
          <div className="answer-area">
            {answer_area}
          </div>
        )
      }
    });

    //试题item中包含的小题Question
    var Question = React.createClass({
      render: function() {
        var item_options = this.props.itemOptions;
        var question = this.props.question;
        var id = this.props.id;
        var type = question.type;

        var question_stem = question.stem 
          ? <div className="question-stem">{question.stem}</div> 
          : '';
        var answer_area;

        //当item_options存在时，小题默认为单选题
        if(item_options) {
          //展示选项时，是否展示选项内容
          var showOption = false;
          answer_area = <SingleChoice options={item_options} questionId={id} showOption={showOption} />
        }else {
        //当item_options不存在时，判断小题类型，再做相应处理
          if(type == "SingleChoice") {
            //展示选项时，是否展示选项内容
            var showOption = true;
            answer_area = <SingleChoice options={question.options} questionId={id} showOption={showOption} />
          }else if(type == "SimpleAnswer") {
            answer_area = <SimpleAnswer questionId={id} />
          }else if(type == "BlankFilling") {
            answer_area = <BlankFilling questionId={id} />
          }
        }

        return (
          <div id={id} className="question">
            <div className="question-content">
              {question_stem}
              {answer_area}
            </div>
          </div>
        );
      }
    });

    //试题item内的questions
    var Questions = React.createClass({
      render: function() {
        var item_options = this.props.itemOptions;
        var questions = this.props.questions;
        var item_id = this.props.itemId;

        var questionsArr = questions.map(function( question, i, questions ){
          return (
            <Question question={question} itemOptions={item_options} id={item_id + '_' + i} />
          );
        });
        return (
          <div className="questions">
            {questionsArr}
          </div>
        );
      }
    });

    //试题item题干
    var ItemStem = React.createClass({
      render: function() {
        //题干的长度
        var length = this.props.length ? '(' + this.props.length + " words)" : "";
        //判断item的题干长度是否显示
        var show_length = this.props.showLength ? true : false;
        var stem = {
          '__html': this.props.stem + (show_length ? length : '')
        }
        return (
          <div className="item-stem" dangerouslySetInnerHTML={stem}></div>
        );
      }
    }); 

    //试题item的options
    var ItemOptions = React.createClass({
      optionsToTableRows: function() {
        /*将item的options转化为表格的形式展示，该函数将options变为表格的rows*/
        var options = this.props.options;
        var tableRows = [];

        for( var i = 0, len = options.length; i < len; i = i + 2 ){
          var td2 = options[i+1] ? <td>{options[i+1]}</td> : '';
          var tempRow = 
            <tr>
              <td>{options[i]}</td>
              {td2}
            </tr>;
          tableRows.push(tempRow);
        }

        return tableRows;
      },
      render: function() {
        var options = this.props.options;
        return (
          <table className="table table-bordered table-striped table-condensed item-options">
            <tbody>
              {this.optionsToTableRows()}
            </tbody>
          </table>
        )
      }
    });

    //试题item框
    var Item  = React.createClass({
      render: function() {
        var item = this.props.item;

        //shuffle指定item的options是否打乱
        var shuffle = item.shuffle ? true : false;

        //因为item的options的顺序打乱，会关系到questions选项的打乱，所以item的options在这个地方做处理
        var options = item.options 
                ? ( shuffle ? item.options.shuffle() : item.options ) 
                : ''; 

        //如果item选项存在，则插入ItemOptions
        var item_options = options ?　<ItemOptions options={options} /> : '';

        return (
          <div className="item">
            <ItemStem stem={item.stem} length={item.length} showLength={item.showLength} />
            {item_options}
            <Questions questions={item.questions} itemOptions={options} itemId={item.id} /> 
          </div>
        );
      }
    });
    
    ReactDOM.render(
      <Item item={item} />,
      document.getElementById(questiontypeId)
    );


})