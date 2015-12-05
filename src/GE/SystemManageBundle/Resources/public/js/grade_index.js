$(function() {
	console.log(111);
	$('.grades tbody tr').click(function() {
		var $checkbox = $('input[type="checkbox"]', $(this))
		var checked = $checkbox.attr('checked')
		$checkbox.attr('checked', !checked);
		if(!checked) {
			$(this).addClass('selected');
		}else {
			$(this).removeClass('selected');
		}
		
	})
})