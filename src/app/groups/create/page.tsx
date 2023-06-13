import styles from './index.module.scss';
import GoBackButton from '@/components/GoBackButton';
import CreateGroupForm from '@/components/CreateGroupForm/index.module';

export default function CreateGroup() {
  return (
    <div>
      <section className={'d-flex align-items-center'}>
        <GoBackButton href={'/groups'} />
        <h3 className={'mb-0 fw-semibold'}>Create Group</h3>
      </section>

      <section className={styles.formSection}>
        <CreateGroupForm />
      </section>
    </div>
  );
}
