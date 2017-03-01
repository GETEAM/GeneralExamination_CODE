$(function(){
  	//试题类型相关操作

  	/*tr单选多选初始化*/
	trSelectInitial($('.questions tbody tr'), 'questions');

  	//删除操作
  	singleDelete('question');
  	
	/*** 批量删除 ***/	
	multiDelete('question', 'questions');

}); 	