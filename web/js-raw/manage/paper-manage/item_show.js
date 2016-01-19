var item={};
//试题Item
var Item = React.createClass({
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
						?　<ItemStem 
							stem={item.stem} 
							showStemLength={item['show-stem-length']}/> 
						: '';

		//如果item选项存在，则插入ItemOptions
		var item_options = (options && options.length != 0) 
							? <ItemOptions 
								options={options} 
								hasSingleChoiceQuestion={hasSingleChoiceQuestion} 
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
		var hasSingleChoiceQuestion = this.props.hasSingleChoiceQuestion;
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
		}
		// else if(type == "SimpleAnswer") {
		// 	answer_area = <SimpleAnswer questionId={id} />
		// }else if(type == "BlankFilling") {
		// 	answer_area = <BlankFilling questionId={id} />
		// }
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
