$(function(){
	$('.box').mouseover(function(event){
		//获取到行
		var rows = $(this).parent().parent().prevAll().length+1;
		$('#er-rows').val(rows);
		
		//获取到列
		var cols = $(this).parent().prevAll().length+1;
		$('#er-cols').val(cols);

		//改变颜色
		$(this).addClass('color');
		$(this).parent().parent().next().prevAll().each(function(){
			$(this).find('td:nth-child('+(cols)+')').next().prevAll().addClass('color');
		});	
	});

	$('.box').mouseout(function(event){
		var cols = $(this).parent().prevAll().length+1;
		//删除颜色
		$(this).removeClass('color');
		$(this).parent().parent().next().prevAll().each(function(){
			$(this).find('td:nth-child('+(cols)+')').next().prevAll().removeClass('color');
		});
	});
	//点击确定表格消失
	$('.box').click(function(){
		$('#table').hide();
	});
	//输入时表格显示
	$('#er-rows').focus(function(){
		$('#table').show();
	});
	$('#er-cols').focus(function(){
		$('#table').show();
	})
});