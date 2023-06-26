import CustomTable, { ActionButton } from '@/components/CustomTable';

export default function GroupMembers() {
  const columns = ['ID', 'Email', 'Name'];

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
        fetchUrl={'/groups/1/members'}
        columns={columns}
        actions={true}
        buttons={buttons}
        title={'Members'}
      />
    </div>
  );
}
