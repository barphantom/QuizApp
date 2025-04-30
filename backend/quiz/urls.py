from django.urls import include,path
from rest_framework.routers import DefaultRouter
from . import views
from .views import QuizViewSet, QuestionViewSet, AnswerViewSet

quiz_list = QuizViewSet.as_view({'get': 'list'})

urlpatterns = [
    path('test', views.index, name='index'),
    path('quiz/', quiz_list, name='quiz-list'),
    path("quiz-test/", views.quiz_list, name="quiz-test"),
]