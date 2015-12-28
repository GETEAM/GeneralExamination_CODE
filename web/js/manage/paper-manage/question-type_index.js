$(function(){
	var question_type_str=$('.question_type_structure').attr('question_type-str');
	var question_type_obj=JSON.parse(question_type_str);
	alert(question_type_obj.stem);
});