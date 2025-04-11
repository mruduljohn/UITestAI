import { Button, Menu, Tooltip, Avatar } from '@mantine/core';
import { IconChevronDown, IconDots, IconBell, IconHelpCircle } from '@tabler/icons-react';

export function Header() {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          <div className="flex items-center px-3 h-8 rounded-l-md bg-white border border-gray-200 border-r-0">
            <svg viewBox="0 0 24 24" width="20" height="20" className="mr-1.5 text-gray-700">
              <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M9 10.5v3M15 10.5v3M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-sm font-medium mr-1">Main-project</span>
            <IconChevronDown size={14} stroke={1.5} className="text-gray-500" />
          </div>
          <div className="h-8 rounded-r-md bg-white border border-gray-200 flex items-center px-3">
            <svg viewBox="0 0 24 24" width="20" height="20" className="mr-1.5 text-gray-700">
              <path d="M7 8h10M7 12h10M7 16h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-sm font-medium mr-1">Dev</span>
            <IconChevronDown size={14} stroke={1.5} className="text-gray-500" />
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Tooltip label="Notifications">
          <Button
            variant="subtle"
            className="text-gray-600 w-8 h-8 p-0 rounded-full"
            styles={{
              root: {
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.05)'
                }
              }
            }}
          >
            <IconBell size={18} stroke={1.5} />
          </Button>
        </Tooltip>
        
        <Tooltip label="Help">
          <Button
            variant="subtle"
            className="text-gray-600 w-8 h-8 p-0 rounded-full"
            styles={{
              root: {
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.05)'
                }
              }
            }}
          >
            <IconHelpCircle size={18} stroke={1.5} />
          </Button>
        </Tooltip>
        
        <Menu position="bottom-end" shadow="md" offset={0}>
          <Menu.Target>
            <div className="w-8 h-8 flex items-center justify-center">
              <Avatar 
                size="sm" 
                radius="xl" 
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" 
                alt="User"
                className="cursor-pointer"
              />
            </div>
          </Menu.Target>
          
          <Menu.Dropdown>
            <Menu.Label>User Settings</Menu.Label>
            <Menu.Item>Profile</Menu.Item>
            <Menu.Item>Settings</Menu.Item>
            <Menu.Divider />
            <Menu.Item color="red">Logout</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </header>
  );
} 