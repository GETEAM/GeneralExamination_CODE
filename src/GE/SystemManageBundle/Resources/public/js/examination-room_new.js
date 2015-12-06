$(function(){
	$('.box').mouseover(function(event){
		//获取到行
		var rows = $(this).parent().parent().prevAll().length+1;
		$('.er-rows').val(rows);
		
		//获取到列
		var cols = $(this).parent().prevAll().length+1;
		$('.er-cols').val(cols);

		//改变颜色
		$(this).addClass('color');
		if(!$(this).parent().next().is('td') && !$(this).parent().parent().next().is('tr')){
			$('.box').addClass('color');
		}else if(!$(this).parent().next().is('td')){   //如果是最后一列
			$(this).parent().parent().next().prevAll().addClass('color');
		}else if(!$(this).parent().parent().next().is('tr')){   //如果是最后一行
			$('#er-rows-cols-table').find('tr').each(function(){
				$(this).find('td:nth-child('+(cols+1)+')').prevAll().addClass('color');
			})
		}else{
			$(this).parent().parent().next().prevAll().each(function(){
			$(this).find('td:nth-child('+(cols)+')').next().prevAll().addClass('color');
			});
		}

		//计算总机器数
		var totalMachine=rows * cols;
		$('.tatal-machine').val(totalMachine);
	});

	$('.box').mouseout(function(event){
		var cols = $(this).parent().prevAll().length+1;
		//删除颜色
		$(this).removeClass('color');
		if(!$(this).parent().next().is('td') && !$(this).parent().parent().next().is('tr')){
			$('.box').removeClass('color');
		}else if(!$(this).parent().next().is('td')){
			$(this).parent().parent().next().prevAll().removeClass('color');
		}else if(!$(this).parent().parent().next().is('tr')){
			$('#er-rows-cols-table').find('tr').each(function(){
				$(this).find('td:nth-child('+(cols+1)+')').prevAll().removeClass('color');
			})
		}else{
			$(this).parent().parent().next().prevAll().each(function(){
			$(this).find('td:nth-child('+(cols)+')').next().prevAll().removeClass('color');
		});
		}	
	});

	//点击确定表格消失
	$('.box').click(function(){
		$('#table').hide();
	});
	//输入时表格显示
	$('.er-rows').focus(function(){
		$('#table').show();
	});
	$('.er-cols').focus(function(){
		$('#table').show();
	})

	//故障机器提交
	//获取机器行数、列数
	var $er_rows = $('.er-rows');
	var $er_cols = $('.er-cols');
	var $fault_machine = $('.fault-machine');;
	$fault_machine.focus(function() {

	});
});