$(function(){
	//提示框初始化
	$(document).tooltip();

	var deepCopy= function clone(obj){  
	    var o;  
	    switch(typeof obj){  
	    case 'undefined': break;  
	    case 'string'   : o = obj + '';break;  
	    case 'number'   : o = obj - 0;break;  
	    case 'boolean'  : o = obj;break;  
	    case 'object'   :  
	        if(obj === null){  
	            o = null;  
	        }else{  
	            if(obj instanceof Array){  
	                o = [];  
	                for(var i = 0, len = obj.length; i < len; i++){  
	                    o.push(clone(obj[i]));  
	                }  
	            }else{  
	                o = {};  
	                for(var k in obj){  
	                    o[k] = clone(obj[k]);  
	                }  
	            }  
	        }  
	        break;  
	    default:          
	        o = obj;break;  
	    }  
	    return o;     
	}

	var item = {	
	};

	var $item_structure = $('.item-structure textarea');

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
			$item_structure.val(JSON.stringify(item));
		},
		render: function() {
			var item = this.state.item;

			var options = item.options;

			//该值默认为true
			var showOptionsOrderNum = item['show-options-order-num'] === false ? false : true;

			var shuffle = item.shuffle ? item.shuffle : false;

			//该值默认为true
			var questionsNumLimit = item['questions-num-limit'] === false ? false : true;

			//该值默认为true
			var preShow = item['pre-show'] === false ? false : true;

			//如果item题干存在，则插入ItemStem
			var item_stem = item.stem ?　<ItemStem stem={item.stem} showStemLength={item['show-stem-length']} changeItemState={this.handleChangeState} /> : '';

			//如果item选项存在，则插入ItemOptions
			var item_options = (options && options.length != 0) ?　<ItemOptions options={options} shuffle={shuffle} showOptionsOrderNum={showOptionsOrderNum} changeItemState={this.handleChangeState} /> : '';

			//如果存在questions，则插入Question
			var questions = (item.questions && item.questions.length != 0) 
						? <Questions  questionsNumLimit={questionsNumLimit} preShow={preShow} questions={item.questions} itemOptions={options} changeItemState={this.handleChangeState}/> 
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
		handelShowStemLengthChange: function(event) {
			var showStemLength = event.target.checked;
			//改变item的show-stem-length
			item['show-stem-length'] = showStemLength;
			//改变item state
			this.props.changeItemState();
		},
		deleteItemStem: function(event) {
			//此处手动移出鼠标，否则tooltips不会消失
			$(event.target).mouseout();
			//删除item的stem属性
			delete item.stem;
			//改变item state
			this.props.changeItemState();
		},
		render: function() {
			var showStemLength = this.props.showStemLength ? true : false;
			var stem = this.props.stem;

			return (
				<div className="item-stem">
					<div className="title">试题题干</div>
					<div className="item-stem-area">
						<div className="params">
							<label title="选中此选项则显示题干包含的字数，反之不显示。该参数在具体试题内可作修改！">
								<input type="checkbox" name="show-stem-length" defaultChecked={showStemLength} onChange={this.handelShowStemLengthChange} />
								显示题干字数
							</label>
						</div>
						<div className="item-stem-content">
							{stem}
							{
								showStemLength ? ('(' + stem.length + 'words)') : ''
							}
							<a href="javascript:void(0)" className="delete-item-stem" onClick={this.deleteItemStem} title="删除试题题干" >
								<img src="/images/manage/delete-min.png" width="16" height="16" alt="删除试题题干" />
							</a>
						</div>
					</div>
				</div>
			);
		}
	});

	// 试题item的options
	var ItemOptions = React.createClass({
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
		handelShowOptionsOrderNum: function(event) {
			var showOptionsOrderNum = event.target.checked;
			//改变item的show-stem-length
			item['show-options-order-num'] = showOptionsOrderNum;
			//改变item state
			this.props.changeItemState();
		},
		handelShuffle: function(event) {
			var shuffle = event.target.checked;
			//改变item的show-stem-length
			item.shuffle = shuffle;
			//改变item state
			this.props.changeItemState();
		},
		render: function() {
			var self = this;
			var options = this.props.options;
			var showOptionsOrderNum = this.props.showOptionsOrderNum;
			var shuffle = this.props.shuffle;
			return (
				<div className="item-options">
	    			<div className="title">试题选项</div>
	    			<div className="item-options-area">
	    				<div className="params">
	    					<label title="选中此选项则显示选项序号，反之不显示。该参数在具体试题内不可作修改！">
                            	<input type="checkbox" name="show-options-order-num" defaultChecked={showOptionsOrderNum} onChange={this.handelShowOptionsOrderNum} />
                           		显示试题选项序号
                        	</label>
                        	<label title="选中此选项则打乱选项，反之不打乱。该参数在具体试题内可作修改！">
                            	<input type="checkbox" name="options-shuffle" defaultChecked={shuffle} onChange={this.handleShuffle} />
                           		打乱试题选项顺序
                        	</label>
	    				</div>
		    			<ul className="item-options-list">
						{
							options.map(function(option) {
								return (
									<li className={ showOptionsOrderNum ? 'show-order-num' : 'no-order-num' }>
										<span>{option}</span>
										<a href="javascript:void(0)" className="delete-item-option" onClick={self.deleteItemOption} title="删除试题选项" >
											<img src="/images/manage/delete-min.png" width="16" height="16" alt="删除试题选项"/>
										</a>
										<a href="javascript:void(0)" className="add-item-option-a" onClick={self.addItemOption}  title="添加试题选项">
											<img src="/images/manage/add-min.png" width="16" height="16" alt="添加试题选项" />
										</a>
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
		handelQuestionsNulLimit: function() {
			var questionsNumLimit = event.target.checked;
			//改变item的show-stem-length
			item['questions-num-limit'] = questionsNumLimit;
			//改变item state
			this.props.changeItemState();
		},
		handelPreShow: function() {
			var preShow = event.target.checked;
			//改变item的show-stem-length
			item['pre-show'] = preShow;
			//改变item state
			this.props.changeItemState();
		},
		render: function() {
			var self = this;
			
			var questionsNumLimit = this.props.questionsNumLimit;

			var preshow = this.props.preShow;

			var item_options = this.props.itemOptions;

			var questions = this.props.questions;

			return (
				<div className="item-questions">
					<div className="title">试题题干</div>
					<div className="questions-area">
	    				<div className="params">
	    					<label title="选中此选项则限制小题数量，反之不限制。不限制小题数量的题型，在添加具体试题时，可以以任一小题为模板额外增加小题。该参数在具体试题内不可作修改！">
                            	<input type="checkbox" name="questions-num-limit" defaultChecked={questionsNumLimit} onChange={this.handelQuestionsNulLimit} />
                           		限制小题数量
                        	</label>
                        	<label title="选中此选项则提前显示各小题，反之不提前显示。该参数在具体试题内可作修改！">
                            	<input type="checkbox" name="pre-show" defaultChecked={preshow} onChange={this.handelPreShow} />
                           		提前显示各小题
                        	</label>
	    				</div>
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
			item.questions[order].stem = "此处为单选小题题干，题干内容可以包括图片、音频以及视频等多媒体。";

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

			var question_stem = question.stem ? 
				<div className="question-stem">
					<span>{question.stem}</span>
					<a href="javascript:void(0)" className="delete-question-stem-a" onClick={this.deleteQuestionStem} title="删除小题题干">
						<img src="/images/manage/delete-min.png" width="16" height="16" alt="删除小题题干" />
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
					<div className="question-operations">
						<a href="javascript:void(0)" className="delete-question-a" onClick={this.deleteQuestion} title="删除小题">
							<img src="/images/manage/delete-min.png" width="16" height="16" alt="删除小题" />
						</a>
						{
							!question_stem ? 
							<a href="javascript:void(0)" className="add-question-stem-a" onClick={this.addQuestionStem} title="添加小题题干">
								<img src="/images/manage/add-stem.png" width="16" height="16" alt="添加小题题干" />
							</a>
							: ""
						}
						<a href="javascript:void(0)" className="add-question-a" onClick={this.addQuestionFromCurrent} title="添加小题">
							<img src="/images/manage/add-min.png" width="16" height="16" alt="添加小题" />
						</a>
					</div>
					{question_stem}
					{answer_area}
				</div>
			);
		}
	});

	//小题Question中的答题区域部分————单选题
	var SingleChoice = React.createClass({
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

			return (
				<ul className="question-options">
				{
					options.map(function(option, i, a) {
						return (
							<li>
								<span>{option}</span>
								{
									a.length > 2 
									? 
									<a href="javascript:void(0)" className="delete-question-option" onClick={self.deleteQuestionOption} title="删除小题选项" >
										<img src="/images/manage/delete-min.png" width="16" height="16" alt="删除小题选项"/>
									</a>
									: ""
								}
								<a href="javascript:void(0)" className="add-question-option" onClick={self.addQuestionOption} title="添加小题选项" >
									<img src="/images/manage/add-min.png" width="16" height="16" alt="添加小题选项"/>
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


	/*添加删除题干*/
	$('.add-item-stem').click(function() {
		//添加试题题干
		var new_item_stem = '此处为试题题干内容，题干中可以包括图片、音频以及视频等多媒体。';

		item.stem = new_item_stem

		$item_structure.val(JSON.stringify(item));

		//重新渲染Item
		ReactDOM.render(
			<Item />,
			$('#item-area')[0]
		);
	});

	/*添加删除试题选项*/
	//点击添加试题选项时，添加试题选项
	$('.add-item-option').click(function() {
		//添加试题选项
		var new_item_stem = '试题选项内容';

		//如果item中不存在options，设为空数组
		item.options = item.options ? item.options : [];
		item.options.push(new_item_stem);

		$item_structure.val(JSON.stringify(item));

		//重新渲染Item
		ReactDOM.render(
			<Item />,
			$('#item-area')[0]
		);
	});

	/*添加单选小题*/
	$('.add-single-choice').click(function(){
		var new_question = {
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
		};
		//如果item中不存在questions，设为空数组
		item.questions = item.questions ? item.questions : [];
		item.questions.push(new_question);

					$item_structure.val(JSON.stringify(item));


		//重新渲染Item
		ReactDOM.render(
			<Item />,
			$('#item-area')[0]
		);
	});

});
