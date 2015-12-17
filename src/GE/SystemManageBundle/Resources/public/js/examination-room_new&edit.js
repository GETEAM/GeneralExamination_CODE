$(function(){
	//获取机器行数、列数输入框
	var $er_rows = $('.er-rows');
	var $er_cols = $('.er-cols');
	var rows = $er_rows.val();
	var cols = $er_cols.val();
	var $er_rows_cols_table = $('.er-rows-cols-table');
	var $fault_machines = $('.fault-machines');
	var $fault_machine_table = $('.fault-machine-table table');
	var $available_machine = $('.available-machine');

	//初始化故障机器
	handleFaultMachine($available_machine, $fault_machines, $fault_machine_table, rows, cols);


	/*****选择机器行列数*****/
	//行列输入框聚焦时，显示行列表格
	$er_rows.focus(function(){
		$er_rows_cols_table.slideDown();
	});
	$er_cols.focus(function(){
		$er_rows_cols_table.slideDown();
	});
	//行列输入框失去焦点时，隐藏行列表格
	$er_rows.blur(function(){
		$er_rows_cols_table.slideUp();
	});
	$er_cols.blur(function(){
		$er_rows_cols_table.slideUp();
	});

	//点击确定表格消失
	$('td', $er_rows_cols_table).click(function(){
		$er_rows_cols_table.slideUp();
	});

	//鼠标在td上悬浮时，显示已选择的行和列
	$('td', $er_rows_cols_table).mouseover(function(event){
		//获取行数
		var rows = $(this).parent().prevAll().length + 1;
		$er_rows.val(rows);
		
		//获取列数
		var cols = $(this).prevAll().length + 1;
		$er_cols.val(cols);

		//改变当前td的颜色
		$(this).addClass('selected-rows-cols');

		if(!$(this).next().is('td') && !$(this).parent().next().is('tr')){
			//当前td为最后一行最后一列
			$('td', $er_rows_cols_table).addClass('selected-rows-cols');
		}else if(!$(this).next().is('td')){   
			//当前td为最后一列
			$(this).parent().next().prevAll().addClass('selected-rows-cols');
		}else if(!$(this).parent().next().is('tr')){   
			//当前td是最后一行
			$er_rows_cols_table.find('tr').each(function(){
				$(this).find('td:nth-child(' + (cols + 1) + ')').prevAll().addClass('selected-rows-cols');
			});
		}else{
			$(this).parent().next().prevAll().each(function(){
				$(this).find('td:nth-child(' + (cols + 1) + ')').prevAll().addClass('selected-rows-cols');
			});
		}

		//计算总机器数
		var available_machine=rows * cols;
		$available_machine.val(available_machine);

		/*****故障机器提交*****/
		handleFaultMachine($available_machine, $fault_machines, $fault_machine_table, rows, cols);
	});

	$('td', $er_rows_cols_table).mouseout(function(event){
		var cols = $(this).prevAll().length + 1;
		//删除颜色
		$(this).removeClass('selected-rows-cols');
		if(!$(this).next().is('td') && !$(this).parent().next().is('tr')){
			$('td', $er_rows_cols_table).removeClass('selected-rows-cols');
		}else if(!$(this).next().is('td')){
			$(this).parent().next().prevAll().removeClass('selected-rows-cols');
		}else if(!$(this).parent().next().is('tr')){
			$er_rows_cols_table.find('tr').each(function(){
				$(this).find('td:nth-child(' + (cols + 1) + ')').prevAll().removeClass('selected-rows-cols');
			});
		}else{
			$(this).parent().next().prevAll().each(function(){
			$(this).find('td:nth-child(' + (cols + 1) + ')').prevAll().removeClass('selected-rows-cols');
		});
		}	
	});
	$er_rows.change(function(){
		var rows = $er_rows.val();
		var cols = $er_cols.val();
		/*****故障机器提交*****/
		handleFaultMachine($available_machine, $fault_machines, $fault_machine_table, rows, cols);
	});
	$er_cols.change(function(){
		var rows = $er_rows.val();
		var cols = $er_cols.val();
		/*****故障机器提交*****/
		handleFaultMachine($available_machine, $fault_machines, $fault_machine_table, rows, cols);
	});

});
/*****故障机器提交处理*****/
function handleFaultMachine($available_machine, $fault_machines, $fault_machine_table, rows, cols) {

	//动态生成故障机器列表
	$fault_machine_table.html('');
	for(var row = 0; row < rows; row++){
		var $row_temp = $('<tr>');
		for(var col = 0; col < cols; col++){
			var $col_temp = $('<td>');
			var $col_checkbox = $('<input/>', {
				'type': 'checkbox',
				'name': 'fault-machine-checkbox',
				'value': row * cols + col,
				'css': {'display': 'none', 'width': '20px'}
			})
			$col_temp.html( '<span>' + (row + 1) + 'X' + (col + 1) + '</span>');
			$col_temp.prepend( $col_checkbox );
			$row_temp.append($col_temp)
		}
		$fault_machine_table.append($row_temp);
	}

	//设置默认故障机器
	$('input:checkbox[name="fault-machine-checkbox"]', $fault_machine_table).val($fault_machines.val().split(','));
	//标示故障机器
	$('input:checkbox[name="fault-machine-checkbox"]:checked', $fault_machine_table).each(function(){
		//上一步设置故障机器默认选中时，checkbox存在checked属性，但是不为true，此处手动添加
		$(this).attr('checked', true);
		$(this).parent().addClass('fault-machine');
	});

	var $fault_machine_td = $('td', $fault_machine_table);
	//点击td时，做相应处理
	$fault_machine_td.click(function(e) {
		//改变当前td的故障情况
		var checkbox = $('input', $(this));
		if(!checkbox.attr('checked')){
			checkbox.attr('checked', true);
			$(this).addClass('fault-machine');
		}else{
			checkbox.attr('checked', false);			
			$(this).removeClass('fault-machine');			
		}
		
		//获取所有故障机器
		var fault_machines_arr = [];
		$('input:checkbox[name="fault-machine-checkbox"]:checked', $fault_machine_table).each(function(){
			fault_machines_arr.push($(this).val());
		});
		//更新故障机器表单
		$fault_machines.val( fault_machines_arr.join( ',' ) );

		//更改可用机器数
		$available_machine.val( rows * cols - fault_machines_arr.length );

	});
}