import { SegmentedControl, Select, TextInput } from '@mantine/core';
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
    <div className="flex flex-wrap gap-4 mb-6 items-center">
      <div className="flex-grow-0 mr-4">
        <div className="flex text-sm font-medium text-gray-700">
          <div className={`px-4 py-1.5 rounded-l-md border border-gray-200 ${filterValue === 'Failed only' ? 'bg-[#f3f4f6]' : 'bg-white'}`}>
            <button 
              onClick={() => onFilterChange('Failed only')}
              className={filterValue === 'Failed only' ? 'text-gray-900' : 'text-gray-600'}
            >
              Failed only
            </button>
          </div>
          <div className={`px-4 py-1.5 rounded-r-md border-t border-r border-b border-gray-200 ${filterValue === 'All' ? 'bg-[#f3f4f6]' : 'bg-white'}`}>
            <button 
              onClick={() => onFilterChange('All')}
              className={filterValue === 'All' ? 'text-gray-900' : 'text-gray-600'}
            >
              All
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 font-medium">Group by</span>
        <div className="relative">
          <select 
            value={groupByValue}
            onChange={(e) => onGroupByChange(e.target.value as GroupByOption)}
            className="appearance-none bg-white border border-gray-200 rounded-md py-1 pl-2 pr-7 text-sm font-medium text-gray-700 h-[30px]"
          >
            <option value="None">None</option>
            <option value="Flows">Flows</option>
            <option value="By failed step">By failed step</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <IconChevronDown size={14} stroke={1.5} className="text-gray-500" />
          </div>
        </div>
      </div>
      
      <div className="flex-grow flex justify-end">
        <div className="relative">
          <IconSearch size={14} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Find a scenario..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="py-1.5 pl-8 pr-3 border border-gray-200 rounded-md text-sm w-[250px]"
          />
        </div>
      </div>
    </div>
  );
} 