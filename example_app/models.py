from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


# From boilerplate
class Secret(models.Model):
    owner = models.ForeignKey('auth.user')
    body = models.TextField()


class UserProfile(models.Model):
    user = models.ForeignKey('auth.user')
    upvoted_posts = models.ManyToManyField('Post', related_name='upvoted_posts')
    downvoted_posts = models.ManyToManyField('Post', related_name='downvoted_posts')


class Category(models.Model):
    name = models.CharField(max_length=50)


class Post(models.Model):
    author = models.ForeignKey(UserProfile)
    category = models.ForeignKey(Category)
    date = models.DateTimeField()
    title = models.CharField(max_length=300)
    body = models.TextField()
    score = models.IntegerField()
    upvoters = models.ManyToManyField(UserProfile, related_name='upvoters')
    downvoters = models.ManyToManyField(UserProfile, related_name='downvoters')


class Comment(models.Model):
    author = models.ForeignKey(UserProfile)
    date = models.DateTimeField()
    text = models.TextField()
    post = models.ForeignKey(Post)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
