$(function(){
	$('.user-add a').click(function(){
		if($(this).hasClass('no-selected')){
			$(this).removeClass('no-selected').addClass('add-selected');
			$(this).siblings().removeClass('add-selected').addClass('no-selected');
			$('.single-teacher-add').toggle();
			$('.import-information-form').toggle();
		}
	})
})