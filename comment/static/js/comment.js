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

window.onload = function () {
    getChildren(0,function(x) {
        for (var id in x) {
            loadComment($("#comments_root"), x[id]);
        }
    });
};