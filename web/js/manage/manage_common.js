/****系统管理各页面通用js****/
//列表页的tr 选择初始化
function trSelectInitial( $tr_selector, name ) {
	var $select_all = $('.select-all');
	var $select_all_checkbox = $('input[type="checkbox"]', $select_all);

	//全选
	$select_all.click(function(){
		var $select_all_checkbox = $('input[type="checkbox"]', $(this));
		var checked = $select_all_checkbox.attr('checked');
		var $grades_checkboxs = $('input:checkbox[name="'+name+'"]');
		//根据checkbox的选中状态添加删除class
		if(!checked) {
			$select_all.addClass('checked');
			checkedAll($grades_checkboxs);
		}else {
			$select_all.removeClass('checked');
			uncheckedAll($grades_checkboxs);
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

/*获取所有选中的tr的值*/
function getSelectedTRs(name) {
	var trs = [];
	//$('input:checkbox[name="'+name+'"]:checked')兼容性有问题（点击选中，再点击取消之后，无法获取到），修改成该种方法
	$('input:checkbox[name="'+name+'"][checked]').each(function(){
		parseInt($(this).val())
		trs.push( parseInt($(this).val()) );
	});
	return trs;
}

/*选中全部指定checkbox*/
function checkedAll($checkboxs) {
	$checkboxs.each(function(){
		$(this).attr('checked', true);
		$(this).closest('tr').addClass('selected');
	});
}

/*取消选中全部指定checkbox*/
function uncheckedAll($checkboxs) {
	$checkboxs.each(function(){
		$(this).attr('checked', false);
		$(this).closest('tr').removeClass('selected');
	});
}