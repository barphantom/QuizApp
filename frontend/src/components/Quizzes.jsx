import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import api from "../api.js";
import styles from "../styles/Quizzes.module.css"


export default function Quizzes() {
    const [quizzes, setQuizzes] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        getQuizzes()
    }, []);

    const getQuizzes = async () => {
        try {
            const response = await api.get("/api/quizzes/")
            setQuizzes(response.data)
        } catch (error) {
            alert(error)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const deleteQuiz = async (quizId) => {
        const confirmDelete = window.confirm("Czy na pewno chcesz usunąć ten quiz?")
        if (!confirmDelete) return;

        try {
            await api.delete(`/api/quizzes/${quizId}/`)
            setQuizzes((prev) => prev.filter((quiz) => quiz.id !== quizId))
        } catch (error) {
            alert("Błąd podczas usuwania quizu")
            console.log(error)
        }
    }

    if (loading) {
        return <p>Ładowanie quizów</p>
    }

    if (quizzes.length === 0) {
        return <p>Nie masz jeszcze żadnych quizów.</p>
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Twoje quizy: </h1>
            <ul className={styles.quizList}>
                {quizzes.map((quiz) => (
                    <li key={quiz.id} className={styles.quizItem}>
                        <div className={styles.quizInfo}>
                            <h2>{quiz.title}</h2>
                            <p>{new Date(quiz.created_at).toLocaleString("pl-Pl", {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</p>
                            <p>Liczba pytań: {quiz.questions.length}</p>
                            <p>Kod dołączenia: {quiz.code}</p>
                        </div>

                        <div className={styles.buttonGroup}>
                            <button onClick={() => navigate(`/quizzes/${quiz.id}`)}
                                    className={styles.quizButton}>Szczegóły
                            </button>
                            <button onClick={() => navigate(`/quizzes/edit/${quiz.id}`)}
                                    className={styles.quizButton}>Edytuj
                            </button>
                            <button onClick={() => deleteQuiz(quiz.id)}
                                    className={`${styles.quizButton} ${styles.deleteButton}`}>Usuń
                            </button>
                            <button onClick={() => navigate(`/quizzes/results/${quiz.id}`)}
                                    className={styles.quizButton}>Wyniki
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}