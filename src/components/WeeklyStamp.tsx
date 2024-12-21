import React, { useEffect, useState } from 'react';
import { getWeeklyLinkStatus } from '../api/link';
import { Table } from 'antd';
import '../styles/css/weeklyStamp.css';

const WeeklyStamp: React.FC = () => {
  const [weeklyStatus, setWeeklyStatus] = useState<Record<string, boolean>>({
    MONDAY: false,
    TUESDAY: false,
    WEDNESDAY: false,
    THURSDAY: false,
    FRIDAY: false,
    SATURDAY: false,
    SUNDAY: false,
  });

  useEffect(() => {
    const fetchWeeklyStatus = async () => {
      try {
        const data = await getWeeklyLinkStatus();
        setWeeklyStatus(data);
      } catch (error) {
        console.error('Failed to fetch weekly link status:', error);
      }
    };
    fetchWeeklyStatus();
  }, []);

  const columns = [
    {
      title: 'Mon',
      dataIndex: 'MONDAY',
      align: 'center' as const,
      width: 80, // 열 너비 조정
      render: (isRegistered: boolean) => (
        <div
          className={`stamp ${isRegistered ? 'stamp-good' : 'stamp-retry'}`}
          title={isRegistered ? 'Good' : 'Retry'}
        ></div>
      ),
    },
    {
      title: 'Tue',
      dataIndex: 'TUESDAY',
      align: 'center' as const,
      width: 80, // 열 너비 조정
      render: (isRegistered: boolean) => (
        <div
          className={`stamp ${isRegistered ? 'stamp-good' : 'stamp-retry'}`}
          title={isRegistered ? 'Good' : 'Retry'}
        ></div>
      ),
    },
    {
      title: 'Wed',
      dataIndex: 'WEDNESDAY',
      align: 'center' as const,
      width: 80, // 열 너비 조정
      render: (isRegistered: boolean) => (
        <div
          className={`stamp ${isRegistered ? 'stamp-good' : 'stamp-retry'}`}
          title={isRegistered ? 'Good' : 'Retry'}
        ></div>
      ),
    },
    {
      title: 'Thu',
      dataIndex: 'THURSDAY',
      align: 'center' as const,
      width: 80, // 열 너비 조정
      render: (isRegistered: boolean) => (
        <div
          className={`stamp ${isRegistered ? 'stamp-good' : 'stamp-retry'}`}
          title={isRegistered ? 'Good' : 'Retry'}
        ></div>
      ),
    },
    {
      title: 'Fri',
      dataIndex: 'FRIDAY',
      align: 'center' as const,
      width: 80, // 열 너비 조정
      render: (isRegistered: boolean) => (
        <div
          className={`stamp ${isRegistered ? 'stamp-good' : 'stamp-retry'}`}
          title={isRegistered ? 'Good' : 'Retry'}
        ></div>
      ),
    },
    {
      title: 'Sat',
      dataIndex: 'SATURDAY',
      align: 'center' as const,
      width: 80, // 열 너비 조정
      render: (isRegistered: boolean) => (
        <div
          className={`stamp ${isRegistered ? 'stamp-good' : 'stamp-retry'}`}
          title={isRegistered ? 'Good' : 'Retry'}
        ></div>
      ),
    },
    {
      title: 'Sun',
      dataIndex: 'SUNDAY',
      align: 'center' as const,
      width: 80, // 열 너비 조정
      render: (isRegistered: boolean) => (
        <div
          className={`stamp ${isRegistered ? 'stamp-good' : 'stamp-retry'}`}
          title={isRegistered ? 'Good' : 'Retry'}
        ></div>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      ...weeklyStatus,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        className="weekly-table"
      />
    </div>
  );
};

export default WeeklyStamp;
