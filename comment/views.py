import json
from django.http import Http404, HttpResponse
from django.shortcuts import render, render_to_response

# Create your views here.
from django_ajax.decorators import ajax
from comment.models import Comment


@ajax
def comment_by_id(request, comment_id):
    try:
        comment = Comment.objects.get(id=int(comment_id))
    except:
        raise Http404()
    return render_to_response('comment.html', {'comment': comment})


@ajax
def get_child_by_id(request, comment_id):
    try:
        if comment_id == "0":
            children = Comment.objects.filter(parent=None)
        else:
            children = Comment.objects.filter(parent_id=int(comment_id))
    except:
        raise Http404()
    result = []
    for child in children.order_by('-timestamp'):
        result += [child.id]
    return result
    #return render_to_response("printArray.html", {'data': result})


def main_page(request):
    return render_to_response('main_page.html', {})

