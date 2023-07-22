import styles from './index.module.scss';
import EventsListScroller from '@/components/EventsListScroller';

export default function GroupEvents() {
  return (
    <div className={styles.groupEvents}>
      <EventsListScroller />
    </div>
  );
}
