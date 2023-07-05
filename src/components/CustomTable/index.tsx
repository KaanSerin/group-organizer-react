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
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import CustomPaginator from '@/components/CustomTable/CustomPaginator';
import InputWithLabel from '@/components/InputWithLabel';
import axios from '@/libs/axios';
import { useDebounce } from 'use-debounce';

export interface ActionButton {
  name: string;
  variant?: string;
  size?: 'sm' | 'lg' | undefined;
  className?: string;
  onClick: (row: any) => void;
}

export interface Column {
  label: string;
  renderCell?: (item: any) => any;
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
  columns: Column[];
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
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [searchValue] = useDebounce(search, 500);

  const headers = [...columns];
  if (actions) headers.push({ label: 'Actions' });

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

  const doGet = useCallback(async (params: any) => {}, []);

  function onPaginationChange(action: any, state: any) {
    doGet({
      page: state.page,
      pageLength: pageLength
    })
      .then()
      .catch();
  }

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(fetchUrl, {
        params: {
          page: pagination.state.page,
          pageLength,
          search: searchValue
        }
      });
      setData({
        nodes: res.data.data,
        pageInfo: {
          totalRows: res.data.meta.total,
          totalPages: Math.ceil(res.data.meta.total / pageLength)
        }
      });
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [fetchUrl, pagination.state.page, pageLength, searchValue]);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles.customTable}>
      <div className={'d-flex w-100 justify-content-between'}>
        <h5 className={styles.tableTitle}>{title}</h5>

        <InputWithLabel size={'sm'} label={'Search'} onChange={onSearchChange} />
      </div>
      <Table data={data} theme={theme}>
        {(tableList: any) => (
          <>
            <Header>
              <HeaderRow>
                {headers.map((header: any) => (
                  <HeaderCell key={header.label}>{header.label}</HeaderCell>
                ))}
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item: any) => (
                <Row key={item.id} item={item}>
                  {columns
                    .filter((column) => column.renderCell)
                    .map((column: Column) => (
                      <Cell key={column.label}>{column.renderCell!(item)}</Cell>
                    ))}
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

      {isLoading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingLabel}>Loading...</div>
        </div>
      )}
    </div>
  );
}
