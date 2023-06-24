import Card from '@/components/Card';
import Skeleton from 'react-loading-skeleton';

export default function GroupAbout({ about }: { about?: string }) {
  return (
    <Card>
      {about ? (
        <p>{about}</p>
      ) : (
        <>
          <Skeleton height="1rem" width="100%" />
          <Skeleton height="1rem" width="100%" />
          <Skeleton height="1rem" width="100%" />
          <Skeleton height="1rem" width="100%" />
        </>
      )}
    </Card>
  );
}
