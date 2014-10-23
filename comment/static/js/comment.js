function comment_element(id) {
    return $("#comment_body_"+id);
}

function comment_get_children_count(e) {
    return $(".child_count",e).text()*1;
}

function comment_set_children_count(e,count) {
    $(".child_count",e).text(count);
}
function comment_inc_children_count(e) {
    comment_set_children_count(e,comment_get_children_count(e)+1)
}

function comment_get_parent(e) {
    var first= e.parent().parent();
    if(first.hasClass("comments_root")) {
        return false;
    }
    return comment_element(comment_get_id(first.parent()));
}

function comment_get_child_root(id) {
    return $("#child_root_"+id);
}

function comment_child_root(e) {
    return comment_get_child_root(comment_get_id(e));
}

function isDeep(e) {
    for(var deep=3;deep>0;deep--) { //5 is a constant
        e = comment_get_parent(e);
        if(e==false) {
            return false;
        }
    }
    return true;
}

function comment_get_id(e) {
    var div_id = e.attr('id');
    return /comment.*_(\d+)/.exec(div_id)[1]*1;
}

function comment_expand(e) {
    //Comment saves information was his child loaded and is he expanded in values
    var child_root = comment_child_root(e);
    if(!e.val()) {
        loadComments(child_root,comment_get_id(e));
        e.val(true);
    }
    child_root.show();
    $(".expand_btn",e).hide();
    $(".collapse_btn",e).show();
    e.val(true);

}

function comment_collapse(e) {
    comment_child_root(e).hide();
    $(".expand_btn",e).show();
    $(".collapse_btn",e).hide();
}

function comment_insert(e,text) {
    comment_expand(e);
    comment_inc_children_count(e);
    comment_child_root(e).prepend(text);

}

function comment_init(id) {
    var e = comment_element(id);
    if(comment_get_children_count(e)!=0) {
        if(!isDeep(e)) {
            comment_expand(e);
        } else {
            comment_collapse(e);
        }
    }
}

function collapse(id) {
    comment_collapse(comment_element(id));
}


function expand(id) {
    comment_expand(comment_element(id));
}

function comment_main(e) {
    return $(".comment_main",e);
}