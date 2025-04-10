import { Button, Menu } from '@mantine/core';
import { IconChevronDown, IconDots } from '@tabler/icons-react';

export function Header() {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4">
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          <div className="flex items-center px-3 h-8 rounded-l-md bg-white">
            <svg viewBox="0 0 24 24" width="20" height="20" className="mr-1.5 text-gray-700">
              <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M9 10.5v3M15 10.5v3M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-sm font-medium mr-1">Main-project</span>
            <IconChevronDown size={14} stroke={1.5} className="text-gray-500" />
          </div>
          <div className="h-8 rounded-r-md bg-white flex items-center px-3">
            <svg viewBox="0 0 24 24" width="20" height="20" className="mr-1.5 text-gray-700">
              <path d="M7 8h10M7 12h10M7 16h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-sm font-medium mr-1">Dev</span>
            <IconChevronDown size={14} stroke={1.5} className="text-gray-500" />
          </div>
        </div>
        
        <Menu>
          <Menu.Target>
            <Button
              variant="subtle"
              p={0}
              className="text-gray-500 w-8 h-8 flex items-center justify-center"
            >
              <IconDots size={18} />
            </Button>
          </Menu.Target>
          
          <Menu.Dropdown>
            <Menu.Item>Settings</Menu.Item>
            <Menu.Item>Help</Menu.Item>
            <Menu.Item>Log out</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </header>
  );
} 