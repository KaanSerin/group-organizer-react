'use client';
import { useState } from 'react';
import styles from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAlignRight,
  faBars,
  faComputer,
  faHouse,
  faSitemap,
  faUser,
  faEllipsisH as faEllipsis
} from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
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

  let className = [
    styles.sidebar,
    expanded && expandFixed ? styles.sidebarExpanded : styles.sidebarCollapsed,
    hovering ? styles.sidebarHovering : styles.sidebarNotHovering
  ].join(' ');

  const toggleIcon = expanded && expandFixed ? faAlignRight : faBars;
  const getLinkClasses = (isActive = false) => {
    return [styles.link, isActive ? styles.linkActive : ''].join(' ');
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

        <div className={getLinkClasses(true)}>
          <div className={styles.linkIconContainer}>
            <FontAwesomeIcon className={styles.logoIcon} onClick={onToggleClicked} icon={faHouse} />
          </div>
          {expanded ? <div className={styles.name}>Home</div> : <></>}
        </div>

        <div className={getLinkClasses(false)}>
          <div className={styles.linkIconContainer}>
            <FontAwesomeIcon
              className={styles.logoIcon}
              onClick={onToggleClicked}
              icon={faSitemap}
            />
          </div>
          {expanded ? <div className={styles.name}>Groups</div> : <></>}
        </div>

        <div className={getLinkClasses(false)}>
          <div className={styles.linkIconContainer}>
            <FontAwesomeIcon className={styles.logoIcon} onClick={onToggleClicked} icon={faUser} />
          </div>
          {expanded ? <div className={styles.name}>Account</div> : <></>}
        </div>
      </div>
    </section>
  );
}
