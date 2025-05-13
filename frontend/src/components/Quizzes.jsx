import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import api from "../api.js";
import styles from "../styles/Quizzes.module.css"


export default function Quizzes() {
    const [quizzes, setQuizzes] = useState([])
    const [loading, setLoading] = useState(true)

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
                            <p>{quiz.created_at}</p>
                            <p>Liczba pytań: {quiz.questions.length}</p>
                        </div>
                        <Link to={`/quizzes/${quiz.id}`} className={styles.viewLink}>Szczegóły quizu</Link>
                        <Link to={`/quizzes/edit/${quiz.id}`} className={styles.editLink}>Edytuj</Link>
                        <button
                            onClick={() => deleteQuiz(quiz.id)}
                            className={styles.deleteButton}
                        >
                            Usuń
                        </button>

                    </li>
                ))}
            </ul>
        </div>
    )
}