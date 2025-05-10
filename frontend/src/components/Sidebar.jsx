import { Link } from 'react-router-dom';
import styles from '../styles/Sidebar.module.css';

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <ul className={styles.navList}>
                <li><Link to="/quizzes">Quizy</Link></li>
                <li><Link to="/create-quiz">Dodaj quiz</Link></li>
                <li><Link to="/dashboard">Profil</Link></li>
            </ul>
        </aside>
    );
}
