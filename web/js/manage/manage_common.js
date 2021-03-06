/****管理端各页面通用js****/
$(function(){
	//提示框初始化
	$(document).tooltip({
		track: true
	});
});
/*对象深度拷贝*/
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
};

/*列表页的tr 选择初始化(单选、全选)
 *@param: $tr_selector -> 需要实现可选的tr的jquery对象
 *@param: name -> 实现可选的checkbox的name值
 */
function trSelectInitial( $tr_selector, name ) {
	var $select_all = $('.select-all');
	var $select_all_checkbox = $('input[type="checkbox"]', $select_all);

	//全选
	$select_all.click(function(){
		var $select_all_checkbox = $('input[type="checkbox"]', $(this));
		var checked = $select_all_checkbox.attr('checked');
		var $checkboxs = $('input:checkbox[name="'+name+'"]');
		//根据checkbox的选中状态添加删除class
		if(!checked) {
			$select_all.addClass('checked');
			checkedAll($checkboxs);
		}else {
			$select_all.removeClass('checked');
			uncheckedAll($checkboxs);
		}
		//改变复选框的选中状态
		$select_all_checkbox.attr('checked', !checked);
		
	});

	//单选
	$tr_selector.click(function(e) {
		var event_target = e.target;
		//总tr数
		var trs_num = $('input:checkbox[name="'+name+'"]').length;

		//如果点击的位置为a标签或者父元素部位A标签 则选中该行
		if( event_target.tagName != 'A' && event_target.parentNode.tagName != 'A' ){
			var $checkbox = $('input[type="checkbox"]', $(this));
			var checked = $checkbox.attr('checked');
			/*改变当前复选框的样式*/
			//改变复选框的选中状态
			$checkbox.attr('checked', !checked);

			//已选中tr数
			//★注意：放在设置checkbox语句之后，从而获取到最新的选中trs
			var selected_trs_num = getSelectedTRs(name).length;
			//根据已选中tr数和总tr数判断是否全选
			var is_select_all = trs_num == selected_trs_num ? true : false;

			//当前tr 根据checkbox的选中状态添加删除class
			if(!checked) {
				$(this).addClass('selected');
			}else {
				$(this).removeClass('selected');
			}
			/*改变全选的样式*/
			if(is_select_all){
				$select_all_checkbox.attr('checked', true);
				$select_all.addClass('checked');
			}else{
				$select_all_checkbox.attr('checked', false);
				$select_all.removeClass('checked');
			}
		}
	})
}

/*给定多选框的name名称 获取多选框的选中值
 *@param: name -> 多选框的name名称
*/
function getSelectedTRs(name) {
	var trs = [];
	//$('input:checkbox[name="'+name+'"]:checked')兼容性有问题（点击选中，再点击取消之后，无法获取到），修改成该种方法
	$('input:checkbox[name="'+name+'"][checked]').each(function(){
		parseInt($(this).val())
		trs.push( parseInt($(this).val()) );
	});
	return trs;
}

/*选中全部指定checkbox
 *@param: $checkboxs -> 指定的复选框jquery对象，从而实现给定单选框的全选取消
*/
function checkedAll($checkboxs) {
	$checkboxs.each(function(){
		$(this).attr('checked', true);
		$(this).closest('tr').addClass('selected');
	});
}

/*取消选中全部指定checkbox
 *@param: $checkboxs -> 指定的复选框jquery对象，从而实现给定单选框的全选取消
*/
function uncheckedAll($checkboxs) {
	$checkboxs.each(function(){
		$(this).attr('checked', false);
		$(this).closest('tr').removeClass('selected');
	});
}

/*单个删除通用方法
 *@param: name -> 指定操作对象的名称（比如年级管理时为grade）
 */
function singleDelete(name) {
	$( '.delete-dialog' ).dialog({ 
		closeOnEscape: true,//按下ESC后是否退出
		modal: true,//出现模态弹出框
		resized: false,
		autoOpen: false,
		buttons: {
			'确认': function() {
				$(this).dialog('close');
				$('.loading-description').text("正在删除,请稍等……");
				$('.loading').show();
				var delete_id = $(this).attr(name +'-id');
				//跳转到删除页面
				location.href = '/manage/' + name +'/delete/' + delete_id;
			},
			'取消': function() {
				//此处的this为$( '.delete-dialog' )
				$(this).dialog('close');
			}
		}
	});
	// 点击删除按钮时，打开删除对话框
	$('.delete-btn').click(function(){
		var name_id = $(this).closest('a').attr(name + '-id');
		//对应的对话框id
		var dialog_id = '#delete-dialog_' + name_id;
		//打开对话框
		$(dialog_id).dialog('open');
	});
}

