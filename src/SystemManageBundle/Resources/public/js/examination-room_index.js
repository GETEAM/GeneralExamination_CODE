$(function() {
	//单击表格tr 选中一行
	multipleSelectTR($('.examination-rooms tbody tr'));
	/*** 单个删除 ***/
	// 对话框 初始化
	$( '.delete-dialog' ).dialog({ 
		closeOnEscape: true,//按下ESC后是否退出
		modal: true,//出现模态弹出框
		resized: false,
		autoOpen: false,
		buttons: {
			'确认': function() {
				$(this).dialog('close');
				$('.load-describe').text("正在删除,请稍等！");
				$('.wait-load').show();
				//跳转到删除页面
				var examinationroom_id = $(this).attr('examinationroom-id');
				location.href = '/manage/examinationroom/delete/' + examinationroom_id;
			},
			'取消': function() {
				//此处的this为$( '.delete-dialog' )
				$(this).dialog('close');
			}
		}
	});
	// 点击删除按钮时，打开删除对话框
	$('.delete-btn').click(function(){
		
		var examinationroom_id = $(this).closest('a').attr('examinationroom-id');
		//对应的对话框id
		var dialog_id = '#delete_examinationroom_' + examinationroom_id;

		//打开对话框
		$(dialog_id).dialog('open');
	});

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

	function showFaultMachine(examinationroom_id, fault_machines, $fault_machine_table, rows, cols){
		console.log(fault_machines);
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