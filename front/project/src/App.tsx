import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { LoginForm } from './components/Auth/LoginForm';
import { RegisterForm } from './components/Auth/RegisterForm';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ClientesSection } from './components/Clientes/ClientesSection';
import { AeropuertosSection } from './components/Aeropuertos/AeropuertosSection';
import { TicketsSection } from './components/Tickets/TicketsSection';
import { AeronavesSection } from './components/Aeronaves/AeronavesSection';
import { CheckInSection } from './components/CheckIn/CheckInSection';
import { EquipajeSection } from './components/Equipaje/EquipajeSection';
import { SaludSection } from './components/Salud/SaludSection';
import { LoadingSpinner } from './components/Common/LoadingSpinner';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isAuthMode, setIsAuthMode] = useState<'login' | 'register'>('login');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {isAuthMode === 'login' ? (
            <LoginForm onToggleMode={() => setIsAuthMode('register')} />
          ) : (
            <RegisterForm onToggleMode={() => setIsAuthMode('login')} />
          )}
        </div>
      </div>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'clientes':
        return <ClientesSection />;
      case 'aeropuertos':
        return <AeropuertosSection />;
      case 'aeronaves':
        return <AeronavesSection />;
      case 'tickets':
        return <TicketsSection />;
      case 'checkin':
        return <CheckInSection />;
      case 'equipaje':
        return <EquipajeSection />;
      case 'salud':
        return <SaludSection />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col">
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 p-6 overflow-auto">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;