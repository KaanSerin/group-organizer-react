'use client';
import { Button } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import axios from '@/libs/axios';
import GroupCard, { GroupInfo } from '@/components/GroupCard';
import Link from 'next/link';

export default function Groups() {
  const [groups, setGroups] = useState<GroupInfo[]>([]);

  const getUserGroups = async () => {
    try {
      const res = await axios.get('groups/user_groups');
      setGroups(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserGroups();
  }, []);

  return (
    <div>
      <section className={'groups-header d-flex'}>
        <h3 className={'fw-semibold'}>Groups</h3>
        <Link
          href={'/groups/create'}
          className={['btn', 'btn-outline-purple', styles.createGroupBtn].join(' ')}>
          <FontAwesomeIcon icon={faPlus} className={'me-2'} />
          <span>Create Group</span>
        </Link>
      </section>
      <section className={styles.groupsContainer}>
        {groups.map((group: GroupInfo) => (
          <GroupCard key={group.id} info={group} />
        ))}
      </section>
    </div>
  );
}
