import { NavLink, Button } from '@mantine/core';
import { 
  IconHome as IconDashboard, 
  IconCheckbox,
  IconList,
  IconReportAnalytics,
  IconBrain,
  IconFlask as IconTestPipe,
  IconSettings,
  IconArrowBarLeft
} from '@tabler/icons-react';

export function Sidebar() {
  const navItems = [
    { icon: IconDashboard, label: 'Dashboard', href: '#' },
    { icon: IconCheckbox, label: 'Features', href: '#' },
    { icon: IconList, label: 'Executions', href: '#' },
    { icon: IconReportAnalytics, label: 'Reports', href: '#', active: true },
    { icon: IconBrain, label: 'AI Oversight', href: '#' },
    { icon: IconTestPipe, label: 'Test Data', href: '#' },
    { icon: IconSettings, label: 'Settings', href: '#' },
  ];

  return (
    <div className="w-[270px] h-full bg-[#f3f4f6] border-r border-gray-200 flex flex-col relative">
      <div className="h-14 flex items-center px-5 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="white" 
              className="w-5 h-5"
            >
              <path d="M9.5 14.25l-5.584 2.936 1.066-6.218L.465 6.564l6.243-.907L9.5 0l2.792 5.657 6.243.907-4.517 4.404 1.066 6.218" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold ml-2">BlinQAlt</h1>
        </div>
      </div>
      
      <nav className="flex-1 py-2">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            leftSection={<item.icon size={18} stroke={1.5} />}
            label={item.label}
            active={item.active}
            className={`mx-3 mb-1 rounded-md ${
              item.active 
                ? 'bg-blue-50 text-blue-600 font-medium' 
                : 'text-gray-700 font-medium'
            }`}
          />
        ))}
      </nav>

      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <Button
          variant="subtle"
          className="w-6 h-18 rounded-l-md bg-white border border-gray-200 border-r-0 flex items-center justify-center text-gray-500"
          styles={{
            root: {
              padding: '0',
              minWidth: '24px',
              '&:hover': {
                backgroundColor: 'white',
              }
            }
          }}
        >
          <IconArrowBarLeft size={16} stroke={1.5} />
        </Button>
      </div>
    </div>
  );
} 