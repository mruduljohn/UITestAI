import { Paper, Text, Group } from '@mantine/core';
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
        return <IconBoxSeam size={24} className="text-blue-500" stroke={1.5} />;
    }
  };

  const getStyles = (variant: string) => {
    switch (variant) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-100'
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-100'
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-100'
        };
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat, index) => {
        const styles = getStyles(stat.variant);
        return (
          <Paper 
            key={index} 
            className={`${styles.bg} ${styles.border} border rounded-lg p-4 shadow-sm h-full`}
            shadow="none"
          >
            <Group>
              <div className="flex items-center justify-center">
                {getIcon(stat.variant)}
              </div>
              <div className="flex-1">
                <Text size="sm" className="text-gray-600 font-medium">{stat.title}</Text>
                <Text size="xl" fw={700}>{stat.count}</Text>
              </div>
            </Group>
          </Paper>
        );
      })}
    </div>
  );
} 