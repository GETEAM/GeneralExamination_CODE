$(function(){

  //删除操作
  singleDelete('question_type');




	
	function getStructureDate(){
		$.ajax({
			url: '',
			
			datatype:'json',
			success: function(data) {
				if(data.success){

				}else{

				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {

			}
		})
	}

});