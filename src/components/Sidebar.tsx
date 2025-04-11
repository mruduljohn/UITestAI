import { NavLink, Button } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { 
  IconHome as IconDashboard, 
  IconReportAnalytics,
  IconArrowBarLeft,
  IconArrowBarRight
} from '@tabler/icons-react';

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    { 
      icon: IconDashboard, 
      label: 'Dashboard', 
      href: '/dashboard', 
      active: currentPath === '/dashboard'
    },
    { 
      icon: IconReportAnalytics, 
      label: 'Reports', 
      href: '/reports', 
      active: currentPath === '/reports'
    },
  ];

  return (
    <div className={`${collapsed ? 'w-[70px]' : 'w-[270px]'} h-full bg-[#f3f4f6] border-r border-gray-200 flex flex-col relative transition-all duration-300`}>
      <div className="h-14 flex items-center px-5 border-b border-gray-200">
        <div className="flex items-center overflow-hidden">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center flex-shrink-0">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="white" 
              className="w-5 h-5"
            >
              <path d="M9.5 14.25l-5.584 2.936 1.066-6.218L.465 6.564l6.243-.907L9.5 0l2.792 5.657 6.243.907-4.517 4.404 1.066 6.218" />
            </svg>
          </div>
          <h1 className={`text-xl font-semibold ml-2 whitespace-nowrap transition-opacity duration-300 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>
            UITESTAI
          </h1>
        </div>
      </div>
      
      <nav className="flex-1 py-2 overflow-hidden">
        {navItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.href}
            style={{ textDecoration: 'none' }}
            className="block"
          >
            <NavLink
              leftSection={<item.icon size={18} stroke={1.5} />}
              label={collapsed ? null : item.label}
              active={item.active}
              className={`${collapsed ? 'mx-1 justify-center' : 'mx-3'} mb-1 rounded-md overflow-hidden`}
              classNames={{
                root: item.active ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 font-medium hover:bg-gray-200',
                body: 'break-words overflow-hidden',
                section: collapsed ? 'mr-0' : ''
              }}
            />
          </Link>
        ))}
      </nav>

      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10">
        <Button
          variant="subtle"
          onClick={() => setCollapsed(!collapsed)}
          className="w-6 h-18 rounded-l-md bg-white border border-gray-200 border-r-0 flex items-center justify-center text-gray-500 shadow-sm"
          styles={{
            root: {
              padding: '0',
              minWidth: '24px',
              '&:hover': {
                backgroundColor: 'white',
                color: '#3182ce'
              }
            }
          }}
        >
          {collapsed ? 
            <IconArrowBarRight size={16} stroke={1.5} /> : 
            <IconArrowBarLeft size={16} stroke={1.5} />
          }
        </Button>
      </div>
    </div>
  );
} 