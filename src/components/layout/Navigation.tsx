import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  LayoutDashboard, 
  FileText, 
  CheckSquare, 
  Users, 
  Settings 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NavigationItem: React.FC<{
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  end?: boolean;
}> = ({ to, icon, children, end = false }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      cn(
        "flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth",
        "hover:bg-secondary text-muted-foreground hover:text-foreground",
        isActive && "bg-primary text-primary-foreground hover:bg-primary-hover hover:text-primary-foreground font-medium"
      )
    }
  >
    <span className="w-5 h-5 flex-shrink-0">{icon}</span>
    <span>{children}</span>
  </NavLink>
);

export const Navigation: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const candidateNavItems = [
    { to: '/', icon: <Home />, label: 'Home', end: true },
    { to: '/dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
    { to: '/applications', icon: <FileText />, label: 'My Applications' },
    { to: '/allotment', icon: <CheckSquare />, label: 'Allotment Status' },
  ];

  const adminNavItems = [
    { to: '/admin', icon: <LayoutDashboard />, label: 'Dashboard', end: true },
    { to: '/admin/applicants', icon: <Users />, label: 'Applicants' },
    { to: '/admin/allocations', icon: <Settings />, label: 'Allocations' },
  ];

  const navItems = user.role === 'admin' ? adminNavItems : candidateNavItems;

  return (
    <nav className="bg-card border-r border-border w-64 min-h-screen p-4">
      <div className="space-y-2">
        {navItems.map((item) => (
          <NavigationItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            end={item.end}
          >
            {item.label}
          </NavigationItem>
        ))}
      </div>
    </nav>
  );
};