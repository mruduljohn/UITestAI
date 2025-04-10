import { useState } from 'react';
import { Title, Anchor, Group, Button, Badge, Select } from '@mantine/core';
import { IconChevronLeft, IconLink, IconArrowRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { ScenarioStats } from '../components/ScenarioStats';
import { ScenarioFilters } from '../components/ScenarioFilters';
import { ScenarioTags } from '../components/ScenarioTags';
import { ScenarioCard } from '../components/ScenarioCard';
import { FilterOption, GroupByOption, Scenario, ScenarioGroup } from '../types';

export function ScenarioPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterOption>('All');
  const [groupBy, setGroupBy] = useState<GroupByOption>('None');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | undefined>(undefined);
  const [selectedScenario, setSelectedScenario] = useState('Search for a product and add to cart');

  // Mock data
  const stats: ScenarioGroup[] = [
    { title: 'Steps', count: 10, variant: 'default' },
    { title: 'Passed steps', count: 9, variant: 'success' },
    { title: 'Failed steps', count: 1, variant: 'error' },
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
          onClick={() => navigate('/dashboard')}
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
            <div className="flex flex-col">
              <Title order={1} size="h3" fw={600} className="text-gray-900 mb-1">
                {selectedScenario}
              </Title>
              <div className="flex items-center">
                <Badge color="blue" size="sm" radius="sm" className="mr-2">E-commerce Site</Badge>
                <Badge color="gray" size="sm" radius="sm">Chrome</Badge>
              </div>
            </div>
            <div className="flex items-center">
              <Select
                label="Other scenarios for this site"
                placeholder="Select scenario"
                data={[
                  'Search for a product and add to cart',
                  'User login flow',
                  'Checkout process',
                  'Account creation'
                ]}
                value={selectedScenario}
                onChange={(val) => val && setSelectedScenario(val)}
                className="w-64 mr-2"
              />
              <Button
                variant="subtle"
                rightSection={<IconArrowRight size={16} stroke={1.5} />}
                className="text-blue-500 self-end mb-0.5"
              >
                View
              </Button>
            </div>
          </Group>
        </div>
      </div>

      <ScenarioTags 
        tags={tags}
        activeTag={activeTag}
        onTagSelect={setActiveTag}
      />

      <ScenarioStats stats={stats} />

      <div className="my-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <Title order={3} size="h6" className="mb-3 text-gray-700 font-semibold">
            Scenario Steps
          </Title>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-start">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 ${
                  index === 3 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                }`}>
                  {index === 3 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-800 mb-1">
                    {index === 0 && 'Navigate to homepage'}
                    {index === 1 && 'Click on search bar'}
                    {index === 2 && 'Type "smartphone" in search field'}
                    {index === 3 && 'Click on product card'}
                    {index === 4 && 'Click "Add to Cart" button'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {index === 3 ? 'Failed: Could not find product card element' : 'Completed successfully'}
                  </p>
                </div>
                {index === 3 && (
                  <Button size="xs" variant="outline" color="red" className="ml-2">
                    View Details
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <ScenarioFilters 
        filterValue={filter}
        groupByValue={groupBy}
        onFilterChange={setFilter}
        onGroupByChange={setGroupBy}
        onSearchChange={setSearchQuery}
      />

      <div className="mt-6">
        <Title order={3} size="h6" className="mb-4 text-gray-700 font-semibold">
          Related Scenarios
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
                <ScenarioCard 
                  key={scenario.id} 
                  scenario={scenario} 
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 