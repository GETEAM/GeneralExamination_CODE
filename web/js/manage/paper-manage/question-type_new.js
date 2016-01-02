$(function(){
	/*选择添加试题的种类*/
	$('.add-question').mouseover(function(){
		$(this).find('ul').show();
	});

	$('.add-question').mouseout(function(){
		$(this).find('ul').hide();
	})
	/*点击添加试题*/
	$('.add-question').click(function(){
		$question = $('<div>')
		$(this).closest('.questions').find('.question:last').after($(this).next().html());
		$('.question-toggle').click(function(){
		$(this).closest('.question-stem').next().toggle();
	})
	})
	/*点击隐藏和显示选项级答案*/
	var s = $('.question-toggle');
	$('.question-toggle').click(function(){
		$(this).closest('.question-stem').next().toggle();
	})
})