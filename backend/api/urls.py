from django.urls import path
from . import views
from .views import QuizListCreateView

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>", views.NoteDelete.as_view(), name="delete-note"),
    path("quizzes/", QuizListCreateView.as_view(), name="quiz-list-create"),
]

