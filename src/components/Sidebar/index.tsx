'use client';
import { useContext, useState } from 'react';
import styles from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAlignRight,
  faBars,
  faComputer,
  faHouse,
  faSitemap,
  faUser,
  faEllipsisH as faEllipsis,
  faDoorOpen
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import axios from '@/libs/axios';
import { usePathname, useRouter } from 'next/navigation';
import AuthContext from '@/contexts/AuthContext';

export default function Sidebar() {
  const router = useRouter();
  const pathName = usePathname();
  const { user, setUser } = useContext(AuthContext);
  const [expandFixed, setExpandFixed] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [hovering, setHovering] = useState(false);

  const onToggleClicked = () => {
    if (!expandFixed) {
      setExpandFixed(true);
      return;
    }

    setExpandFixed(!expandFixed);
    if (!hovering) {
      setExpanded(!expanded);
    }
  };
  const onMouseEnter = () => {
    if (!expandFixed) {
      setExpanded(true);
    }
    setHovering(true);
  };

  const onMouseLeave = () => {
    if (!expandFixed) {
      setExpanded(false);
    }
    setHovering(false);
  };

  const logout = async () => {
    try {
      await axios.post('auth/logout');
      setUser(null);
      localStorage.removeItem('user');
      router.push('/signin');
    } catch (e) {
      console.log(e);
    }
  };

  let className = [
    styles.sidebar,
    expanded && expandFixed ? styles.sidebarExpanded : styles.sidebarCollapsed,
    hovering ? styles.sidebarHovering : styles.sidebarNotHovering
  ].join(' ');

  const toggleIcon = expanded && expandFixed ? faAlignRight : faBars;
  const getLinkClasses = (route: string, includeSubdomains: boolean = true) => {
    if (includeSubdomains) {
      const pathParts = pathName.split('/');
      return [styles.link, pathParts[1] === route ? styles.linkActive : ''].join(' ');
    } else {
      return [
        styles.link,
        pathName.replace('/', '') === route.replace('/', '') ? styles.linkActive : ''
      ].join(' ');
    }
  };

  return (
    <section className={className}>
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={styles.sideBarInner}>
        <div className={'text-end'}>
          <FontAwesomeIcon
            className={styles.toggleBtn}
            onClick={onToggleClicked}
            icon={toggleIcon}
          />
        </div>

        <div className={styles.logo}>
          <FontAwesomeIcon
            className={styles.logoIcon}
            onClick={onToggleClicked}
            icon={faComputer}
          />
          {expanded ? <div className={styles.companyName}>Organiser Pro</div> : <></>}
        </div>

        <div className={styles.linksHeader}>
          {expanded ? (
            <div>MENU</div>
          ) : (
            <FontAwesomeIcon onClick={onToggleClicked} icon={faEllipsis} />
          )}
        </div>

        <Link href={'/dashboard'} className={getLinkClasses('dashboard', false)}>
          <div className={styles.linkIconContainer}>
            <FontAwesomeIcon className={styles.logoIcon} onClick={onToggleClicked} icon={faHouse} />
          </div>
          {expanded ? <div className={styles.name}>Dashboard</div> : <></>}
        </Link>

        <Link href={'/groups'} className={getLinkClasses('groups')}>
          <div className={styles.linkIconContainer}>
            <FontAwesomeIcon
              className={styles.logoIcon}
              onClick={onToggleClicked}
              icon={faSitemap}
            />
          </div>
          {expanded ? <div className={styles.name}>Groups</div> : <></>}
        </Link>

        <Link href={'/account'} className={getLinkClasses('account')}>
          <div className={styles.linkIconContainer}>
            <FontAwesomeIcon className={styles.logoIcon} onClick={onToggleClicked} icon={faUser} />
          </div>
          {expanded ? <div className={styles.name}>Account</div> : <></>}
        </Link>

        <div className={styles.divider} />

        <div onClick={logout} className={getLinkClasses('#')}>
          <div className={styles.linkIconContainer}>
            <FontAwesomeIcon
              className={styles.logoIcon}
              onClick={onToggleClicked}
              icon={faDoorOpen}
            />
          </div>
          {expanded ? <div className={styles.name}>Logout</div> : <></>}
        </div>
      </div>
    </section>
  );
}
