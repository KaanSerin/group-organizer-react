import styles from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faUserGroup, faImage } from '@fortawesome/free-solid-svg-icons';

export interface GroupInfo {
  id: number;
  name: string;
  description: string;
  members: number;
  joined: boolean;
  isOwner: boolean;
  bannerImageUrl: string;
}

export default function GroupCard({ info }: { info: GroupInfo }) {
  const maxDescriptionLength = 140;

  const cardStyle = info.bannerImageUrl
    ? {
        backgroundImage: `url(${info.bannerImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : {};

  return (
    <div className={styles.groupCard}>
      <section className={styles.cardBanner} style={cardStyle}>
        {info.bannerImageUrl ? <></> : <FontAwesomeIcon icon={faImage} />}
      </section>
      <section className={styles.cardBody}>
        <div className={'card-body-header d-flex align-items-center'}>
          <h6 className={'fw-semibold mb-0'}>{info.name}</h6>

          <div className={info.joined ? styles.tagJoined : styles.tagNotJoined}>
            <FontAwesomeIcon icon={faCircle} width={6} height={6} />
            <span>{info.joined ? 'Joined' : 'Not Joined'}</span>
          </div>
        </div>

        <p className={styles.bodyGroupInfo}>
          {info.description.length > maxDescriptionLength
            ? `${info.description.slice(0, maxDescriptionLength)}...`
            : info.description}
        </p>

        <div className={styles.tags}>
          {info.isOwner ? (
            <div className={styles.adminTag}>
              <span>Admin</span>
            </div>
          ) : (
            <></>
          )}

          <div className={styles.tag}>
            <FontAwesomeIcon icon={faUserGroup} />
            <span>{info.members > 99 ? '+99' : info.members}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
