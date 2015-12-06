$(function(){
	// $('.box').mouseover(function(event){
	// 	//获取到行
	// 	var rows = $(this).parent().parent().prevAll().length+1;
	// 	$('.er-rows').val(rows);
		
	// 	//获取到列
	// 	var cols = $(this).parent().prevAll().length+1;
	// 	$('.er-cols').val(cols);

	// 	//改变颜色
	// 	$(this).addClass('color');
	// 	$(this).parent().parent().next().prevAll().each(function(){
	// 		$(this).find('td:nth-child('+(cols)+')').next().prevAll().addClass('color');
	// 	});	

	// 	//计算总机器数
	// 	var totalMachine=rows * cols;
	// 	$('.available-machine').val(totalMachine);
	// });

	// $('.box').mouseout(function(event){
	// 	var cols = $(this).parent().prevAll().length+1;
	// 	//删除颜色
	// 	$(this).removeClass('color');
	// 	$(this).parent().parent().next().prevAll().each(function(){
	// 		$(this).find('td:nth-child('+(cols)+')').next().prevAll().removeClass('color');
	// 	});
	// });
	// //点击确定表格消失
	// $('.box').click(function(){
	// 	$('#table').hide();
	// });
	// //输入时表格显示
	// $('.er-rows').focus(function(){
	// 	$('#table').show();
	// });
	// $('.er-cols').focus(function(){
	// 	$('#table').show();
	// })

	//故障机器提交
	//获取机器行数、列数
	var $er_rows = $('.er-rows');
	var $er_cols = $('.er-cols');
	var $fault_machine = $('.fault-machine');
	var $fault_machine_table = $('.fault-machine-table table');

	$fault_machine.focus(function() {
		$fault_machine_table.html('');
		var er_rows_count = parseInt( $er_rows.val() ) || 0;
		var er_cols_count = parseInt( $er_cols.val() ) || 0;
		console.log(er_rows_count,er_cols_count);
		for(var row = 0; row < er_rows_count; row++){
			var $row_temp = $('<tr>');
			for(var col = 0; col < er_cols_count; col++){
				var $col_temp = $('<td>');
				$col_temp.html( (row + 1) + 'X' + (col + 1) );
				$row_temp.append($col_temp)
			}
			$fault_machine_table.append($row_temp)
		}
		$fault_machine_table.parent().show();
	});
	$fault_machine.blur(function() {
		$fault_machine_table.parent().hide();
	})
});