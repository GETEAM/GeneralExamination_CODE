$(function() {	
	/*tr单选多选初始化*/
	trSelectInitial($('.students tbody tr'), 'students');

	/*** 单个删除 ***/
	singleDelete('student');

	/*** 批量删除 ***/
	multiDelete('student', 'students');

	/*去除重复获取可以选取的学院和年级*/
	var $academySelectId=$('#academyName');
	optionContent($academySelectId);

	var $gradeSelectId=$('#gradeName');
	optionContent($gradeSelectId);

	
})