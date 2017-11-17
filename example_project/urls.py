"""example_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin

from example_app.views import (
    index_view,
    SaveNewUserView,
    activate,
    SecretListAPIView,
    SecretDetailAPIView,
    ObtainAuthToken,
    UserListAPIView,
    UserDetailAPIView,
    PostListAPIView,
    PostDetailAPIView,
    UserProfileListAPIView,
    UserProfileDetailAPIView,
    CategoryListAPIView,
    CommentListAPIView,
    CommentDetailAPIView,
    SetPasswordView,
    ResetPasswordView,
    SendCommentNotificationView,
    VoteView
)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/api-token-auth/$', ObtainAuthToken.as_view(), name="obtain_auth_token"),
    url(r'^api/secrets/$', SecretListAPIView.as_view(), name="secret_list_api_view"),
    url(r'^api/secrets/(?P<pk>\d+)/$', SecretDetailAPIView.as_view(), name="secret_detail_api_view"),
    url(r'^api/users/$', UserListAPIView.as_view(), name="user_list_api_view"),
    url(r'^api/users/(?P<pk>\d+)/$', UserDetailAPIView.as_view(), name="user_detail_api_view"),
    url(r'^api/posts/$', PostListAPIView.as_view(), name="post_list_api_view"),
    url(r'^api/posts/(?P<pk>\d+)/$', PostDetailAPIView.as_view(), name="post_detail_api_view"),
    url(r'^api/user-profiles/$', UserProfileListAPIView.as_view(), name="user_profile_list_api_view"),
    url(r'^api/user-profiles/(?P<pk>\d+)/$', UserProfileDetailAPIView.as_view(), name="user_profile_detail_api_view"),
    url(r'^api/categories/$', CategoryListAPIView.as_view(), name="category_list_api_view"),
    url(r'^api/comments/$', CommentListAPIView.as_view(), name="comment_list_api_view"),
    url(r'^api/signup/$', SaveNewUserView.as_view(), name='signup_view'),
    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        activate, name='activate'),
    url(r'^api/set-password/$', SetPasswordView.as_view(), name='set_password_view'),
    url(r'^api/reset-password/$', ResetPasswordView.as_view(), name='reset_password_view'),
    url(r'^api/comments/(?P<pk>\d+)/$', CommentDetailAPIView.as_view(), name="comment_detail_api_view"),
    url(r'^api/send-comment-notification', SendCommentNotificationView.as_view(), name='send_comment_notification_view'),
    url(r'^api/vote', VoteView.as_view(), name='vote_view'),
    url(r'^', index_view, name="index_view"),
]
