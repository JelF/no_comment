function loadComment(e) {
    ajaxGet("ajax/comment/get/root",null,function(res) {
        e.html(res);
        return true;
    }, null);
}

window.onload=function() {
    loadComment($("#comments_root"));
}