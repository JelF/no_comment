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
    return render_to_response('comment.html', {'comment': comment})

def main_page(request):
    return render_to_response('main_page.html', {})