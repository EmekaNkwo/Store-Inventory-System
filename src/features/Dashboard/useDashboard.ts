import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { DashboardData } from '@/shared/models';
import { getDashboardData } from '@/lib/fetchData';

import { useDashboardStore } from './useDashboardStore';

const useDashboard = () => {
  const { setDashboardData } = useDashboardStore();
  const dashboardQuery = useQuery<DashboardData, Error>({
    queryKey: ['dashboard'],
    queryFn: getDashboardData,
  });

  useEffect(() => {
    if (dashboardQuery.data) {
      setDashboardData(dashboardQuery.data);
    }
  }, [dashboardQuery.data]);

  return {
    dashboardData: dashboardQuery.data,
    isLoading: dashboardQuery.isLoading,
    isError: dashboardQuery.isError,
  };
};

export default useDashboard;
