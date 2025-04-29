import { useNavigate } from 'react-router-dom';
import styles from '../styles/Home.module.css';

export default function Home() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = e.target.code.value;
    console.log('Kod quizu:', code);
    // navigate(`/quiz/${code}`); // Przekierowanie po sprawdzeniu kodu
  };

  return (
    <div className={styles.container}>
      <h2>Dołącz do quizu</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="code"
          placeholder="Wpisz kod quizu"
          required
        />
        <button type="submit">Dołącz</button>
      </form>
    </div>
  );
}