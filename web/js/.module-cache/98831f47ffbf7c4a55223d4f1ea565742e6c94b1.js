$(function() {	
	/*tr单选多选初始化*/
	trSelectInitial($('.managers tbody tr'), 'managers');

	/*** 单个删除 ***/
	singleDelete('manager');

	/*** 批量删除 ***/
	multiDelete('manager', 'managers')	;
	
})