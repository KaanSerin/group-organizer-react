'use client';
import { Nav, Tab } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import axios from '@/libs/axios';
import { useParams } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import GoBackButton from '@/components/GoBackButton';
import GroupEvents from '@/components/GroupEvents';
import AuthContext from '@/contexts/AuthContext';
import GroupAbout from '@/components/GroupAbout';
import GroupMembers from '@/components/GroupMembers';

interface GroupWithEvents {
  id: number;
  name: string;
  description: string | null;
  bannerImageUrl: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  groupEvents: [];
}

export default function GroupView() {
  const { user } = useContext(AuthContext);
  const [group, setGroup] = useState<GroupWithEvents>();

  const params = useParams();

  const getGroupInfo = async () => {
    try {
      const res = await axios.get(`/groups/${params.id}`);
      setGroup(res.data);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getGroupInfo();
  }, []);

  return (
    <div className={'h-100 d-flex flex-column'}>
      <section className={'d-flex align-items-center mb-4'}>
        <GoBackButton href={'/groups'} />
        {!group ? (
          <Skeleton height={32} width={200} />
        ) : (
          <h3 className={'page-title mb-0'}>{group.name}</h3>
        )}
      </section>

      <Tab.Container defaultActiveKey={'events'}>
        <Nav variant="pills" className="d-flex">
          <Nav.Item>
            <Nav.Link eventKey="events">Events</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="about">About</Nav.Link>
          </Nav.Item>
          {group && group.createdBy === user?.id ? (
            <Nav.Item>
              <Nav.Link eventKey="members">Members</Nav.Link>
            </Nav.Item>
          ) : (
            <></>
          )}
        </Nav>

        <Tab.Content>
          <Tab.Pane unmountOnExit={true} eventKey="events">
            <GroupEvents />
          </Tab.Pane>

          <Tab.Pane unmountOnExit={true} eventKey="about">
            <GroupAbout about={group?.description ?? ''} />
          </Tab.Pane>

          <Tab.Pane unmountOnExit={true} eventKey="members">
            <GroupMembers />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