/*批量删除通用方法
 *@param: name -> 指定操作对象的名称（比如年级管理时为grade）
 *@param: names -> name的复数形式(多选框的name值)
 */
function multiDelete(name, names) {
	//批量删除对话框初始化
	$( '.multi-delete-dialog' ).dialog({ 
		closeOnEscape: true,//按下ESC后是否退出
		modal: true,//出现模态弹出框
		resized: false,
		autoOpen: false,
		buttons: {
			'确认': function() {
				$(this).dialog('close');
				$('.loading-description').text("正在删除,请稍等……");
				$('.loading').show();
				
				var ids = getSelectedTRs(names);
				console.log(ids.length);
				//post操作 用ajax实现
				$.ajax({
				    type: 'POST',
				    url: '/manage/' + name + '/multi-delete',
				    data: {
				        ids: ids
				    },
				    dataType: 'json',
				    async: true,
				    success: function (data) {
				        if (data.success) {
				            console.log("选中项删除成功！正在更新显示...", 2000, 'TIP');
				            window.location.reload(true);
				        } else {
				            console.log("选中项删除失败!");
				            window.location.reload(true);
				        }
				    },
				    error: function (XMLHttpRequest, textStatus, errorThrown) {
				        console.log("error " + textStatus);
				        console.log("网络或服务器异常！" + 'ERROR');
				    }
				});

			},
			'取消': function() {
				//此处的this为$( '.multi-delete-dialog' )
				$(this).dialog('close');
			}
		}
	});
	// 点击批量删除按钮时，打开删除对话框
	$('.btn-multi-delete').click(function(){
		var ids = getSelectedTRs(names);
		if(ids.length > 0){
			//打开对话框
			$('.multi-delete-dialog').dialog('open');
		}else{
			//没有选中内容时，给予提示
			var $warning_message = $('<div>').html('没有可删除的选中项！').addClass('notice warning');
			$('.flash-message').append($warning_message);
		}
	});
}


$.fn.extend({

	/*tab标签切换通用方法
	 *@param: num -> 指定显示的标签（序号从0开始）
	 */
	tabs: function(num) {
		$tabs = $(this);
		num = num || 0;
		tabs_num = $tabs.find(".tab-title li").length;
		
		//如果指定的num大于tab_num
		num = tabs_num < num ? tabs_num - 1 : num;
		console.log(num)
		$show_tab_title = $($tabs.find('.tab-title li')[num]).find('a');

		$show_tab_title.addClass('selected');
		$show_tab_title.parent().siblings().find('a').removeClass('selected');

		$show_tab_content = $($show_tab_title.attr('name'));
		$show_tab_content.show().siblings().hide();

	 	//单击切换
		$tabs.find('.tab-title li a').click(function(){
			//变换样式
			$(this).addClass('selected');
	    	$(this).parent().siblings().find('a').removeClass('selected');
	    	
	    	//内容改变
	    	var content_id=$(this).attr('name');
	    	$(content_id).show().siblings().hide();
		});
	}
	
});

/*更新选择框
 *@param: $selectId -> 指定要选择的select的id
 */
function optionContent($selectId){
	var optionArr=[];
	var selectText="";
	var options=$selectId.children();
	for (var i = 0; i < options.length; i++) {
		optionArr.push(options[i].text);
	};
	var afterDeleteReapeat=deleteRepeatElement(optionArr);
	
	for (var i = 0; i < afterDeleteReapeat.length; i++) {
		selectText+='<option>'+afterDeleteReapeat[i]+'</option>';
	};
	$selectId.html(selectText);
}
/*数组去掉重复
 *@param: arr -> 指定需要去掉重复的数组
 */
function deleteRepeatElement(arr){
    var obj={};var newarr=[];

    for (var i = 0; i < arr.length; i++) {
      if(typeof(obj[arr[i]])=='undefined'){
          obj[arr[i]]=" ";
      }  
    }
    for(var j in obj){
      newarr.push(j)
    }
    return newarr;
}

