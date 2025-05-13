import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import api from "../api.js";


export default function QuizDetails() {
    const [quiz, setQuiz] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { quizId } = useParams()

    useEffect(() => {
        fetchQuiz()
    }, []);

    const fetchQuiz = () => {
        api
            .get(`/api/quizzes/${quizId}/`)
            .then((response => {
                setQuiz(response.data)
            }))
            .catch((error) => {
                alert(error)
                console.log("Błąd podczas pobierania quizu", error)
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    if (loading) return <p>Ładowanie quizu</p>
    if (error) return <p>{error}</p>
    if (quiz === null) return <p>Brak danych...</p>


    return (
        <>
            <h2>{quiz.title}</h2>
            <p>Stworzony: {quiz.created_at}</p>
            <ul>
                {quiz.questions.map((q, index) => (
                    <div key={index}>
                        <h3>{index + 1}. {q.text}</h3>
                        <ul>
                            {q.answers.map((answer, idx) => (
                                <li key={idx}>{answer.text}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </ul>
        </>
    )
}