'use client';
import styles from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faImage } from '@fortawesome/free-solid-svg-icons';
import Card from '@/components/Card';
import InputWithLabel from '@/components/InputWithLabel';
import { Button, Col, Row } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import axios from '@/libs/axios';

export default function CreateGroupForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const goBack = () => {
    router.push('/groups');
  };

  const onFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createGroup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await axios.post('groups', formData);
      goBack();
    } catch (e) {
      console.log(e);
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.createGroupForm}>
      <Card>
        <div className={styles.groupImageContainer}>
          <FontAwesomeIcon className={styles.imageIcon} icon={faImage} />
          <FontAwesomeIcon className={styles.penIcon} icon={faPen} />
        </div>

        <form onSubmit={createGroup}>
          <InputWithLabel
            name={'name'}
            onChange={onFormDataChange}
            label={'Group Name'}
            placeholder={'Enter your new group name!'}
          />
          <InputWithLabel
            name={'description'}
            onChange={onFormDataChange}
            className={'mt-4'}
            label={'Description'}
            type={'textarea'}
            placeholder={'Write an enticing description of what your group is all about!'}
            rows={5}
          />

          <Row className={styles.buttonsRow}>
            <Col>
              <Button
                disabled={isLoading}
                size={'lg'}
                type={'submit'}
                className={'btn-purple w-100'}>
                Create Group
              </Button>
            </Col>

            <Col>
              <Button
                disabled={isLoading}
                onClick={goBack}
                size={'lg'}
                variant={'danger'}
                className={'w-100'}>
                Cancel
              </Button>
            </Col>
          </Row>
        </form>
      </Card>
    </div>
  );
}
