
from django.shortcuts import render
from django.contrib.auth.models import User
import json
import pdb
from django.contrib.auth.forms import SetPasswordForm
from django.conf import settings
import string
import random
from django.http import JsonResponse
from .forms import SignupForm
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView
from rest_framework import views
from rest_framework import parsers
from rest_framework import renderers
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from .tokens import account_activation_token
from django.contrib.auth.models import User
from django.core.mail import EmailMessage

from example_app.models import Secret, Post, UserProfile, Category, Comment
from example_app.serializers import SecretSerializer, UserSerializer, PostSerializer, UserProfileSerializer, CategorySerializer, CommentSerializer


def index_view(request):
    return render(request, 'index.html')


def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.backend = 'django.contrib.auth.backends.ModelBackend'
        user.save()
        login(request, user)

        return redirect('/reset-password')
        # return redirect('http://' + current_site.domain + '/set-password/')
        # return HttpResponse('Thank you for your email confirmation. Now you can login your account.')
    else:
        return HttpResponse('Activation link is invalid!')


class SetPasswordView(views.APIView):
    serializer_class = UserSerializer

    def post(self, request):
        """
        api endpoint to set password for a given user
        :param request:
        :return:
        """
        try:
            payload = json.loads(request.body)
        except ValueError:
            return JsonResponse({"error": "Unable to parse request body"}, status=400)

        form = SetPasswordForm(payload)
        if form.is_valid():
            user = User.objects.filter(pk=self.request.user.id)


class ResetPasswordView(views.APIView):
    throttle_classes = ()
    permission_classes = ()
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)

    def post(self, request):
        try:
            user = User.objects.get(id=int(request.data['user_id']))
            print user
            print user.check_password(request.data['old_password'])
            if not user.check_password(request.data['old_password']):
                return JsonResponse({"error": "Old password incorrect"}, status=400)
            else:
                try:
                    user.set_password(request.data['new_password'])
                    user.save()
                    response_data = {}
                    response_data['message'] = 'Reset password successful'
                    return HttpResponse(json.dumps(response_data), status=200, content_type='application/json')
                except:
                    return JsonResponse({"error": "Old password incorrect"}, status=400)
        except:
            return JsonResponse({"error": "Unable to parse request body"}, status=400)


class SaveNewUserView(views.APIView):
    throttle_classes = ()
    permission_classes = ()
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)

    def post(self, request):
        """
            api endpoint to register a new user
            :param request:
            :return:
            """
        print "Save New User Hits!"
        try:
            payload = json.loads(request.body)
        except ValueError:
            return JsonResponse({"error": "Unable to parse request body"}, status=400)

        form = SignupForm(payload)

        if form.is_valid():
            password = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(20))
            user = User.objects.create_user(form.cleaned_data["username"],
                                            form.cleaned_data["email"],
                                            password)
            user.save()
            user_profile = UserProfile.objects.create(user=user)
            user_profile.save()
            current_site = get_current_site(request)
            message = render_to_string('acc_active_email.html', {
                'user': user,
                'domain': current_site.domain,
                'password': password
            })
            mail_subject = 'Activate your account'
            to_email = form.cleaned_data.get('email')
            email = EmailMessage(mail_subject, message, to=[to_email])
            email.send()
            response_data = {}
            response_data['message'] = 'Please confirm your email address to complete the registration'
            return HttpResponse(json.dumps(response_data), status=201, content_type='application/json')

        return HttpResponse(form.errors.as_json(), status=400, content_type="application/json")


class ObtainAuthToken(views.APIView):
    throttle_classes = ()
    permission_classes = ()
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)

    def post(self, request):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user_id': user.pk})


class SecretListAPIView(ListCreateAPIView):
    serializer_class = SecretSerializer

    def get_queryset(self):
        return Secret.objects.filter(owner=self.request.user)


class SecretDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = SecretSerializer

    def get_queryset(self):
        return Secret.objects.filter(owner=self.request.user)


class UserListAPIView(ListCreateAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.all()


class UserDetailAPIView(RetrieveAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(pk=self.request.user.id)


class PostListAPIView(ListCreateAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.all()


class PostDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.all()


class UserProfileListAPIView(ListCreateAPIView):
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        return UserProfile.objects.all()


class UserProfileDetailAPIView(RetrieveAPIView):
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)


class CategoryListAPIView(ListCreateAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.all()


class CommentListAPIView(ListCreateAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.objects.all()


class CommentDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.objects.all()