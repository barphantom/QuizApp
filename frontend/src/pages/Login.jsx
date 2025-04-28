import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div>
      <h1>Logowanie</h1>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Hasło" required />
        <button type="submit">Zaloguj się</button>
      </form>
      <p>
        Nie masz konta? <Link to="/register">Zarejestruj się</Link>
      </p>
    </div>
  );
}