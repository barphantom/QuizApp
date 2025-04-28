import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div>
      <h1>Rejestracja</h1>
      <form>
        <input type="text" placeholder="Nazwa użytkownika" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Hasło" required />
        <button type="submit">Zarejestruj się</button>
      </form>
      <p>
        Masz już konto? <Link to="/login">Zaloguj się</Link>
      </p>
    </div>
  );
}