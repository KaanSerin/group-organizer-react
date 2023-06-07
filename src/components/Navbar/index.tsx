import styles from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const onToggleClicked = () => {};

  return (
    <nav className={styles.navbar}>
      <FontAwesomeIcon className={styles.toggleBtn} onClick={onToggleClicked} icon={faBars} />
      <section className={styles.user}>
        <FontAwesomeIcon className={styles.bellIcon} icon={faBell} />
        <div className={'d-flex align-items-center po'}>
          <FontAwesomeIcon className={styles.userIcon} icon={faUserCircle} />
          <div className={styles.userName}>Admin User</div>
        </div>
      </section>
    </nav>
  );
}
