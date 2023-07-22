import EventsListScroller from '@/components/EventsListScroller';

export default function Dashboard() {
  return (
    <div className={'h-100 pb-2'}>
      <h3 className={'fw-semibold'}>Upcoming Events</h3>

      <EventsListScroller fetchUrl={`/groups/upcoming_events`} />
    </div>
  );
}
