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
  X,
  Home,
  LogIn
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const publicMenuItems = [
  { id: 'home', label: 'Inicio', icon: Home },
  { id: 'tickets', label: 'Comprar Vuelos', icon: Ticket },
  { id: 'checkin', label: 'Check-in', icon: CheckSquare },
  { id: 'equipaje', label: 'Equipaje', icon: Briefcase },
  { id: 'salud', label: 'Requisitos de Salud', icon: Heart },
];

const adminMenuItems = [
  { id: 'dashboard', label: 'Panel Principal', icon: BarChart3, roles: ['admin', 'operador'] },
  { id: 'clientes', label: 'Clientes', icon: Users, roles: ['admin', 'operador'] },
  { id: 'aeropuertos', label: 'Aeropuertos', icon: MapPin, roles: ['admin', 'operador'] },
  { id: 'aeronaves', label: 'Aeronaves', icon: Plane, roles: ['admin', 'operador'] },
  { id: 'tickets', label: 'Gestión de Tickets', icon: Ticket, roles: ['admin', 'operador'] },
  { id: 'checkin', label: 'Check-in', icon: CheckSquare, roles: ['admin', 'operador'] },
  { id: 'equipaje', label: 'Equipaje', icon: Briefcase, roles: ['admin', 'operador'] },
  { id: 'salud', label: 'Requisitos de Salud', icon: Heart, roles: ['admin', 'operador'] },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  onSectionChange, 
  isOpen, 
  onClose 
}) => {
  const { user } = useAuth();

  const menuItems = user ? adminMenuItems.filter(item => 
    item.roles.includes(user.role)
  ) : publicMenuItems;

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
          <h2 className="text-lg font-semibold text-avianca-text">Menú</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-avianca-light transition-colors"
          >
            <X className="h-5 w-5 text-avianca-text" />
          </button>
        </div>
        
        {/* Avianca Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-avianca-primary rounded-lg">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-avianca-text">Avianca</h1>
              <p className="text-sm text-avianca-gray">
                {user ? 'Panel Administrativo' : 'Bienvenido'}
              </p>
            </div>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
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
                  w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200
                  ${isActive 
                    ? 'bg-avianca-primary/10 text-avianca-primary border-l-4 border-avianca-primary' 
                    : 'text-avianca-text hover:bg-avianca-light hover:text-avianca-secondary'
                  }
                `}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-avianca-primary' : 'text-avianca-secondary'}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
          
          {!user && (
            <button
              onClick={() => {
                onSectionChange('login');
                onClose();
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-avianca-text hover:bg-avianca-light hover:text-avianca-secondary mt-4 border-t border-gray-200 pt-6"
            >
              <LogIn className="h-5 w-5 text-avianca-secondary" />
              <span className="font-medium">Iniciar Sesión</span>
            </button>
          )}
        </nav>
      </aside>
    </>
  );
};