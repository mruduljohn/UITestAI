import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home as IconDashboard, 
  BarChartBig as IconReportAnalytics
} from 'lucide-react';

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

  // Add resize listener to auto-collapse sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex h-full">
      <div className={`${collapsed ? 'w-16' : 'w-64'} h-screen bg-[#f8f9fa] border-r border-gray-200 flex flex-col shadow-sm relative transition-all duration-300 ease-in-out`}>
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <div className="flex items-center px-4">
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
            {!collapsed && (
              <h1 className="text-xl font-semibold ml-2 whitespace-nowrap">
                UITESTAI
              </h1>
            )}
          </div>
        </div>
        
        <nav className="flex-1 py-6 overflow-hidden">
          {navItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.href}
              className={`flex items-center px-3 py-3 mx-2 rounded-lg mb-1 text-sm font-medium transition-colors ${
                item.active 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon 
                className={`${collapsed ? 'mx-auto' : 'mr-3'}`} 
                size={20} 
                strokeWidth={1.5} 
              />
              {!collapsed && (
                <span>{item.label}</span>
              )}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-4 top-20 w-8 h-8 bg-white rounded-full border border-gray-200 flex items-center justify-center shadow-lg hover:shadow-md text-gray-500 hover:text-blue-600 transition-all duration-200 z-10"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.5 3.5L11 8L6.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 3.5L5 8L9.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
} 