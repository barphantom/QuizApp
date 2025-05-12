import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import api from "../api.js";


export default function QuizDetails() {
    const [quiz, setQuiz] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { quizId } = useParams()

    useEffect(() => {
        // fetchQuiz()
        // Tylo do testów, gdy nie ma endpoint'u w backendzie
        setQuiz(
{
        "id": 1,
        "title": "Quiz o Django",
        "created_at": "2025-05-10T18:29:30.050533Z",
        "questions": [
            {
                "text": "Czym jest Django?",
                "answers": [
                    {
                        "text": "Framework JavaScript",
                        "is_correct": false
                    },
                    {
                        "text": "Framework Python",
                        "is_correct": true
                    },
                    {
                        "text": "Baza danych",
                        "is_correct": false
                    },
                    {
                        "text": "System operacyjny",
                        "is_correct": false
                    }
                ]
            },
            {
                "text": "Który model odpowiada za użytkownika?",
                "answers": [
                    {
                        "text": "User",
                        "is_correct": true
                    },
                    {
                        "text": "Account",
                        "is_correct": false
                    },
                    {
                        "text": "Client",
                        "is_correct": false
                    },
                    {
                        "text": "Admin",
                        "is_correct": false
                    }
                ]
            }
        ]
    }
        )
    setLoading(false)
    // ^ Do tąd usunąć, gdy /quizzes/$id zostanie stworzone
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