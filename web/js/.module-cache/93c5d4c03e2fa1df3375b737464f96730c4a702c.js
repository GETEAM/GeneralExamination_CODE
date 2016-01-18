$(function() {
	///*tr单选多选初始化*/
	trSelectInitial($('.academies tbody tr'), 'academies');

	/*** 单个删除 ***/
	singleDelete('academy');
	
	/*** 批量删除 ***/	
	multiDelete('academy', 'academies');

})