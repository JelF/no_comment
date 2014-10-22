from django.conf.urls import patterns, include, url
from django.contrib import admin
from comment import views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'no_comment.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.main_page),
    url(r'^ajax/comment/get/(?P<comment_id>\d+)$',views.comment_by_id),
)
