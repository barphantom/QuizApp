from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from rest_framework import viewsets
from .models import Quiz, Question, Answer
from .serializers import QuizSerializer, QuestionSerializer, AnswerSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view

def index(request):
    template = loader.get_template('test.html')
    return HttpResponse(template.render())

@api_view(['POST'])
def quiz_list(request):
    if request.method == 'POST':
        data = request.data
        name = data.get('name', 'bartek')
        print(name)
        return Response({"message": "Quiz list view"})
    return Response({"error": "Invalid request method"}, status=400)

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    permission_classes = [AllowAny]  # Allow any user to access this view
    
    def list(self, request, *args, **kwargs):
        return HttpResponse("Hello, world! This is the quiz list view.")

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [AllowAny]  # Allow any user to access this view

class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = [AllowAny]  # Allow any user to access this view
