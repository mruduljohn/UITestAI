import { useState } from 'react';
import { Title, Anchor, Group, Button, Badge, Select, Paper, Timeline, Text, Divider, Card } from '@mantine/core';
import { 
  IconChevronLeft, 
  IconArrowRight, 
  IconCheck, 
  IconX, 
  IconExclamationCircle,
  IconPhoto,
  IconEye
} from '@tabler/icons-react';
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
  const [selectedStep, setSelectedStep] = useState<number | null>(3);

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

  const steps = [
    { id: 0, title: 'Navigate to homepage', status: 'success' },
    { id: 1, title: 'Click on search bar', status: 'success' },
    { id: 2, title: 'Type "smartphone" in search field', status: 'success' },
    { id: 3, title: 'Click on product card', status: 'error', details: 'Could not find product card element' },
    { id: 4, title: 'Click "Add to Cart" button', status: 'success' },
  ];

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
          </div>
          <Group justify="space-between" className="flex-wrap items-start">
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

      <div className="mb-6">
        <ScenarioStats stats={stats} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <Paper shadow="sm" radius="md" p="md" className="h-full">
            <Title order={3} size="h6" className="mb-3 text-gray-700 font-semibold">
              Scenario Steps
            </Title>
            <Timeline active={3} bulletSize={24} lineWidth={2}>
              {steps.map((step) => (
                <Timeline.Item
                  key={step.id}
                  bullet={step.status === 'success' ? <IconCheck size={12} /> : <IconX size={12} />}
                  title={
                    <Text 
                      size="sm" 
                      className={`font-medium ${step.status === 'error' ? 'text-red-600' : 'text-gray-800'}`}
                    >
                      {step.title}
                    </Text>
                  }
                  lineVariant={step.status === 'error' ? 'dashed' : 'solid'}
                  color={step.status === 'error' ? 'red' : 'green'}
                  className={selectedStep === step.id ? 'bg-blue-50 rounded-md py-1 px-2 -mx-2' : ''}
                  onClick={() => setSelectedStep(step.id)}
                >
                  <Text size="xs" color="dimmed">
                    {step.status === 'error' 
                      ? `Failed: ${step.details}` 
                      : 'Completed successfully'}
                  </Text>
                </Timeline.Item>
              ))}
            </Timeline>
          </Paper>
        </div>
        
        <div className="lg:col-span-2">
          <Paper shadow="sm" radius="md" p="md" className="h-full">
            {selectedStep === 3 ? (
              <>
                <div className="flex items-center justify-between mb-3">
                  <Title order={3} size="h6" className="text-gray-700 font-semibold flex items-center">
                    Error Details
                    <Badge color="red" className="ml-2">Failed</Badge>
                  </Title>
                </div>
                
                <Card withBorder className="mb-3 border-red-200 bg-red-50">
                  <Group>
                    <IconExclamationCircle className="text-red-500" size={20} />
                    <div>
                      <Text fw={500}>Error: Element not found</Text>
                      <Text size="sm" color="dimmed">
                        Could not find product card element with selector: .product-card
                      </Text>
                    </div>
                  </Group>
                </Card>
                
                <div className="mb-4">
                  <Text fw={500} size="sm" className="mb-2">Expected Result:</Text>
                  <Text size="sm" className="text-gray-700">
                    The product card should be visible and clickable after search results are loaded.
                  </Text>
                </div>
                
                <div className="mb-4">
                  <Text fw={500} size="sm" className="mb-2">Actual Result:</Text>
                  <Text size="sm" className="text-gray-700">
                    The product card element could not be found in the DOM. The search results may not have finished loading or the element structure has changed.
                  </Text>
                </div>
                
                <Divider my="sm" />
                
                <div className="flex justify-end">
                  <Button variant="subtle" leftSection={<IconEye size={16} />} className="mr-2">
                    View Screenshot
                  </Button>
                  <Button color="blue">
                    Generate Fix
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-10">
                <IconExclamationCircle size={48} className="text-gray-300 mb-4" />
                <Text fw={500} className="text-gray-500">
                  Select a step to view details
                </Text>
              </div>
            )}
          </Paper>
        </div>
      </div>

      <Paper shadow="sm" radius="md" className="overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <Title order={3} size="h6" className="text-gray-700 font-semibold">
            Related Scenarios
          </Title>
        </div>
        
        <div className="rounded-lg overflow-auto" style={{ maxHeight: '300px' }}>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2.5 font-medium">Scenario info</th>
                <th className="px-4 py-2.5 font-medium">Browser</th>
                <th className="px-4 py-2.5 font-medium">Start time</th>
                <th className="px-4 py-2.5 font-medium">Comment</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
                <th className="px-4 py-2.5 font-medium">Error message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredScenarios.map((scenario) => (
                <ScenarioCard 
                  key={scenario.id} 
                  scenario={scenario} 
                />
              ))}
              {filteredScenarios.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No scenarios found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Paper>
    </div>
  );
} 