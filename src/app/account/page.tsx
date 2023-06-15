'use client';
import ProfileCard, { UserProfile } from '@/components/ProfileCard';
import { useEffect, useState } from 'react';
import axios from '@/libs/axios';

export default function Account() {
  const [profile, setProfile] = useState<UserProfile | {}>({});

  const getUserProfile = async () => {
    try {
      const res = await axios.get('/auth/profile');
      setProfile(res.data);
    } catch (e) {
      console.log(e);
      return {};
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div>
      <h3 className={'page-title'}>Account</h3>
      {Object.keys(profile).length > 0 ? (
        <ProfileCard profile={profile as UserProfile} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
