import { useState } from 'react';
import { Title, Anchor, Group, Button } from '@mantine/core';
import { IconChevronLeft, IconLink } from '@tabler/icons-react';
import { ScenarioStats } from '../components/ScenarioStats';
import { ScenarioFilters } from '../components/ScenarioFilters';
import { ScenarioTags } from '../components/ScenarioTags';
import { ScenarioCard } from '../components/ScenarioCard';
import { FilterOption, GroupByOption, Scenario, ScenarioGroup } from '../types';

export function ScenarioPage() {
  const [filter, setFilter] = useState<FilterOption>('All');
  const [groupBy, setGroupBy] = useState<GroupByOption>('None');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | undefined>(undefined);

  // Mock data
  const stats: ScenarioGroup[] = [
    { title: 'Scenarios', count: 10, variant: 'default' },
    { title: 'Passed scenarios', count: 9, variant: 'success' },
    { title: 'Failed scenarios', count: 1, variant: 'error' },
  ];

  const tags = ['regression', 'login', 'user management'];

  const scenarios: Scenario[] = [
    {
      id: '1',
      name: 'Push updates',
      browser: 'Chrome',
      startTime: '3:30:02 PM',
      commentCount: 0,
      status: 'Passed',
    },
    {
      id: '2',
      name: 'Password Reset Workflow',
      browser: 'Safari',
      startTime: '3:30:02 PM',
      commentCount: 1,
      status: 'Failed',
      errorMessage: 'Check if there is a RAM filter available on the page.',
    },
    {
      id: '3',
      name: 'Add item to cart',
      browser: 'Arc',
      startTime: '3:30:02 PM',
      commentCount: 0,
      status: 'Passed',
      fixedBy: 'AI',
    },
    {
      id: '4',
      name: 'Add item to cart',
      browser: 'Arc',
      startTime: '3:30:02 PM',
      commentCount: 0,
      status: 'Passed',
    },
  ];

  // Filter scenarios based on selected filter and search query
  const filteredScenarios = scenarios.filter((scenario) => {
    if (filter === 'Failed only' && scenario.status !== 'Failed') return false;
    if (searchQuery && !scenario.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (activeTag && !tags.includes(activeTag)) return false;
    return true;
  });

  return (
    <div className="p-6">
      <div className="flex items-center mb-5">
        <Button 
          variant="subtle" 
          leftSection={<IconChevronLeft size={16} stroke={1.5} />}
          className="mr-2 text-gray-500 p-0"
          styles={{
            root: {
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.05)'
              }
            }
          }}
        />
        <div className="flex-1">
          <div className="flex items-center space-x-1 mb-1 text-gray-600">
            <span className="text-xs text-gray-500">Dec 11, 2024 at 3:30:02 PM</span>
            <span className="text-xs mx-1">•</span>
            <Anchor href="#" size="xs" className="text-gray-600 no-underline hover:underline font-medium">
              Locally
            </Anchor>
            <span className="text-xs mx-1">•</span>
            <Anchor href="#" size="xs" className="text-gray-600 no-underline hover:underline font-medium">
              Mark Adams
            </Anchor>
            <span className="text-xs mx-1">•</span>
            <Anchor href="#" size="xs" className="text-gray-600 no-underline hover:underline font-medium">
              Dev
            </Anchor>
          </div>
          <Group justify="space-between" className="flex-wrap">
            <Title order={1} size="h3" fw={600} className="text-gray-900">
              Search for a product and add to cart
            </Title>
            <Button
              variant="subtle"
              leftSection={<IconLink size={16} stroke={1.5} />}
              className="text-gray-500 p-0"
              styles={{
                root: {
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.05)'
                  }
                }
              }}
            />
          </Group>
        </div>
      </div>

      <ScenarioTags 
        tags={tags}
        activeTag={activeTag}
        onTagSelect={setActiveTag}
      />

      <ScenarioStats stats={stats} />

      <ScenarioFilters 
        filterValue={filter}
        groupByValue={groupBy}
        onFilterChange={setFilter}
        onGroupByChange={setGroupBy}
        onSearchChange={setSearchQuery}
      />

      <div className="mt-6">
        <Title order={3} size="h6" className="mb-4 text-gray-700 font-semibold">
          Scenarios
        </Title>
        
        <div className="rounded-lg overflow-hidden bg-white border border-gray-200 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-4 py-2.5 font-medium">Scenario info</th>
                <th className="px-4 py-2.5 font-medium">Browser</th>
                <th className="px-4 py-2.5 font-medium">Start time</th>
                <th className="px-4 py-2.5 font-medium">Comment</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
                <th className="px-4 py-2.5 font-medium">Error message</th>
                <th className="px-4 py-2.5 font-medium">Root</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredScenarios.map((scenario) => (
                <ScenarioCard key={scenario.id} scenario={scenario} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 