
from rest_framework import serializers, fields
from example_app.models import Secret, Post, UserProfile, Category, Comment

from django.contrib.auth.models import User


class SecretSerializer(serializers.ModelSerializer):

    class Meta:
        model = Secret


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'id']


class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField()

    class Meta:
        model = Post


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category


class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField()

    class Meta:
        model = Comment
