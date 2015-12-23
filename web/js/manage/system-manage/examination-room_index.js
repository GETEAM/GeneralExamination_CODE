$(function() {
	/*tr单选多选初始化*/
	trSelectInitial($('.examinationrooms tbody tr'), 'examinationrooms');
	
	/*** 单个删除 ***/
	singleDelete('examinationroom');

	/*** 批量删除 ***/	
	multiDelete('examinationroom', 'examinationrooms');

	//index页面，鼠标悬浮在故障列表时显示表格
	$('.fault-machine-td').mouseover(function(){
		//获取该考场的相关信息
		var examinationroom_id=$(this).attr('examinationroom-id');
		var rows=$(this).attr('examinationroom-row');
		var cols=$(this).attr('examinationroom-col');
		var fault_machines=$(this).attr('fault-machines');
		//对比故障机器是否正确 调试完毕删除
		console.log(fault_machines);
		
		var fault_machine_table_id='#examinationroom_' + examinationroom_id;
		$(fault_machine_table_id).show();

		//指定要加载的表格
		var $fault_machine_table=$(fault_machine_table_id +' .fault-table');
		showFaultMachine(examinationroom_id, fault_machines, $fault_machine_table, rows, cols);

	});
	
	$('.fault-machine-td').mouseout(function(){
		$('.show-fault-machine').hide();
	});


	/* 故障机器显示
	 * @param：examinationroom_id -> 考场id(区分故障机器和正常机器的checkbox的name值)
	 * @param：fault_machines -> 故障机器序列（逗号隔开）
	 * @param：$fault_machine_table  -> 故障机器表格的jquery对象
	 * @param：rows -> 机器行数
	 * @param：cols -> 机器列数
	 */
	function showFaultMachine(examinationroom_id, fault_machines, $fault_machine_table, rows, cols){
		//动态生成故障机器列表
		$fault_machine_table.html('');
		for(var row = 0; row < rows; row++){
			var $row_temp = $('<tr>');
			for(var col = 0; col < cols; col++){
				var $col_temp = $('<td>');
				var $col_checkbox = $('<input/>', {
					'type': 'checkbox',
					'name': examinationroom_id,
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
		$('input:checkbox[name="'+examinationroom_id+'"]', $fault_machine_table).val(fault_machines.split(','));
		//标示故障机器
		$('input:checkbox[name="'+examinationroom_id+'"]:checked', $fault_machine_table).each(function(){
			//上一步设置故障机器默认选中时，checkbox存在checked属性，但是不为true，此处手动添加
			$(this).attr('checked', true);
			$(this).parent().addClass('fault-machine');
		});
	}
})