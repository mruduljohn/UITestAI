import { SegmentedControl, Select, TextInput, Group } from '@mantine/core';
import { FilterOption, GroupByOption } from '../types';
import { IconSearch, IconChevronDown } from '@tabler/icons-react';

interface ScenarioFiltersProps {
  filterValue: FilterOption;
  groupByValue: GroupByOption;
  onFilterChange: (value: FilterOption) => void;
  onGroupByChange: (value: GroupByOption) => void;
  onSearchChange: (value: string) => void;
}

export function ScenarioFilters({
  filterValue,
  groupByValue,
  onFilterChange,
  onGroupByChange,
  onSearchChange,
}: ScenarioFiltersProps) {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <SegmentedControl
          value={filterValue}
          onChange={(value) => onFilterChange(value as FilterOption)}
          data={[
            { label: 'All', value: 'All' },
            { label: 'Failed only', value: 'Failed only' },
          ]}
          size="xs"
          classNames={{
            root: 'border border-gray-200 shadow-sm',
            indicator: 'bg-blue-50',
            label: 'font-medium',
            labelActive: 'text-blue-600',
          }}
        />
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">Group by</span>
          <Select
            value={groupByValue}
            onChange={(value) => value && onGroupByChange(value as GroupByOption)}
            data={[
              { label: 'None', value: 'None' },
              { label: 'Flows', value: 'Flows' },
              { label: 'By failed step', value: 'By failed step' },
            ]}
            size="xs"
            className="w-36"
            styles={{
              input: {
                fontWeight: 500,
                border: '1px solid #e5e7eb',
                minHeight: '30px',
                height: '30px',
              },
            }}
            rightSection={<IconChevronDown size={14} stroke={1.5} className="text-gray-500" />}
          />
        </div>
      </div>
      
      <TextInput
        placeholder="Find a scenario..."
        size="xs"
        leftSection={<IconSearch size={14} className="text-gray-400" />}
        className="w-[200px]"
        onChange={(e) => onSearchChange(e.target.value)}
        styles={{
          input: {
            border: '1px solid #e5e7eb',
            '&:focus': {
              borderColor: '#3b82f6',
            },
          },
        }}
      />
    </div>
  );
} 