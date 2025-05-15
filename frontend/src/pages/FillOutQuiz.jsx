import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

export default function FillOutQuiz() {
  const { code } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (location.state?.quiz) {
      setQuiz(location.state.quiz);
    } else {
      api
        .get(`/api/quizzes/join/${code}/`)
        .then((res) => setQuiz(res.data))
        .catch((err) => alert("Nie udało się pobrać quizu."));
    }
  }, [location, code]);

  const handleAnswerChange = (questionId, answerId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quiz) return;

    const answerList = quiz.questions.map((q) => ({
      question: q.id,
      selected_answer: answers[q.id],
    }));

    const payload = {
      quiz: quiz.id,
      answers: answerList,
    };

    setIsSubmitting(true);

    api
      .post("/api/quizzes/submit-quiz/", payload)
      .then((res) => {
        alert("Quiz został wysłany! Twój wynik: " + res.data.score + " / " + res.data.total);
        navigate("/");
      })
      .catch((err) => {
        alert("Wystąpił błąd przy zapisie wyników.");
        console.error(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (!quiz) return <div>Ładowanie quizu...</div>;

  return (
    <div>
      <h2>Quiz: {quiz.title}</h2>
      <form onSubmit={handleSubmit}>
        {quiz.questions.map((question, index) => (
          <div key={question.id}>
            <p>{index + 1}. {question.text}</p>
            {question.answers.map((answer) => (
              <div key={answer.id}>
                <label>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={answer.id}
                    checked={answers[question.id] === answer.id}
                    onChange={() => handleAnswerChange(question.id, answer.id)}
                    required
                  />
                  {answer.text}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Wysyłanie..." : "Wyślij odpowiedzi"}
        </button>
      </form>
    </div>
  );
}
