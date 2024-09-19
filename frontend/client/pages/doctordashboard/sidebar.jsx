import React, { useState, useEffect, useRef } from 'react';
import { Home, Users, Calendar, Star, Menu, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const menuItems = [
    { name: 'Dashboard', icon: Home },
    { name: 'Patients', icon: Users },
    { name: 'Appointments', icon: Calendar },
    { name: 'Reviews', icon: Star },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <nav
      ref={sidebarRef}
      className={`transition-all duration-300 h-screen fixed top-0 left-0 py-4 font-sans ${
        isExpanded ? 'w-64' : 'w-20'
      } bg-[#34a5b1] text-white`}
    >
      <button 
        onClick={toggleSidebar} 
        className="absolute top-4 right-4 text-white hover:text-indigo-200 transition-colors"
      >
        <Menu size={24} />
      </button>

      <div className="px-4 py-2 mb-6">
        <h2 className={`text-xl font-bold ${isExpanded ? 'block' : 'hidden'}`}>Dr. Dashboard</h2>
      </div>

      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.name} className="px-4">
            <a
              href="#"
              className={`flex items-center py-3 px-2 rounded-lg transition-colors ${
                isExpanded ? 'hover:bg-indigo-600' : 'justify-center hover:bg-indigo-600'
              }`}
            >
              <item.icon size={20} className="flex-shrink-0" />
              <span
                className={`ml-3 whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                }`}
              >
                {item.name}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-4 left-0 right-0 px-4">
        <a
          href="#"
          className={`flex items-center py-3 px-2 rounded-lg transition-colors ${
            isExpanded ? 'hover:bg-indigo-600' : 'justify-center hover:bg-indigo-600'
          }`}
        >
          <LogOut size={20} className="flex-shrink-0" />
          <span
            className={`ml-3 whitespace-nowrap overflow-hidden transition-all duration-300 ${
              isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
            }`}
          >
            Logout
          </span>
        </a>
      </div>
    </nav>
  );
};

export default Sidebar;