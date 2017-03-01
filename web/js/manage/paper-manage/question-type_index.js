$(function(){
  	//试题类型相关操作

  	/*tr单选多选初始化*/
	trSelectInitial($('.question_types tbody tr'), 'question_types');

  	/*删除操作*/
  	singleDelete('question_type');

	/*** 批量删除 ***/	
	multiDelete('question_type', 'question_types');

});