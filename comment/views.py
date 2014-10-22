from django.http import Http404
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
    return render_to_response('comment.html', {'comment': comment, 'children': comment.child})

@ajax
def root_comments(request):
    comments= Comment.objects.filter(parent=None)
    return render_to_response('comment.html', {'comment': False, 'children': comments})

def main_page(request):
    return render_to_response('main_page.html', {})