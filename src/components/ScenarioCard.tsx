import { Text, Badge } from '@mantine/core';
import { Scenario } from '../types';

interface ScenarioCardProps {
  scenario: Scenario;
  onClick?: () => void;
}

export function ScenarioCard({ scenario, onClick }: ScenarioCardProps) {
  const getBrowserIcon = (browser: string) => {
    switch (browser) {
      case 'Chrome':
        return (
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
          </div>
        );
      case 'Safari':
        return (
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center text-white">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2L19 19L12 15.5L5 19L12 2Z" />
            </svg>
          </div>
        );
      case 'Arc':
        return (
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="white" strokeWidth="2">
              <path d="M6 17L12 7L18 17H6Z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-5 h-5 rounded-full bg-gray-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="white" strokeWidth="2">
              <circle cx="12" cy="12" r="7" />
            </svg>
          </div>
        );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Passed':
        return 'green';
      case 'Failed':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <tr 
      className={onClick ? "hover:bg-gray-50 cursor-pointer" : ""}
      onClick={onClick}
    >
      <td className="px-4 py-2.5">
        <div className="flex items-center">
          <div className="w-5 h-5 mr-2 flex-shrink-0">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-gray-600" width="20" height="20">
              <path d="M2 5.5V20c0 1.1.9 2 2 2h16a2 2 0 002-2V5.5A2.5 2.5 0 0019.5 3h-15A2.5 2.5 0 002 5.5z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M18 9l.01-.011M6 9l.01-.011" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <Text size="sm" fw={500} className="text-gray-900">{scenario.name}</Text>
            <Text size="xs" className="text-gray-600">Buy an item</Text>
          </div>
        </div>
      </td>
      <td className="px-4 py-2.5">
        <div className="flex items-center">
          <div className="mr-1.5">{getBrowserIcon(scenario.browser)}</div>
          <Text size="sm" className="text-gray-700">{scenario.browser}</Text>
        </div>
      </td>
      <td className="px-4 py-2.5">
        <Text size="sm" className="text-gray-700">{scenario.startTime}</Text>
      </td>
      <td className="px-4 py-2.5">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium">
            {scenario.commentCount}
          </div>
        </div>
      </td>
      <td className="px-4 py-2.5">
        {scenario.status === 'Passed' && scenario.fixedBy === 'AI' ? (
          <div className="flex items-center">
            <Badge color="blue" variant="light" size="sm" className="font-normal py-1">
              Passed
            </Badge>
            <span className="mx-1 text-gray-500">-</span>
            <Text size="xs" className="text-blue-600 font-medium">Error fixed by AI</Text>
          </div>
        ) : (
          <Badge 
            color={getStatusColor(scenario.status)} 
            variant="light" 
            size="sm" 
            className="font-medium py-1"
            styles={{
              root: {
                textTransform: 'none',
              }
            }}
          >
            {scenario.status}
          </Badge>
        )}
      </td>
      <td className="px-4 py-2.5">
        {scenario.errorMessage && (
          <Text size="sm" className="text-red-600">
            {scenario.errorMessage}
          </Text>
        )}
      </td>
      <td className="px-4 py-2.5">
        <Text size="sm">—</Text>
      </td>
    </tr>
  );
} 