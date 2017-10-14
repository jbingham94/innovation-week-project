
from rest_framework import serializers
from example_app.models import Secret, Post, UserProfile

from django.contrib.auth.models import User


class SecretSerializer(serializers.ModelSerializer):

    class Meta:
        model = Secret


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'id']


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
