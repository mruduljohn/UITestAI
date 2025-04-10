import { Paper, Text } from '@mantine/core';
import { ScenarioGroup } from '../types';
import { IconBoxSeam, IconCircleCheck, IconAlertCircle } from '@tabler/icons-react';

interface ScenarioStatsProps {
  stats: ScenarioGroup[];
}

export function ScenarioStats({ stats }: ScenarioStatsProps) {
  const getIcon = (variant: string) => {
    switch (variant) {
      case 'success':
        return <IconCircleCheck size={24} className="text-green-500" stroke={1.5} />;
      case 'error':
        return <IconAlertCircle size={24} className="text-red-500" stroke={1.5} />;
      default:
        return <IconBoxSeam size={24} className="text-gray-500" stroke={1.5} />;
    }
  };

  const getBackground = (variant: string) => {
    switch (variant) {
      case 'success':
        return 'bg-green-50 border-green-100';
      case 'error':
        return 'bg-red-50 border-red-100';
      default:
        return 'bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="flex gap-4 mb-6">
      {stats.map((stat, index) => (
        <Paper 
          key={index} 
          className={`flex-1 ${getBackground(stat.variant)} border rounded-xl p-4 shadow-sm`}
          shadow="none"
        >
          <div className="flex items-start">
            <div className="mt-1 mr-3">
              {getIcon(stat.variant)}
            </div>
            <div>
              <Text size="sm" className="text-gray-600 font-medium">{stat.title}</Text>
              <Text size="xl" fw={700}>{stat.count}</Text>
            </div>
          </div>
        </Paper>
      ))}
    </div>
  );
} 