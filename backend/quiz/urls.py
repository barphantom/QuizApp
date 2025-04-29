from django.urls import include,path
from rest_framework.routers import DefaultRouter
from . import views
from .views import QuizViewSet, QuestionViewSet, AnswerViewSet

router = DefaultRouter()
router.register(r'quizzes', QuizViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'answers', AnswerViewSet)

urlpatterns = [
    path('test', views.index, name='index'),
    path('', include(router.urls)),
]