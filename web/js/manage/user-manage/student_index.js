$(function() {	
	/*tr单选多选初始化*/
	trSelectInitial($('.students tbody tr'), 'students');

	/*** 单个删除 ***/
	singleDelete('student');

	/*** 批量删除 ***/
	multiDelete('student', 'students')	;
	
})