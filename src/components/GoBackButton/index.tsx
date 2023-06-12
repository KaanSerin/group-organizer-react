import styles from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function GoBackButton({
  href,
  className,
  children
}: {
  href: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={[styles.goBackButton, className, 'btn btn-outline-purple'].join(' ')}>
      <FontAwesomeIcon icon={faChevronLeft} />
      {children}
    </Link>
  );
}
