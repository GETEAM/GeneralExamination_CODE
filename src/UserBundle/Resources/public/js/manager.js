
$(function(){
    singleDelete(manager);


    //单个删除能不能写成方法？？？
    function singleDelete(name){

            /*** 单个删除 ***/
        // 对话框 初始化
        $( '.delete-dialog' ).dialog({ 
            closeOnEscape: true,//按下ESC后是否退出
            modal: true,//出现模态弹出框
            resized: false,
            autoOpen: false,
            buttons: {
                '确认': function() {
                    $(this).dialog('close');
                    $('.loading-description').text("正在删除,请稍等……");
                    $('.loading').show();

                    var name_id = $(this).attr(name+'-id');
                    //跳转到删除页面
                    location.href = '/manage/' + name + '/delete/' + name_id;
                },
                '取消': function() {
                    //此处的this为$( '.delete-dialog' )
                    $(this).dialog('close');
                }
            }
        });
        // 点击删除按钮时，打开删除对话框
        $('.delete-btn').click(function(){
            alert('haha');
            var name_id = $(this).closest('a').attr(name+'-id');
            alert(name_id);
            //对应的对话框id
            var dialog_id ='#' + name + '-delete-dialog_' + name_id;
            //打开对话框
            $(dialog_id).dialog('open');
        });

    }


})


//批量删除manager
function multiDelete(){
    var checkedValues = selectedValues();
    console.log(JSON.stringify(checkedValues));
    if(!jQuery.isEmptyObject(checkedValues)) {
        if (window.confirm('您确定删除选中项吗?') == true) {
            $.ajax({
                type: 'POST',
                url: '/admin/delete_selectedTeachers',
                data: {
                    selectTeachers: checkedValues
                },
                dataType: 'json',
                timeout: 5000,
                async: true,
                success: function (data) {
                    if (data.success) {
                        console.log("勾选删除成功！正在更新显示...", 2000, 'TIP');
                        window.location.reload(true);
                    } else {
                        console.log("勾选删除失败!");
                        window.location.reload(true);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("error " + textStatus);
                    console.log("网络或服务器异常！" + 'ERROR');
                }
            });
        }
    }
    
}

/*//单个删除能不能写成方法？？？
    function singleDelete(name){

            
        // 对话框 初始化
        $( '.delete-dialog' ).dialog({ 
            closeOnEscape: true,//按下ESC后是否退出
            modal: true,//出现模态弹出框
            resized: false,
            autoOpen: false,
            buttons: {
                '确认': function() {
                    $(this).dialog('close');
                    $('.loading-description').text("正在删除,请稍等……");
                    $('.loading').show();

                    var name_id = $(this).attr(name+'-id');
                    //跳转到删除页面
                    location.href = '/manage/' + name + '/delete/' + name_id;
                },
                '取消': function() {
                    //此处的this为$( '.delete-dialog' )
                    $(this).dialog('close');
                }
            }
        });
        // 点击删除按钮时，打开删除对话框
        $('.delete-btn').click(function(){
            var name_id = $(this).closest('a').attr(name+'-id');
            //对应的对话框id
            var dialog_id ='#' + name + '-delete-dialog_' + name_id;
            //打开对话框
            $(dialog_id).dialog('open');
        });

    }*/