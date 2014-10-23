from django.conf.urls import patterns, include, url
from django.contrib import admin
from comment import views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'no_comment.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.main_page),

    #CRUD + child
    url(r'^ajax/comment/get/(?P<comment_id>\d+)$', views.get_comment),
    url(r'^ajax/comment/child/(?P<comment_id>\d+)$', views.get_comment_child),
    url(r'^ajax/comment/create$', views.create_comment),
    url(r'^ajax/comment/update/(?P<comment_id>\d+)$', views.update_comment),
    url(r'^ajax/comment/delete/(?P<comment_id>\d+)$', views.delete_comment),
)
