import styles from './index.module.scss';
import ProfileCard from '@/components/ProfileCard';
import fetchUrl from '@/libs/fetch';

const getUserProfile = async () => {
  try {
    return await fetchUrl('/auth/profile');
  } catch (e) {
    console.log(e);
    return {};
  }
};

export default async function Account() {
  const profile = await getUserProfile();

  return (
    <div>
      <h3 className={styles.pageTitle}>Account</h3>
      <ProfileCard profile={profile} />
    </div>
  );
}
