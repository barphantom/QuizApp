import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api.js";
import styles from '../styles/QuizDetails.module.css';

export default function QuizDetails() {
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { quizId } = useParams();

    useEffect(() => {
        fetchQuiz();
    }, []);

    const fetchQuiz = () => {
        api
            .get(`/api/quizzes/${quizId}/`)
            .then((response) => {
                setQuiz(response.data);
            })
            .catch((error) => {
                alert(error);
                console.log("Błąd podczas pobierania quizu", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (loading) return <p className={styles.loading}>Ładowanie quizu...</p>;
    if (error) return <p className={styles.error}>Wystąpił błąd: {error.message}</p>;
    if (quiz === null) return <p className={styles.noData}>Brak danych quizu</p>;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>{quiz.title}</h1>
            <span className={styles.creationDate}>
                Stworzony: {formatDate(quiz.created_at)}
            </span>

            <ul className={styles.questionsList}>
                {quiz.questions.map((q, index) => (
                    <li key={index} className={styles.questionItem}>
                        <h3 className={styles.questionText}>
                            {index + 1}. {q.text}
                        </h3>
                        <ul className={styles.answersList}>
                            {q.answers.map((answer, idx) => (
                                <li
                                    key={idx}
                                    className={styles.answerItem}
                                    style={{
                                        fontWeight: answer.is_correct ? 'bold' : 'normal',
                                        color: answer.is_correct ? '#27ae60' : 'inherit'
                                    }}
                                >
                                    {answer.text}
                                    {answer.is_correct && (
                                        <span> ✓</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}