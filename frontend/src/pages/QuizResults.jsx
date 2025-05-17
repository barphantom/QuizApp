import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../api.js";

export default function QuizResults() {
    const [quizData, setQuizData] = useState([])
    const [loading, setLoading] = useState(true)

    const { quizId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`api/quizzes/get-quiz-stats/${quizId}/`)
                setQuizData(response.data)
                console.log(response.data)

            } catch (error) {
                console.log(error)
                alert("Nie udało się pobrać informacji o odpowiedziach.")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [quizId]);

    if (loading) return <p>Ładowanie danych...</p>

    return (
        <>
            <h2>Pobrane dane:</h2>
            <p>ID: {quizData.quiz_id}</p>
            <p>Tytuł: {quizData.quiz_title}</p>
            <p>Liczba uczestników: {quizData.total_participants}</p>
            <ul>
                {quizData.questions.map((q, qIndex) => (
                    <li key={qIndex}>
                        <div>
                            <h3>Pytanie {qIndex + 1}. {q.question_text}</h3>
                            <p>Łącznie odpowiedzi: {q.total_answers}</p>
                            <p>Poprawnych odpowiedzi: {q.correct_answers}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}
