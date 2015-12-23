/****管理端各页面通用js****/

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

/*tab标签切换通用方法
 *@param: $tab_id -> 指定标签的id（比如管理员添加时为manager-add-tab）
 */
function tab($tab_id){
	//默认显示第一个
	var default_content_id=$tab_id.find('.tab-title li:first a').addClass('add-selected').attr('name');
 	$(default_content_id).show().siblings().hide();

 	//单击变换
	$tab_id.find('.tab-title li a').click(function(){
		//变换样式
		$(this).removeClass('no-selected').addClass('add-selected');
    	$(this).parent().siblings().find('a').removeClass('add-selected').addClass('no-selected');
    	//内容改变
    	var content_id=$(this).attr('name');
    	$(content_id).show().siblings().hide();
	});
}
