import {useState} from "react";
import api from "../api.js";
import {useNavigate} from "react-router-dom";
import styles from "../styles/CreateQuiz.module.css"


export default function CreateQuiz() {
    const [title, setTitle] = useState("")
    const [questions, setQuestions] = useState([
        {
            text: "",
            answers: [
                { text: "", is_correct: false },
                { text: "", is_correct: false },
                { text: "", is_correct: false },
                { text: "", is_correct: false },
            ],
        },
    ])

    const navigate = useNavigate()

    const handleQuestionChange = (qIndex, field, value) => {
        const updated = [...questions]
        updated[qIndex][field] = value
        setQuestions(updated)
    }

    const handleAnswerChange = (qIndex, aIndex, field, value) => {
        const updated = [...questions]
        if (field === "is_correct") {
            updated[qIndex].answers = updated[qIndex].answers.map((a, index) => ({
                ...a,
                is_correct: index === aIndex
            }))
        } else {
            updated[qIndex].answers[aIndex].text = value
        }
        setQuestions(updated)
    }

    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                text: "",
                answers: [
                    { text: "", is_correct: false },
                    { text: "", is_correct: false },
                    { text: "", is_correct: false },
                    { text: "", is_correct: false },
                ],
            },
        ])
    }

    const removeQuestion = (qIndex) => {
        if (questions.length === 1) {
            alert("Quiz musi zawierać przynajmniej jedno pytanie.")
            return
        }
        const updated = questions.filter((_, index) => index !== qIndex)
        setQuestions(updated)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        // Walidacja pól
        if (!title.trim()) {
            alert("Tytuł nie może być pusty.");
            return;
        }

        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            if (!q.text.trim()) {
                alert(`Pytanie ${i + 1} jest puste.`);
                return;
            }

            const hasEmptyAnswer = q.answers.some(a => !a.text.trim());
            if (hasEmptyAnswer) {
                alert(`Jedna z odpowiedzi w pytaniu ${i + 1} jest pusta.`);
                return;
            }

            const correctCount = q.answers.filter(a => a.is_correct).length;
            if (correctCount !== 1) {
                alert(`Pytanie ${i + 1} musi mieć dokładnie jedną poprawną odpowiedź.`);
                return;
            }
        }

        try {
            await api.post("api/quizzes/", { title, questions })
            alert("Quiz został stworzony!")
            navigate("/quizzes/")
        } catch (error) {
            console.error("Błąd podczas zapisywania quizu", error)
            alert("Błąd przy zapisie")
        }
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Utwórz nowy quiz</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label} htmlFor="quiz-title">Tytuł quizu: </label>
                <input
                    type="text"
                    id="quiz-title"
                    className={styles.textInput}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                />
                <hr className={styles.divider} />
                {questions.map((q, qIndex) => (
                    <div key={qIndex} className={styles.questionBlock}>
                        <h3 className={styles.questionTitle}>Pytanie {qIndex + 1}</h3>
                        <button
                            type="button"
                            className={styles.removeQuestionBtn}
                            onClick={() => removeQuestion(qIndex)}
                        >
                            Usuń pytanie
                        </button>
                        <input
                            type="text"
                            className={styles.textInput}
                            value={q.text}
                            onChange={(e) => handleQuestionChange(qIndex, "text", e.target.value)}
                            placeholder="Treść pytania"
                            required
                        />
                        <ul className={styles.answersList}>
                            {q.answers.map((a, aIndex) => (
                                <li key={aIndex} className={styles.answerItem}>
                                    <label className={styles.answerLabel} htmlFor={`answer-${qIndex}-${aIndex}`}>
                                        Odpowiedź {aIndex + 1}
                                    </label>
                                    <input
                                        type="text"
                                        className={styles.answerInput}
                                        id={`answer-${qIndex}-${aIndex}`}
                                        value={a.text}
                                        onChange={(e) => handleAnswerChange(qIndex, aIndex, "text", e.target.value)}
                                        placeholder={`Odpowiedź ${aIndex + 1}`}
                                        required
                                    />
                                    <label className={styles.correctAnswerLabel}>
                                        <input
                                            type="radio"
                                            name={`correct-${qIndex}`}
                                            checked={a.is_correct}
                                            onChange={() => handleAnswerChange(qIndex, aIndex, "is_correct", true)}
                                        />
                                        Poprawna
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                <div className={styles.actionButtons}>
                    <button
                        type="button"
                        className={styles.addQuestionBtn}
                        onClick={addQuestion}
                    >
                        Dodaj pytanie
                    </button>
                    <button
                        type="submit"
                        className={styles.submitQuizBtn}
                    >
                        Utwórz quiz
                    </button>
                </div>
            </form>
        </div>
    )
}