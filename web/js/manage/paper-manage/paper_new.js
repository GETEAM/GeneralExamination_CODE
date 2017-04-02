$(function(){

	//点击title可以隐藏或显示下面的内容
	$('.title').unbind().click(function(event) {
		if(event.target.tagName != 'A' && event.target.tagName != 'IMG'){
			$(this).toggleClass('close').next().toggle();					
		}
	});



	//初始化的时候通过ajax获取到question的列表
	var itemlists = {};
	$.ajax({
	    type: 'GET',
	    url: '../paper/questionGet',
	    dataType: 'json',
	    async: true,
	    success: function (data) {
	    	itemlists = JSON.parse(data);
	    	// 显示Item
	    	ReactDOM.render(
				React.createElement(Paper, null),
				$('#paper-content')[0]
			);
	    },
	    error: function (XMLHttpRequest, textStatus, errorThrown) {
	        console.log("error " + textStatus);
	        console.log("网络或服务器异常！" + 'ERROR');

	        //网络或服务器异常！无法获取题型结构相关！给予提示
	        var $warning_message = $('<div>').html('网络或服务器异常！无法获取试题相关！').addClass('notice error');
	        $('.flash-message').append($warning_message);
	    }
	});
var handleDeleteQuestion = function(){
		console.log('aaa');
	}

	//初始化,paper初始化的时候至少包含一个group,一个part，一个section
	var paper={
	    "question-option-shuffle": true,
	    "groups": [
	       {
	         "duration": 600,
	         "parts": [
	           {
	             "name": "Writing",
	             "flowable": false,
	             "duration": 30,
	             "sections": [
	               {
	                 "direction": "direction",
	                 "shuffle": "section内的item顺序是否乱序",
	                 "items": [
	                 ]
	               }
	             ]
	           }
	         ]
	       }
	     ]
	   }

	//试卷结构区域赋值初始化
	var $paper_structure = $('.paper-structure textarea');
	$paper_structure.val(JSON.stringify(paper));


	
	var Paper = React.createClass({displayName: "Paper",
		getInitialState: function(){
			return {
				paper: paper
			}
		},
		handleChangeState: function(){
			this.setState({
				paper:paper
			});
			$paper_structure.val(JSON.stringify(paper));
		},
		render: function(){
			var paper = this.state.paper;

			return (
				React.createElement('div',{className: 'paper'},
					React.createElement(Groups, {
						groups:paper.groups,
						changePaperState:this.handleChangeState
					})
				)
			)
		}
	});

	var Groups = React.createClass({displayName: 'Groups',
		render:function() {
			var self = this;
			var groups = this.props.groups;
			return (
				React.createElement('div',{className: 'groups'},
					groups.map(function(group, i ,groups){
						return (
							React.createElement(Group,{group: group,groupOrder: i, key:i, changePaperState: self.props.changePaperState})
						)
					})
				)
			)
		}
	});

	var Group = React.createClass({displayName: 'Group',
		addGroupFromCurrent: function() {
			var group = this.props.group;
			var groupOrder = this.props.groupOrder;
			//复制当前group
			var new_group = deepCopy(group);

			//复制的时候不能将选中的题也复制过去
		    for(var i in new_group.parts){ 
		    	var secObj = new_group.parts[i].sections;
		     	//console.log(new_group.parts[i].sections);
		    	for (var j in secObj) {
		    		secObj[j].items=[];
		    	}
		    }

		    itemNameLists = {};//试题名称和name的键值对，每次添加的时候都需要清空一下

			//插入到新的group
			paper.groups.push(new_group);

			this.props.changePaperState();
		},
		deleteGroup: function(event) {
			$(event.target).mouseout();
			var groupOrder = this.props.groupOrder;
			paper.groups.splice(groupOrder,1);

			this.props.changePaperState();
		},
		handleGroupDuration: function(event){
			var group = this.props.group;
			group.duration = event.target.value;
			this.props.changePaperState();
		},
		render: function() {
			var self = this;
			var group = this.props.group;
			var groupOrder = this.props.groupOrder;
			return (
				React.createElement('div',{className: 'group'},
					React.createElement('div',{className: 'group-operations'},
						groupOrder > 0 ?
						React.createElement("a", {href: "javascript:void(0)", className: "delete-group-option", onClick: self.deleteGroup, title: "删除group"},
							React.createElement("img", {src: "/images/manage/delete-min.png", width: "16", height: "16", alt: "删除group"})
						)
						:
						React.createElement("a", {href: "javascript:void(0)", className: "delete-group-option", title: "无法删除，group不能少于一个"},
							React.createElement("img", {src: "/images/manage/delete-disabled.png", width: "16", height: "16", alt: "无法删除，group不能少于一个"})
						),
						React.createElement("a", {href: "javascript:void(0)", className: "add-group-option", onClick: self.addGroupFromCurrent, title: "添加group"},
							React.createElement("img", {src: "/images/manage/add-min.png", width: "16", height: "16", alt: "添加group"})
						)
					),
					React.createElement('div',{className: 'group-title'},
						React.createElement('span',{className:'tag'},'Group'),
						React.createElement('label',null,
							'该group时长：',
							React.createElement('input',{type:'text',placeholder:'该group的时长，分钟',onChange:this.handleGroupDuration})
						)
					),
					React.createElement(Parts, {
						parts:group.parts,
						changePaperState:self.props.changePaperState
					})
				)
			) 
		}

	});

	var Parts = React.createClass({displayName:Parts,
		render: function(){
			var self = this;
			var parts = this.props.parts;
			return (
				React.createElement('div',{className: 'parts'},
					parts.map(function(part, i ,parts){
						return (
							React.createElement(Part,{part: part,parts:parts,partOrder: i,key:i, changePaperState: self.props.changePaperState})
						)
					})
				)
			)
		}
	});

	var Part = React.createClass({displayName: 'Part',
		addPartFromCurrent: function(){
			var part = this.props.part;
			var partOrder = this.props.partOrder;
			//复制当前part
			var new_part = deepCopy(part);

			//复制的时候不能将选中的题也复制过去
		    for(var i in new_part.sections){  
		        new_part.sections[i].items=[];
		    }  
			
		    itemNameLists = {};//试题名称和name的键值对，每次添加的时候都需要清空一下

			//插入到新的part
			var parts = this.props.parts;
			parts.push(new_part);

			this.props.changePaperState();
		},
		deletePart: function(event){
			$(event.target).mouseout();
			var partOrder = this.props.partOrder;

			//插入到新的part
			var parts = this.props.parts;
			parts.splice(partOrder, 1);

			this.props.changePaperState();
		},
		handlePartName: function(event) { //part名字
			var part = this.props.part;
			part.name = event.target.value;
			this.props.changePaperState();
		},
		handlePartShuffle: function(event){
			var part = this.props.part;
			part.shuffle = event.target.checked;
			this.props.changePaperState();
		},
		handlePartDuration: function(event) {
			var part = this.props.part;
			part.duration = event.target.value;
			this.props.changePaperState();
		},
		render: function(){
			var self = this;
			var part = this.props.part;
			var partOrder = this.props.partOrder;
			//part自带属性包括名称，流程性判断和时间
			var partSelfProperty = React.createElement('div',{className:'part-property'},
				React.createElement('label',null,
					'Part名称：',
					React.createElement('input',{type: 'text', placeholder: '输入part名称',onChange:self.handlePartName})
				),
				React.createElement('label',null,
					'流程性：',
					React.createElement('input',{type: 'checkbox', title: '该part是否是流程性试题',onChange:self.handlePartShuffle})
				),
				React.createElement('label',null,
					'Part时长：',
					React.createElement('input',{type: 'text', placeholder: '输入part时长，分钟',onChange:self.handlePartDuration})
				)
			);
			
			return (
				React.createElement('div',{className:'part'},
					React.createElement('div',{className: 'part-operations'},
						partOrder > 0 ?
						React.createElement("a", {href: "javascript:void(0)", className: "delete-part-option", onClick: self.deletePart, title: "删除part"},
							React.createElement("img", {src: "/images/manage/delete-min.png", width: "16", height: "16", alt: "删除part"})
						)
						:
						React.createElement("a", {href: "javascript:void(0)", className: "delete-part-option", title: "无法删除，part不能少于一个"},
							React.createElement("img", {src: "/images/manage/delete-disabled.png", width: "16", height: "16", alt: "无法删除，part不能少于一个"})
						),
						React.createElement("a", {href: "javascript:void(0)", className: "add-part-option", onClick: self.addPartFromCurrent, title: "添加part"},
							React.createElement("img", {src: "/images/manage/add-min.png", width: "16", height: "16", alt: "添加part"})
						)
					),
					React.createElement('div',{className:'part-title'},
						React.createElement('span',{className: 'part-order'}),
						partSelfProperty
					),
					React.createElement(Sections, {
						sections:part.sections,
						changePaperState:self.props.changePaperState
					})
				)
			);			
		}
	});

	var Sections = React.createClass({displayName:Sections,
		render: function(){
			var self = this;
			var sections = this.props.sections;
			return (
				React.createElement('div',{className: 'sections'},
					sections.map(function(section, i ,sections){
						return (
							React.createElement(Section,{section: section,sections:sections,sectionOrder: i,key:i, changePaperState: self.props.changePaperState})
						)
					})
				)
			)
		}
	});

	var Section = React.createClass({displayName: 'Section',
		addSectionFromCurrent: function(){
			var section = this.props.section;
			var sectionOrder = this.props.sectionOrder;
			
			//复制当前section
			var new_section = deepCopy(section);
			//但是这个并不需要复制item选项，所以清空重新添加
			new_section.items = [];

			itemNameLists = {};//试题名称和name的键值对，每次添加的时候都需要清空一下

			//插入到新的section
			var sections = this.props.sections;
			sections.push(new_section);

			

			this.props.changePaperState();
		},
		deleteSection: function(){
			$(event.target).mouseout();
			var sectionOrder = this.props.sectionOrder;

			//插入到新的section
			var sections = this.props.sections;
			sections.splice(sectionOrder, 1);

			this.props.changePaperState();
		},
		handleDirection: function(event) { //direction是指这一部分的题目描述
			var section = this.props.section;
			section.name = event.target.value;
			this.props.changePaperState();
		},
		render: function(){
			var self = this;
			var section = this.props.section;
			var sectionOrder = this.props.sectionOrder;		

			return (
				React.createElement('div',{className:'section'},
					React.createElement('div',{className: 'section-operations'},
						sectionOrder > 0 ?
						React.createElement("a", {href: "javascript:void(0)", className: "delete-section-option", onClick: self.deleteSection, title: "删除section"},
							React.createElement("img", {src: "/images/manage/delete-min.png", width: "16", height: "16", alt: "删除section"})
						)
						:
						React.createElement("a", {href: "javascript:void(0)", className: "delete-section-option", title: "无法删除，section不能少于一个"},
							React.createElement("img", {src: "/images/manage/delete-disabled.png", width: "16", height: "16", alt: "无法删除，section不能少于一个"})
						),
						React.createElement("a", {href: "javascript:void(0)", className: "add-section-option", onClick: self.addSectionFromCurrent, title: "添加section"},
							React.createElement("img", {src: "/images/manage/add-min.png", width: "16", height: "16", alt: "添加section"})
						)
					),
					React.createElement('div', {className:'section-title'},
						React.createElement('span',{className: 'tag section-order'}),
						React.createElement('div',{className:'section-property'},
							React.createElement('label',null,
								'direction',
								React.createElement('input',{type: 'text', placeholder: 'direction即题目',onChange:self.handleDirection})
							)
						)
					),
					React.createElement(Items, {
						items:section.items,
						changePaperState:self.props.changePaperState
					})
				)
			);			
		}
	});


	var itemNameLists = {};//试题名称和name的键值对，为了删除

	//items
	var Items = React.createClass({displayName:Items,
		handleTitleClick: function(event){
			$(event.target).toggleClass('close').next().toggle();					
		},
		handleQuestionAdd:function(event){
			$(event.target).mouseout();
			//获得父元素
			var $questionTr = $(event.target).parents('tr');

			//得到基本信息
			
			var questionContent = '';//试题内容
			var questionName = '';//试题名称
			var questionId = '';//试题id
			var itemObj = {};//试题内容字符串和对象之间的转换
			
			//获取到对应试题的json内容文件，从试卷的json文件取出
			questionContent = $questionTr.find('td.question_content').text();
			//将name从list列表中删除
			questionName = $questionTr.find('td.question_name').text();
			//获取对应的question id放到试题json文件中
			questionId = $questionTr.find('.question_id').text();

			//之前试题存储的时候内容中一直没有添加id这个字段，但其实这个是在试卷存储答案的时候要的
			itemObj = JSON.parse(questionContent);

			itemObj.id = questionId;

			questionContent = JSON.stringify(itemObj);

			//将试题内容插入到item中
			var items = this.props.items;
			var order = 1;
			items.push(questionContent);

			//键值对赋值
			itemNameLists[questionId] = questionName;
			var itemProperty = $questionTr.parents('.item').find('.item-property');//查找到需要添加的位置

			//动态生成name标签
			var html = '';
			for(var x in itemNameLists){
				html+='<div class="nameDiv" id=item-'+x+'><span class = "item-name">'+itemNameLists[x]+'</span><a href="javascript:void(0)" class="delete-question" value = '+x
				+' title="删除question"><img src="/images/manage/delete-min.png" width="16" height="16" alt="删除question" /></a></div>';
	        }
	        itemProperty.html('');//清空之后添加最新的。也可以通过插入元素实现
	        itemProperty.html(html);

	        //对新添加的name之后a标签的点击事件，用来删除
	        itemProperty.find('a').each(function(){
	        	$(this).click(function(){
	        		var id = $(this).attr('value');//获取要删除的id号
	        		var deleteTr = $(this).parents('.item').find('.questionlist #'+id);//找到对应删除的tr
	        		deleteTr.removeClass('selected');

	        		delete itemNameLists[$(this).attr('value')];//从选中的中删除对象
	        		itemProperty.find('#item-'+id).remove();//从name列表中删除

	        		//从item中删除content
	        		//获取到对应试题的json内容文件，从试卷的json文件取出
					questionContent = deleteTr.find('td.question_content').text();
					itemObj = JSON.parse(questionContent);
					itemObj.id = id;
					questionContent = JSON.stringify(itemObj);
					//遍历item,然后进行删除
					for(var i=0; i<items.length; i++) {
				    	if(items[i] == questionContent) {
				     		items.splice(i, 1);
				      		break;
				    	}
				  	}

	        	})
	        });

			//添加类改变tr的颜色
			if (!$questionTr.hasClass('selected')) {
				$questionTr.addClass('selected');
			}
			
			this.props.changePaperState();
		},
		render: function(){
			var self = this;
			var items = this.props.items;
			
			var tablehead = <thead>
				            <tr>
				                <th>编号</th>
				                <th>类型名称</th>
				                <th>试题名</th>
				                <th>流程性</th>
				                <th>生成时间</th>
				                <th>分数</th>
				                <th>使用次数</th>
				                <th>试题用时</th>
				                <th>点击添加</th>
				            </tr>
				        </thead>;
			var tablefoot = <tfoot>
			            <tr>
			            <td colSpan="9">
			                 下一页         
			            </td>
			            </tr>
        				</tfoot>;

			return (
				React.createElement('div',{className: 'items'},
					React.createElement('div',{className:'item'},
						React.createElement('div', {className:'item-title'},
							React.createElement('span',{className: 'tag item-order'},'Items列表'),
							React.createElement('div',{className:'item-property'}
								/*React.createElement(QuestionNameList,{
									items:items,
									changePaperState:self.props.changePaperState,
									deleteQuestionName:self.deleteQuestionName
								})*/
							)
						),
						React.createElement('div',{className:'title',title:'点击展开合并试题列表',onClick:self.handleTitleClick},'试题列表'),
						React.createElement('div',{className:'questionlist'},
							React.createElement('table',{className:'common-table questions'},
								tablehead,
								
								itemlists.map(function(item, i ,itemlists){
									return (
										React.createElement('tr',{id:itemlists[i].id},
											React.createElement('td',{className:'question_id'},itemlists[i].id),
											React.createElement('td',null,itemlists[i].nameCh),
											React.createElement('td',{className:'question_name'},itemlists[i].questionName),
											itemlists[i].flowable == '1' ?
											React.createElement('td',null,'是') : 
											React.createElement('td',null,'否'),
											React.createElement('td',null,itemlists[i].createTime.date.substring(0,10)),
											React.createElement('td',null,itemlists[i].score),
											React.createElement('td',null,itemlists[i].usageCounter),
											React.createElement('td',null,itemlists[i].questionDuration),
											React.createElement('td',null,
												React.createElement("a", {href: "javascript:void(0)", className: "add-question", onClick: self.handleQuestionAdd, title: "添加item"},
													React.createElement("img", {src: "/images/manage/add-min.png", width: "16", height: "16", alt: "添加item"})
												)
											),
											React.createElement('td',{className:'question_content',hidden:'hidden'},itemlists[i].questionContent)
											
										)
									)
								}),
								tablefoot
							)
						)
					)
				)
			)
		}
	});

	

	var QuestionNameList = React.createClass({displayName:'QuestionNameList',
		handleDeleteQuestion:function(event){
			var itemId = $(event.currentTarget).attr('value');
			var deleteA = $(event.currentTarget).parents('.item').find('.questionlist #'+itemId);
			this.props.deleteQuestionName(deleteA);
		},
		render:function(){
			var self = this;
			var items = [];
	        for(var x in itemNameLists){
	        	items.push(React.createElement('span',{className:'item-name'},itemNameLists[x]),
	        		React.createElement("a", {href: "javascript:void(0)", className: "delete-question", value:x, onClick: self.handleDeleteQuestion, title: "删除question"},
						React.createElement("img", {src: "/images/manage/delete-min.png", width: "16", height: "16", alt: "删除question"})
					)
	        	)
	        }
        return (
                <div>{items}</div>
        )
			
		}

	})
	
	var ItemList = React.createClass({displayName:'ItemList',
		deleteQuestionName:function(event){
			console.log('aaa');
			alert('hahahah');
		},
		getThisQuestionInfomation:function(event){//处理增加和删除的共有元素
			$(event.target).mouseout();
			//获得父元素
			$questionTr = $(event.target).parents('tr');

			//获取到对应试题的json内容文件，从试卷的json文件取出
			questionContent = $questionTr.find('td.question_content').text();

			//将name从list列表中删除
			questionName = $questionTr.find('td.question_name').text();

			//获取对应的question id放到试题json文件中
			questionId = $questionTr.find('.question_id').text();

			//之前试题存储的时候内容中一直没有添加id这个字段，但其实这个是在试卷存储答案的时候要的
			itemObj = JSON.parse(questionContent);

			itemObj.id = questionId;

			questionContent = JSON.stringify(itemObj);

		},
		handleQuestionAdd:function(event){
			
			this.getThisQuestionInfomation(event);
			//将试题内容插入到item中
			var items = this.props.items;

			items.push(questionContent);

			//键值对赋值
			itemNameLists[questionId] = questionName;
		
			/*var html = '';
			for(var i in itemNameLists) {
		        html += '<span class="item-name">'+itemNameLists[i]+
		        '</span><a href="javascript:void(0)" class="delete-question-name" onClick={this.js.deleteQuestionName} title="删除item"><img src="/images/manage/delete-min.png" width="16" height="16" alt="删除item"></a>';
		    }  */ 
			
			
			//添加类改变tr的颜色
			if (!$questionTr.hasClass('selected')) {
				$questionTr.addClass('selected');
			}
			
			
			//更新选中的试题名称
			//$(event.target).parents('div.item').find('.item-property').html(html);
			
			this.props.changePaperState();
		},
		deleteArrayByValue: function(arr, val) {
		  	for(var i=0; i<arr.length; i++) {
		    	if(arr[i] == val) {
		     		arr.splice(i, 1);
		      		break;
		    	}
		  	}
		},
		deleteQuestion: function(event){
			this.getThisQuestionInfomation(event);

			//从items中移走选中项
			var items = this.props.items;

			this.deleteArrayByValue(items,questionContent);

			//添加类改变tr的颜色
			if ($questionTr.hasClass('selected')) {
				$questionTr.removeClass('selected');
			}

			delete itemNameLists[questionId];//从选中的中删除对象
			
			this.props.changePaperState();
		},
		render:function(){
			var self = this;
			var items = this.props.items;
			var x = itemlists[0].id;
			var tablehead = <thead>
				            <tr>
				                <th>编号</th>
				                <th>类型名称</th>
				                <th>试题名</th>
				                <th>流程性</th>
				                <th>生成时间</th>
				                <th>分数</th>
				                <th>使用次数</th>
				                <th>试题用时</th>
				                <th>点击添加</th>
				            </tr>
				        </thead>;
			var tablefoot = <tfoot>
			            <tr>
			            <td colSpan="9">
			                 下一页         
			            </td>
			            </tr>
        				</tfoot>;
			return (
				React.createElement('div',{className:'questionlist'},
					React.createElement('table',{className:'common-table questions'},
						tablehead,
						
						itemlists.map(function(item, i ,itemlists){
							return (
								React.createElement('tr',{id:itemlists[i].id},
									React.createElement('td',{className:'question_id'},itemlists[i].id),
									React.createElement('td',null,itemlists[i].nameCh),
									React.createElement('td',{className:'question_name'},itemlists[i].questionName),
									itemlists[i].flowable == '1' ?
									React.createElement('td',null,'是') : 
									React.createElement('td',null,'否'),
									React.createElement('td',null,itemlists[i].createTime.date.substring(0,10)),
									React.createElement('td',null,itemlists[i].score),
									React.createElement('td',null,itemlists[i].usageCounter),
									React.createElement('td',null,itemlists[i].questionDuration),
									React.createElement('td',null,
										React.createElement("a", {href: "javascript:void(0)", className: "add-question", onClick: self.handleQuestionAdd, title: "添加item"},
											React.createElement("img", {src: "/images/manage/add-min.png", width: "16", height: "16", alt: "添加item"})
										),
										React.createElement("a", {href: "javascript:void(0)", className: "delete-question", onClick: self.deleteQuestion, title: "删除question"},
											React.createElement("img", {src: "/images/manage/delete-min.png", width: "16", height: "16", alt: "删除question"})
										)
									),
									React.createElement('td',{className:'question_content',hidden:'hidden'},itemlists[i].questionContent)
									
								)
							)
						}),
						tablefoot
					)
				)
			)
		}
	});

	
	$('.paper-finish-btn .complete-btn').click(function(){
		var flag = true;//提交之前的标记
		$('.item-property').each(function(){
			if($(this).find('span').length=='0'){
				alert('有没有选择试题的部分');
				flag = false;
				return;
			}
		});
		if(flag == false){
			return;
		}

		$('.paper-usagecount').val(1);

		$('.groupuser').val($('.basic-infor .username').text());

		//最终要出题的paper的内容
		$paper_structure.val(JSON.stringify(paper));
		
		$('.form-add-paper .add-btn').click();
	});

})