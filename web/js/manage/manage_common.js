/****系统管理各页面通用js****/

//列表页的tr多选初始化：单击表格tr 选中一行
function multipleSelectTR( $selector ) {
	$selector.click(function(e) {
		var event_target = e.target;
		//如果点击的位置为a标签或者父元素部位A标签 则选中该行
		if( event_target.tagName != 'A' && event_target.parentNode.tagName != 'A' ){
			var $checkbox = $('input[type="checkbox"]', $(this))
			var checked = $checkbox.attr('checked')
			//改变复选框的选中状态
			$checkbox.attr('checked', !checked);
			//根据checkbox的选中状态添加删除class
			if(!checked) {
				$(this).addClass('selected');
			}else {
				$(this).removeClass('selected');
			}
		}
	})
}
/*获取所有选中的tr的值*/
function getSelectedTRs($name) {
	var trs = [];
	$('input:checkbox[name="'+$name+'"]:checked').each(function(){
		trs.push($(this).val());
	});
	return trs;
}