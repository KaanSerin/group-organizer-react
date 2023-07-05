import CustomTable, { ActionButton } from '@/components/CustomTable';
import { UserProfile } from '@/components/ProfileCard';
import { useParams } from 'next/navigation';

export default function GroupMembers() {
  const params = useParams();
  const columns = [
    {
      label: 'ID',
      renderCell: (item: UserProfile) => item.id
    },
    {
      label: 'Username',
      renderCell: (item: UserProfile) => item.username
    },
    {
      label: 'First Name',
      renderCell: (item: UserProfile) => item.firstName
    },
    {
      label: 'Last Name',
      renderCell: (item: UserProfile) => item.lastName
    }
  ];

  const buttons: ActionButton[] = [
    {
      name: 'Remove',
      onClick: (item: any) => console.log(item),
      variant: 'danger'
    }
  ];

  return (
    <div>
      <CustomTable
        fetchUrl={`/groups/${params.id}/members`}
        columns={columns}
        actions={true}
        buttons={buttons}
        title={'Members'}
        pageLength={15}
      />
    </div>
  );
}
