import { useState } from 'react';
import { Title, Group, Button, Modal, TextInput, Textarea, Select, Paper, Divider, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconBrandChrome, IconBrandSafari, IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { ScenarioStats } from '../components/ScenarioStats';
import { ScenarioFilters } from '../components/ScenarioFilters';
import { ScenarioCard } from '../components/ScenarioCard';
import { FilterOption, GroupByOption, Scenario, ScenarioGroup } from '../types';

export function DashboardPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterOption>('All');
  const [groupBy, setGroupBy] = useState<GroupByOption>('None');
  const [searchQuery, setSearchQuery] = useState('');
  const [opened, { open, close }] = useDisclosure(false);
  const [siteUrl, setSiteUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [selectedProject, setSelectedProject] = useState('Main-project');
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  // Mock data
  const stats: ScenarioGroup[] = [
    { title: 'Projects', count: 3, variant: 'default' },
    { title: 'Active scenarios', count: 12, variant: 'success' },
    { title: 'Failed scenarios', count: 2, variant: 'error' },
  ];

  const scenarios: Scenario[] = [
    {
      id: '1',
      name: 'Product Search Flow',
      browser: 'Chrome',
      startTime: '3:30:02 PM',
      commentCount: 0,
      status: 'Passed',
    },
    {
      id: '2',
      name: 'User Registration',
      browser: 'Safari',
      startTime: '3:20:12 PM',
      commentCount: 1,
      status: 'Failed',
      errorMessage: 'Validation error on email field',
    },
    {
      id: '3',
      name: 'Checkout Process',
      browser: 'Chrome',
      startTime: '3:15:45 PM',
      commentCount: 0,
      status: 'Passed',
      fixedBy: 'AI',
    },
    {
      id: '4',
      name: 'Login Authentication',
      browser: 'Safari',
      startTime: '2:45:33 PM',
      commentCount: 0,
      status: 'Passed',
    },
  ];

  // Filter scenarios based on selected filter and search query
  const filteredScenarios = scenarios.filter((scenario) => {
    if (filter === 'Failed only' && scenario.status !== 'Failed') return false;
    if (searchQuery && !scenario.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleCreateScenario = () => {
    // Handle scenario creation
    close();
    // Reset form
    setSiteUrl('');
    setPrompt('');
  };

  const handleCreateProject = () => {
    // Handle project creation
    setIsCreatingProject(false);
    setNewProjectName('');
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <Title order={1} size="h3" fw={600} className="text-gray-900">
          Dashboard
        </Title>
        <Button
          leftSection={<IconPlus size={16} stroke={1.5} />}
          className="bg-blue-600 hover:bg-blue-700 shadow-sm"
          onClick={open}
        >
          Create Scenario from Prompt
        </Button>
      </div>

      <Paper shadow="xs" radius="md" p="md" className="mb-6">
        <div className="flex items-center justify-between">
          <div className="w-64">
            <Select
              placeholder="Select project"
              data={['Main-project', 'E-commerce Site', 'Banking Portal']}
              value={selectedProject}
              onChange={(val) => val && setSelectedProject(val)}
              searchable
              clearable={false}
            />
          </div>
          <Button 
            variant="outline" 
            className="self-end mb-1"
            onClick={() => setIsCreatingProject(true)}
          >
            Create Project
          </Button>
        </div>
      </Paper>

      <div className="mb-6">
        <ScenarioStats stats={stats} />
      </div>

      <Paper shadow="sm" radius="md" className="overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <Title order={3} size="h6" className="text-gray-700 font-semibold">
            Recent Scenarios
          </Title>
          <div className="flex items-center">
            <div className="relative">
              <IconSearch size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search scenarios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="py-1 pl-8 pr-3 border border-gray-200 rounded-md text-sm w-[200px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="ml-4">
              <Select
                placeholder="Group by"
                data={[
                  { value: 'None', label: 'None' },
                  { value: 'Flows', label: 'Flows' },
                  { value: 'By failed step', label: 'By failed step' }
                ]}
                value={groupBy}
                onChange={(value) => value && setGroupBy(value as GroupByOption)}
                className="w-32"
                size="xs"
              />
            </div>
          </div>
        </div>
        
        <div className="rounded-lg overflow-auto" style={{ maxHeight: '500px' }}>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600 sticky top-0 z-10">
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
                  onClick={() => navigate('/reports')}
                />
              ))}
              {filteredScenarios.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No scenarios found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Paper>

      {/* Create Scenario Modal */}
      <Modal 
        opened={opened} 
        onClose={close}
        title={<Title order={3}>Create Scenario from Prompt</Title>}
        size="lg"
        centered
        overlayProps={{
          blur: 3,
          opacity: 0.55,
        }}
      >
        <div className="space-y-4">
          <TextInput
            label="Website URL"
            placeholder="Enter website URL"
            required
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
          />
          
          <Textarea
            label="AI Prompt"
            placeholder="Describe what you want the AI to do (e.g., 'Test the login functionality')"
            required
            minRows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          
          <Select
            label="Browser"
            placeholder="Select browser"
            data={[
              { 
                value: 'chrome', 
                label: 'Chrome',
                leftSection: <IconBrandChrome size={16} />
              },
              { 
                value: 'safari', 
                label: 'Safari',
                leftSection: <IconBrandSafari size={16} />
              }
            ]}
            searchable
          />
          
          <Divider my="sm" />
          
          <div className="flex justify-end pt-2">
            <Button variant="subtle" onClick={close} className="mr-2">
              Cancel
            </Button>
            <Button 
              onClick={handleCreateScenario}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Create Scenario
            </Button>
          </div>
        </div>
      </Modal>

      {/* Create Project Modal */}
      <Modal
        opened={isCreatingProject}
        onClose={() => setIsCreatingProject(false)}
        title={<Title order={3}>Create New Project</Title>}
        size="md"
        centered
        overlayProps={{
          blur: 3,
          opacity: 0.55,
        }}
      >
        <div className="space-y-4">
          <TextInput
            label="Project Name"
            placeholder="Enter project name"
            required
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          
          <TextInput
            label="Base URL"
            placeholder="https://example.com"
          />
          
          <Divider my="sm" />
          
          <div className="flex justify-end pt-2">
            <Button variant="subtle" onClick={() => setIsCreatingProject(false)} className="mr-2">
              Cancel
            </Button>
            <Button 
              onClick={handleCreateProject}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Create Project
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
} 