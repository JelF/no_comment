function loadComment(e, id) {
    ajaxGet("ajax/comment/get/"+id ,null,function(res) {
        if(parent_id==0) $("#comments_root").prepend(res);
        else comment_insert(e,res);
    }, null);
}
function loadComments(e, id) {
    ajaxGet("ajax/comment/child/load/"+id ,null,function(res) {
        e.html(res);
    }, null);
}

function getChildren(id,callback) {
    var res=[];
    $.get("ajax/comment/child/"+id ,null,function(responce) {
        callback(responce.content);
    });
}

function add_comment(id) {
    edit_id=false;
    parent_id=id;
    var place;
    close_form();
    if(id==0) $("#comments_root").prepend(edit_form);
    else  {
        comment_element(id).append(edit_form);
    }
    $("#edit_delete_btn").hide();
    edit_form.show();
}

function close_form() {
    edit_field.val("");
    edit_form.hide();
    if(shadowed_comment) {
        shadowed_comment.show();
        shadowed_comment=false;
    }
}

function edit(id) {
    edit_id=id;
    close_form();
    var place=comment_element(id)
    shadowed_comment = $(".comment_main",place)
    shadowed_comment.hide();
    var text = $.trim($(".text",place).text());
    $("#edit_delete_btn").show();
    edit_field.val(text);
    edit_form.show();
    place.prepend(edit_form);
}

function validate_text(text) {
    if($.trim(text).length<10) {
        alert("Введите текст от 10 символов!");
        return false;
    }
    return true;
}
function submit() {
    if(!validate_text(edit_field.val())) {
        return;
    }
    if(edit_id) {
        $.post('ajax/comment/update/'+edit_id,
            {
                text: edit_field.val()
            }).success(function() {
                $(".text",shadowed_comment).text(edit_field.val());
                close_form();
            }).error(function() {
                alert("Ошибка обновления!")
            });
    }
    else {
        $.post("ajax/comment/create",
            {
                text: edit_field.val(),
                parent: parent_id
            }).success(function(x) {
                if(parent_id==0) {
                    loadComment(null, x.content);
                }
                else {
                    var child=comment_element(parent_id);
                    loadComment(child, x.content);
                }
                close_form();
            }).error(function() {
                alert("Ошибка добавления!")
            });
    }
}

function delete_comment() {
    $.post("ajax/comment/delete/"+edit_id).success(function() {
        $("#comment_"+edit_id).remove();
        close_form();
    }).error(function() {
        alert("Ошибка удаления!")
    });
}

var edit_form;
var edit_field;
var edit_id;
var parent_id;
var shadowed_comment=false;

window.onload = function () {
    loadComments($("#comments_root"),0);
    edit_form=$("#edit_form");
    edit_field=$("#edit_field");
};