from django.contrib import admin
from example_app.models import Secret, UserProfile, Post, Comment, Category


admin.site.register(Secret)
admin.site.register(UserProfile)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Category)
