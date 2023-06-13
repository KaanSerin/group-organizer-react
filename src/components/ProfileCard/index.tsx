'use client';
import styles from './index.module.scss';
import Card from '@/components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faUser } from '@fortawesome/free-solid-svg-icons';
import InputWithLabel from '@/components/InputWithLabel';
import { Button, Col, Row } from 'react-bootstrap';
import CustomPhoneInput from '@/components/CustomPhoneInput';
import { ChangeEvent, FormEvent, useState } from 'react';
import axios from '@/libs/axios';

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicUrl?: string;
  phone: string;
  bio: string;
  gender: string;
}

type SanitizedProfile = { [key: string]: any };

const sanitizeProfileData = (profile: UserProfile) => {
  const newObject: SanitizedProfile = {};
  const keys = Object.keys(profile) as Array<keyof UserProfile>;
  keys.forEach((key) => {
    if (profile[key] === null) {
      newObject[key] = '';
    } else {
      newObject[key] = profile[key];
    }
  });

  return newObject;
};

export default function ProfileCard({ profile }: { profile: UserProfile }) {
  const [formData, setFormData] = useState<SanitizedProfile>(sanitizeProfileData(profile));
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.put('users', formData);
    } catch (e) {
      console.log(e);
    }

    setIsLoading(false);
  };

  const onDiscardChanges = () => {
    console.log('here');
    setFormData(sanitizeProfileData(profile));
  };

  const onPhoneInputChange = (phone: string) => {
    setFormData({ ...formData, phone });
  };

  return (
    <Card>
      <div className={styles.profileContainer}>
        <div className={'text-center'}>
          <div className={styles.avatar}>
            {profile.profilePicUrl ? (
              <img
                className={styles.profileImage}
                src={profile.profilePicUrl}
                alt={'User Avatar'}
              />
            ) : (
              <div className={styles.userIconContainer}>
                <FontAwesomeIcon icon={faUser} />
              </div>
            )}

            <FontAwesomeIcon className={styles.penIcon} icon={faPen} />
          </div>
        </div>

        <form onSubmit={onFormSubmit}>
          <Row>
            <Col xs={12} sm={6}>
              <InputWithLabel
                name="firstName"
                className="mt-4"
                label={'First Name'}
                placeholder={'First Name'}
                value={formData.firstName}
                onChange={onFormDataChange}
                type="text"
              />
            </Col>

            <Col xs={12} sm={6}>
              <InputWithLabel
                name="lastName"
                className="mt-4"
                label={'Last Name'}
                placeholder={'First Name'}
                value={formData.lastName}
                onChange={onFormDataChange}
                type="text"
              />
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={6}>
              <InputWithLabel
                disabled={true}
                name="username"
                className="mt-4"
                label={'Username'}
                value={formData.username}
                onChange={onFormDataChange}
                type="text"
              />
            </Col>
            <Col xs={12} sm={6}>
              <InputWithLabel
                disabled={true}
                name="email"
                className="mt-4"
                label={'Email'}
                value={formData.email}
                onChange={onFormDataChange}
                type="email"
              />
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={6}>
              <CustomPhoneInput
                className="mt-4"
                label={'Phone'}
                phone={formData.phone}
                onFormDataChange={onPhoneInputChange}
              />
            </Col>

            <Col xs={12} sm={6}>
              <InputWithLabel
                name="gender"
                className="mt-4"
                label={'Gender'}
                value={formData.gender}
                onChange={onFormDataChange}
                type="text"
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <InputWithLabel
                name="bio"
                className={[styles.textArea, 'mt-4'].join(' ')}
                label={'Bio'}
                value={formData.bio}
                onChange={onFormDataChange}
                type="textarea"
                rows={3}
              />
            </Col>
          </Row>

          <Row className={styles.buttons}>
            <Col xs={12} sm={6}>
              <Button
                disabled={isLoading}
                type={'submit'}
                size={'lg'}
                className={'btn-purple w-100'}>
                Save
              </Button>
            </Col>

            <Col xs={12} sm={6}>
              <Button
                disabled={isLoading}
                onClick={onDiscardChanges}
                size={'lg'}
                variant={'danger w-100'}>
                Discard Changes
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    </Card>
  );
}
