$(function(){
  	
  	/*tr单选多选初始化*/
	trSelectInitial($('.papers tbody tr'), 'papers');

  	//删除操作
  	singleDelete('paper');
  	
	/*** 批量删除 ***/	
	multiDelete('paper', 'papers');

}); 	