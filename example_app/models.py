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
    user = models.OneToOneField('auth.user')

    def __unicode__(self):
        return self.user.username


class Category(models.Model):
    name = models.CharField(max_length=50)

    def __unicode__(self):
        return self.name


class Post(models.Model):
    author = models.ForeignKey(UserProfile)
    category = models.ForeignKey(Category)
    date = models.DateTimeField()
    title = models.CharField(max_length=300)
    body = models.TextField()
    score = models.IntegerField()
    upvoters = models.ManyToManyField(UserProfile, related_name='upvoters', blank=True)
    downvoters = models.ManyToManyField(UserProfile, related_name='downvoters', blank=True)

    @property
    def author_username(self):
        return self.author.user.username

    @property
    def category_name(self):
        return self.category.name

    def __unicode__(self):
        return self.title


class Comment(models.Model):
    author = models.ForeignKey(UserProfile)
    date = models.DateTimeField()
    text = models.TextField()
    post = models.ForeignKey(Post)
    parent = models.ForeignKey('Comment', blank=True, null=True)

    @property
    def author_username(self):
        return self.author.user.username

    def __unicode__(self):
        return self.text


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
