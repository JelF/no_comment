function loadComment(e, id) {
    ajaxGet("ajax/comment/get/"+id ,null,function(res) {
        e.prepend(res);
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
    if(id==0) place=$("#comments_root");
    else  {
        place= $("#comment_"+id+ " .children");
    }
    $("#edit_delete_btn").hide();
    place.prepend(edit_form);
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
    var place=$("#comment_"+id);
    shadowed_comment = $(".comment_main",place)
    shadowed_comment.hide();
    var text = $.trim($(".text",place).text());
    $("#edit_delete_btn").show();
    edit_field.val(text);
    edit_form.show();
    place.prepend(edit_form);
}

function validate_text(text) {
    if($.trim(text).size>10) {
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
                var child;
                if(parent_id==0) child=$("#comments_root");
                else child=$("#comment_"+parent_id+" .child");
                loadComment(child, x.content);
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
    getChildren(0,function(x) {
        for (var id in x) {
            loadComment($("#comments_root"), x[id]);
        }
    });
    edit_form=$("#edit_form")
    edit_field=$("#edit_field")
};