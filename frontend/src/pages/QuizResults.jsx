import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api.js";
import styles from '../styles/QuizResults.module.css';

export default function QuizResults() {
    const [quizData, setQuizData] = useState(null);
    const [loading, setLoading] = useState(true);

    const { quizId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`api/quizzes/get-quiz-stats/${quizId}/`);
                setQuizData(response.data);
            } catch (error) {
                console.error(error);
                alert("Nie udało się pobrać informacji o odpowiedziach.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [quizId]);

    if (loading) return <p className={styles.loading}>Ładowanie danych...</p>;
    if (!quizData) return <p className={styles.loading}>Brak danych do wyświetlenia</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Statystyki quizu</h1>

            <div className={styles.quizInfo}>
                <p className={styles.infoItem}>
                    <span className={styles.infoLabel}>ID quizu:</span> {quizData.quiz_id}
                </p>
                <p className={styles.infoItem}>
                    <span className={styles.infoLabel}>Tytuł:</span> {quizData.quiz_title}
                </p>
                <p className={styles.infoItem}>
                    <span className={styles.infoLabel}>Liczba uczestników:</span> {quizData.total_participants}
                </p>
            </div>

            <ul className={styles.questionsList}>
                {quizData.questions.map((q, qIndex) => (
                    <li key={qIndex} className={styles.questionItem}>
                        <h3 className={styles.questionHeader}>
                            Pytanie {qIndex + 1}. {q.question_text}
                        </h3>

                        <div className={styles.statsContainer}>
                            <div className={`${styles.statItem} ${styles.totalAnswers}`}>
                                <div className={styles.statValue}>{q.total_answers}</div>
                                <div className={styles.statLabel}>Łącznie odpowiedzi</div>
                            </div>

                            <div className={`${styles.statItem} ${styles.correctAnswers}`}>
                                <div className={styles.statValue}>
                                    {q.correct_answers} ({q.correct_percentage}%)
                                </div>
                                <div className={styles.statLabel}>Poprawnych odpowiedzi</div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}