import random, string

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, CustomUser, Answer, Question, Quiz, AnswerSubmission, QuizResult


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ["id", "username", "password"]
#         extra_kwargs = {"password": {"write_only": True}}
#
#     def create(self, validated_data):
#         user = User.objects.create_user(**validated_data)
#         return user

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ["id", "email", "password", "first_name", "last_name", "nickname"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ["text", "is_correct"]


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)

    class Meta:
        model = Question
        fields = ["text", "answers"]


def generate_unique_code():
    while True:
        code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        if not Quiz.objects.filter(code=code).exists():
            return code


class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Quiz
        fields = ["id", "title", "created_at", "code", "questions"]
        read_only_fields = ["id", "created_at"]

    def create(self, validated_data):
        questions_data = validated_data.pop("questions")
        quiz = Quiz.objects.create(code=generate_unique_code(), **validated_data)
        for question_data in questions_data:
            answers_data = question_data.pop("answers")
            question = Question.objects.create(quiz=quiz, **question_data)
            for answer_data in answers_data:
                Answer.objects.create(question=question, **answer_data)

        return quiz

    def update(self, instance, validated_data):
        questions_data = validated_data.pop("questions")

        instance.title = validated_data.get("title", instance.title)
        instance.save()

        instance.questions.all().delete()

        for question_data in questions_data:
            answers_data = question_data.pop("answers")
            question = Question.objects.create(quiz=instance, **question_data)
            for answer_data in answers_data:
                Answer.objects.create(question=question, **answer_data)

        return instance


class PublicAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ["id", "text"]


class PublicQuestionSerializer(serializers.ModelSerializer):
    answers = PublicAnswerSerializer(many=True)

    class Meta:
        model = Question
        fields = ["id", "text", "answers"]


class PublicQuizSerializer(serializers.ModelSerializer):
    questions = PublicQuestionSerializer(many=True)

    class Meta:
        model = Quiz
        fields = ["id", "title", "questions"]


class AnswerSubmissionSerializer(serializers.ModelSerializer):
    question = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all())
    selected_answer = serializers.PrimaryKeyRelatedField(queryset=Answer.objects.all())

    class Meta:
        model = AnswerSubmission
        fields = ["question", "selected_answer"]


class QuizResultSerializer(serializers.ModelSerializer):
    answers = AnswerSubmissionSerializer(many=True)
    quiz = serializers.PrimaryKeyRelatedField(queryset=Quiz.objects.all())

    class Meta:
        model = QuizResult
        fields = ["quiz", "answers"]

    def create(self, validated_data):
        answers_data = validated_data.pop("answers")
        quiz = validated_data["quiz"]
        user = self.context["request"].user if self.context["request"].user.is_authenticated else None

        total = quiz.questions.count()
        score = 0

        result = QuizResult.objects.create(quiz=quiz, user=user, score=0, total=total)

        for answer_data in answers_data:
            question = answer_data["question"]
            selected_answer = answer_data["selected_answer"]

            AnswerSubmission.objects.create(result=result, question=question, selected_answer=selected_answer)

            if selected_answer.is_correct:
                score += 1

        result.score = score
        result.save()

        return result


class QuestionStatsSerializer(serializers.Serializer):
    question_id = serializers.IntegerField()
    question_text = serializers.CharField()
    total_answers = serializers.IntegerField()
    correct_answers = serializers.IntegerField()
    correct_percentage = serializers.FloatField()


class QuizStatsSerializer(serializers.Serializer):
    quiz_id = serializers.IntegerField()
    quiz_title = serializers.CharField()
    total_participants = serializers.IntegerField()
    questions = QuestionStatsSerializer(many=True)
