window.onload=function(){
    $('.wait-load').hide();
}
$(function(){
	//当点击添加的时候出来正在添加的框
	$('.add-btn').click(function(){
		$('.load-describe').text("正在添加,请稍等！");
		$('.wait-load').show();
	})
	//点击修改的时候
	$('.edit-btn').click(function(){
		$('.load-describe').text("正在修改,请稍等！");
		$('.wait-load').show();
	})
})