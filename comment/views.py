import json
from django.http import Http404, HttpResponse
from django.shortcuts import render, render_to_response

# Create your views here.
from django_ajax.decorators import ajax
from comment.models import Comment


@ajax
def get_comment(request, comment_id):
    try:
        comment = Comment.objects.get(id=int(comment_id))
    except:
        raise Http404()
    return render_to_response('comment.html', {'comment': comment, 'child_count': comment.child.count})


@ajax
def get_comment_child(request, comment_id):
    try:
        if comment_id == "0":
            children = Comment.objects.filter(parent=None)
        else:
            children = Comment.objects.filter(parent_id=int(comment_id))
    except:
        raise Http404()
    result = []
    for child in children.order_by('timestamp'):
        result += [child.id]
    return result
    #return render_to_response("printArray.html", {'data': result})

@ajax
def create_comment(request):
    parent_id=request.POST['parent']
    try:
        if parent_id == "0":
            parent=None
        else:
            parent=Comment.objects.get(id=parent_id)
        comment = Comment()
        comment.parent=parent
        comment.text=request.POST['text']
        comment.save()
    except:
        raise Http404
    return comment.id

@ajax
def update_comment(request,comment_id):
    try:
        comment = Comment.objects.get(id=int(comment_id))
        comment.text=request.POST['text']
        comment.save()
    except:
        raise Http404()
    return "OK"

@ajax
def delete_comment(request,comment_id):
    try:
        Comment.objects.filter(id=int(comment_id)).delete()
    except:
        raise Http404()
    return "OK"


def main_page(request):
    return render_to_response('main_page.html', {})

