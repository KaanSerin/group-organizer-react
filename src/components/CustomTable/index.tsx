'use client';
import styles from './index.module.scss';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import {
  Body,
  Cell,
  Data,
  Header,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
  TableNode
} from '@table-library/react-table-library/table';
import { usePagination } from '@table-library/react-table-library/pagination';
import { Button, FormControl, Pagination } from 'react-bootstrap';
import { useCallback, useState } from 'react';
import CustomPaginator from '@/components/CustomTable/CustomPaginator';
import InputWithLabel from '@/components/InputWithLabel';

export interface ActionButton {
  name: string;
  variant?: string;
  size?: 'sm' | 'lg' | undefined;
  className?: string;
  onClick: (row: any) => void;
}

export default function CustomTable({
  fetchUrl,
  title,
  columns,
  buttons,
  actions = false,
  pageLength = 10
}: {
  fetchUrl: string;
  title: string;
  columns: string[];
  buttons?: ActionButton[];
  actions: boolean;
  pageLength?: number;
}) {
  const theme = useTheme(getTheme());
  const [data, setData] = useState({
    nodes: [],
    pageInfo: {
      totalRows: 0,
      totalPages: 1
    }
  });

  const headers = [...columns];
  if (actions) headers.push('Actions');

  const pagination = usePagination(
    data,
    {
      state: {
        page: 0,
        size: pageLength
      },
      onChange: onPaginationChange
    },
    {
      isServer: true
    }
  );

  const doGet = useCallback(async (params: any) => {
    console.log(params);
  }, []);

  function onPaginationChange(action: any, state: any) {
    doGet({
      page: state.page + 1,
      pageLength: pageLength
    })
      .then()
      .catch();
  }

  return (
    <div className={styles.customTable}>
      <div className={'d-flex w-100 justify-content-between'}>
        <h5 className={styles.tableTitle}>{title}</h5>

        <InputWithLabel size={'sm'} label={'Search'} />
      </div>
      <Table data={data} theme={theme}>
        {(tableList: any) => (
          <>
            <Header>
              <HeaderRow>
                {headers.map((header: string) => (
                  <HeaderCell key={header}>{header}</HeaderCell>
                ))}
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item: any) => (
                <Row key={item.id} item={item}>
                  <Cell>{item.id}</Cell>
                  <Cell>{item.name}</Cell>
                  {actions && (
                    <Cell>
                      <div>
                        {buttons?.map((button: ActionButton) => (
                          <Button
                            key={button.name}
                            size={button.size ?? 'sm'}
                            variant={button.variant ?? 'primary'}
                            className={button.className}
                            onClick={() => button.onClick(item)}>
                            {button.name}
                          </Button>
                        ))}
                      </div>
                    </Cell>
                  )}
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>

      {data.pageInfo && (
        <div className={'w-100 d-flex justify-content-between align-items-center'}>
          <div>{data.pageInfo.totalRows} items</div>
          <div>
            Page {pagination.state.page + 1} of {data.pageInfo.totalPages}
          </div>

          <CustomPaginator
            currentPage={pagination.state.page}
            totalPages={data.pageInfo.totalPages}
            onPageChange={pagination.fns.onSetPage}
          />
        </div>
      )}
    </div>
  );
}
