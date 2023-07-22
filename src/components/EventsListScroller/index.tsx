'use client';

import styles from './index.module.scss';
import InfiniteScroll from 'react-infinite-scroller';
import GroupEventCard, { Event } from '@/components/GroupEventCard';
import { useState } from 'react';
import axios from '@/libs/axios';
import { useParams } from 'next/navigation';

export default function EventsListScroller() {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const params = useParams();
  const pageLength = 5;

  const getEventsForGroup = async () => {
    console.log('here');
    try {
      setIsLoading(true);
      const queryParams: any = {
        pageLength
      };

      if (events && events.length > 0) {
        queryParams['cursor'] = events[events.length - 1]['id'];
      }

      const res = await axios.get(`/groups/${params.id}/events`, {
        params: queryParams
      });

      if (events[events.length - 1]?.id === res.data[res.data.length - 1]?.id) {
        setHasMore(false);
        return;
      }

      setEvents([...events, ...res.data.slice(events.length > 0 ? 1 : 0)]);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const hasMoreItems = events.length > 0 && isLoading ? false : hasMore;

  return (
    <div id={styles.scrollElement} className={styles.scrollElement}>
      <InfiniteScroll
        pageStart={0}
        className={styles.eventsList}
        loadMore={getEventsForGroup}
        hasMore={hasMoreItems}
        loader={<h5 className={'mt-2'}>Loading...</h5>}>
        {events.map((event) => (
          <GroupEventCard key={event.id} event={event} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
