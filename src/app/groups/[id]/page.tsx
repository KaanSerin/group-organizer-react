'use client';
import { Nav, Tab } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from '@/libs/axios';
import { useParams } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import GoBackButton from '@/components/GoBackButton';

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
    <div>
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
          <Nav.Item>
            <Nav.Link eventKey="members">Members</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="events">
            <div>Events</div>
          </Tab.Pane>

          <Tab.Pane eventKey="about">
            <div>About</div>
          </Tab.Pane>

          <Tab.Pane eventKey="members">
            <div>Members</div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
