from django.urls import path
from . import views
from .views import QuizListCreateView, QuizDetailView, JoinQuizView, SubmitQuizResultView

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("quizzes/", QuizListCreateView.as_view(), name="quiz-list-create"),
    path("quizzes/<int:pk>/", QuizDetailView.as_view(), name="quiz-detail"),
    path("quizzes/join/<str:code>/", JoinQuizView.as_view(), name="join-quiz"),
    path("quizzes/submit-quiz/", SubmitQuizResultView.as_view(), name="submit-quiz"),
]

