import React from 'react';
import { Plane, User, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-md hover:bg-avianca-light transition-colors md:hidden"
          >
            <Menu className="h-5 w-5 text-avianca-text" />
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-avianca-primary rounded-lg">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-avianca-text">Avianca</h1>
              <p className="text-sm text-avianca-gray hidden sm:block">
                {user ? 'Sistema de Gestión' : 'Vuela con nosotros'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-avianca-light rounded-full">
                  <User className="h-4 w-4 text-avianca-secondary" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-avianca-text">{user.name}</p>
                  <p className="text-xs text-avianca-gray capitalize">{user.role}</p>
                </div>
              </div>
              
              <button
                onClick={logout}
                className="p-2 text-avianca-gray hover:text-avianca-primary hover:bg-red-50 rounded-lg transition-colors"
                title="Cerrar Sesión"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </>
          ) : (
            <div className="text-sm text-avianca-gray">
              Bienvenido a Avianca
            </div>
          )}
        </div>
      </div>
    </header>
  );
};