import Navbar from './Navbar';
import Sidebar from "./Sidebar.jsx";
import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
        <Navbar />
        <div className={styles.contentArea}>
            <Sidebar />
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    </div>
  );
}
