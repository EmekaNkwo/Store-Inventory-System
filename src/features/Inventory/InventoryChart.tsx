import { Bar } from 'react-chartjs-2';

import { Product } from '@/shared/models';

const InventoryChart = ({ data }: { data: Product[] }) => {
  const chartData = {
    labels: data.map((product) => product.name),
    datasets: [
      {
        label: 'Quantity',
        data: data.map((product) => product.quantity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default InventoryChart;
