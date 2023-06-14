import styles from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

export default function Navbar({ onToggleClicked }: { onToggleClicked: () => void }) {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <FontAwesomeIcon className={styles.toggleBtn} onClick={onToggleClicked} icon={faBars} />
      <section className={styles.user}>
        <FontAwesomeIcon className={styles.bellIcon} icon={faBell} />
        <div onClick={() => router.push('/account')} className={styles.userNameIcon}>
          <FontAwesomeIcon className={styles.userIcon} icon={faUserCircle} />
          <div className={styles.userName}>Admin User</div>
        </div>
      </section>
    </nav>
  );
}
