import styles from './index.module.scss';
import dayjs from 'dayjs';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faUser } from '@fortawesome/free-solid-svg-icons';

export interface Event {
  id: number;
  groupId: number;
  name: string;
  eventDate: Date;
  eventImageUrl?: string;
  createUserId: number;
  createUserName: string;
  createUserImageUrl?: string;
}

export default function GroupEventCard({ event }: { event: Event }) {
  const cardStyle = event.eventImageUrl
    ? {
        backgroundImage: `url(${event.eventImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : {};

  const userPictureStyle = event.createUserImageUrl
    ? {
        backgroundImage: `url(${event.createUserImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : {};

  const eventDateParsed = dayjs(event.eventDate);

  return (
    <div className={styles.eventCard}>
      <div className={styles.eventImageContainer}>
        {event.eventImageUrl ? (
          <div style={cardStyle} className={styles.imageBackground} />
        ) : (
          <FontAwesomeIcon icon={faImage} className={styles.noImageIcon} />
        )}
      </div>
      <div className={styles.eventDetails}>
        <div className={styles.cardHeader}>
          <h5 className={'fw-semibold'}>{event.name}</h5>
          <p>
            <span>{eventDateParsed.format('MMM DD, YYYY')}</span>
            <span>{eventDateParsed.format('hh:mm')}</span>
          </p>
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.userContainer}>
            {event.createUserImageUrl ? (
              <div style={userPictureStyle} className={styles.userPicture} />
            ) : (
              <FontAwesomeIcon className={styles.userPictureIcon} icon={faUser} />
            )}
            <div className={styles.createUserName}>{event.createUserName}</div>
          </div>

          <Button className={'btn-purple'}>Join</Button>
        </div>
      </div>
    </div>
  );
}
