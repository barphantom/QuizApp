from django.db.models.expressions import result
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

# from .serializers import UserSerializer, NoteSerializer
from .serializers import NoteSerializer, RegisterSerializer, QuizSerializer, PublicQuizSerializer, QuizResultSerializer, \
    QuizStatsSerializer
from .models import Note, CustomUser, Quiz, QuizResult, AnswerSubmission


# class NoteListCreate(generics.ListCreateAPIView):
#     serializer_class = NoteSerializer
#     permission_classes = [IsAuthenticated]
#
#     def get_queryset(self):
#         user = self.request.user
#         return Note.objects.filter(author=user)
#
#     def perform_create(self, serializer):
#         if serializer.is_valid():
#             serializer.save(author=self.request.user)
#         else:
#             print(serializer.errors)
#
#
# class NoteDelete(generics.DestroyAPIView):
#     serializer_class = NoteSerializer
#     permission_classes = [IsAuthenticated]
#
#     def get_queryset(self):
#         user = self.request.user
#         return Note.objects.filter(author=user)
#
#
# class CreateUserView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [AllowAny]

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)


class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class QuizListCreateView(generics.ListCreateAPIView):
    serializer_class = QuizSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Quiz.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class QuizDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = QuizSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Quiz.objects.filter(author=self.request.user)

    def get_object(self):
        quiz = super().get_object()
        if quiz.author != self.request.user:
            raise PermissionDenied("Nie masz dostępu do tego quizu.")
        return quiz

    def perform_update(self, serializer):
        serializer.save(author=self.request.user)

    def perform_destroy(self, instance):
        instance.delete()


class JoinQuizView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, code):
        try:
            quiz = Quiz.objects.get(code=code)
        except Quiz.DoesNotExist:
            return Response({"detail": "Quiz not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = PublicQuizSerializer(quiz)
        return Response(serializer.data)


class SubmitQuizResultView(generics.CreateAPIView):
    serializer_class = QuizResultSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        result = serializer.save()

        score = result.score
        total = result.total

        headers = self.get_success_headers(serializer.data)
        return Response({"score": score, "total": total}, status=status.HTTP_201_CREATED, headers=headers)


class QuizStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, quiz_id):
        quiz = get_object_or_404(Quiz, id=quiz_id, author=request.user)

        total_participants = QuizResult.objects.filter(quiz=quiz).count()
        question_stats = []

        for question in quiz.questions.all():
            submissions = AnswerSubmission.objects.filter(question=question)
            total_answers = submissions.count()
            correct_answers = submissions.filter(selected_answer__is_correct=True).count()
            correct_percentage = (correct_answers / total_answers) * 100 if total_answers > 0 else 0.0

            question_stats.append({
                "question_id": question.id,
                "question_text": question.text,
                "total_answers": total_answers,
                "correct_answers": correct_answers,
                "correct_percentage": round(correct_percentage, 2),
            })
            print("DEBUG:", question_stats)

        quiz_stats = QuizStatsSerializer({
            "quiz_id": quiz.id,
            "quiz_title": quiz.title,
            "total_participants": total_participants,
            "questions": question_stats,
        })
        print("DEBUG:", question_stats)

        return Response(quiz_stats.data)
