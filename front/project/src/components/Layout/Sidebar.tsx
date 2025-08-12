import React from 'react';
import { 
  Users, 
  MapPin, 
  Plane, 
  Ticket, 
  CheckSquare, 
  Briefcase,
  Heart,
  BarChart3,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Panel Principal', icon: BarChart3, roles: ['admin', 'operador'] },
  { id: 'clientes', label: 'Clientes', icon: Users, roles: ['admin', 'operador'] },
  { id: 'aeropuertos', label: 'Aeropuertos', icon: MapPin, roles: ['admin', 'operador'] },
  { id: 'aeronaves', label: 'Aeronaves', icon: Plane, roles: ['admin', 'operador'] },
  { id: 'tickets', label: 'Tickets', icon: Ticket, roles: ['admin', 'operador', 'cliente'] },
  { id: 'checkin', label: 'Check-in', icon: CheckSquare, roles: ['admin', 'operador', 'cliente'] },
  { id: 'equipaje', label: 'Equipaje', icon: Briefcase, roles: ['admin', 'operador', 'cliente'] },
  { id: 'salud', label: 'Requisitos de Salud', icon: Heart, roles: ['admin', 'operador', 'cliente'] },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  onSectionChange, 
  isOpen, 
  onClose 
}) => {
  const { user } = useAuth();

  const filteredMenuItems = menuItems.filter(item => 
    !user || item.roles.includes(user.role)
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50
        md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
          <h2 className="text-lg font-semibold text-gray-900">Menú</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  onClose();
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};