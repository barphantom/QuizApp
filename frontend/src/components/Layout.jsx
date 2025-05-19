import Navbar from './Navbar';
import Sidebar from "./Sidebar.jsx";
import styles from '../styles/Layout.module.css';

export default function Layout({ children, withSidebar = true }) {
  return (
    <div className={styles.container}>
        <Navbar />
        <div className={styles.contentArea}>
            {withSidebar && <Sidebar />}
            <main className={`${styles.mainContent} ${!withSidebar ? styles.fullWidth : ''}`}>
                {children}
            </main>
        </div>
    </div>
  );
}
