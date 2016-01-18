$(function() {	
	/*tr单选多选初始化*/
	trSelectInitial($('.grades tbody tr'), 'grades');

	/*** 单个删除 ***/
	singleDelete('grade');

	/*** 批量删除 ***/	
	multiDelete('grade', 'grades');
	
})