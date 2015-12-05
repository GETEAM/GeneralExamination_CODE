/*系统管理各页面通用js*/
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