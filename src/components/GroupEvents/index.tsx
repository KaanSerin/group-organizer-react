import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import GroupEventCard, { Event } from '@/components/GroupEventCard';
import axios from '@/libs/axios';
import { useParams } from 'next/navigation';

export default function GroupEvents() {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>();
  const params = useParams();

  const getEventsForGroup = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/groups/${params.id}/events`);
      setEvents(res.data);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getEventsForGroup();
  }, []);

  return (
    <div className={styles.eventsContainer}>
      {isLoading ? (
        <p>Loading...</p>
      ) : events && events.length > 0 ? (
        events.map((event) => <GroupEventCard key={event.id} event={event} />)
      ) : (
        <p>No upcoming events for group</p>
      )}
    </div>
  );
}
