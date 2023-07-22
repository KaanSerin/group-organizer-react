import styles from './index.module.scss';
import EventsListScroller from '@/components/EventsListScroller';
import { useParams } from 'next/navigation';

export default function GroupEvents() {
  const params = useParams();

  return (
    <div className={styles.groupEvents}>
      <EventsListScroller fetchUrl={`/groups/${params.id}/events`} />
    </div>
  );
}
