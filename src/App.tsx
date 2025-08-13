@@ .. @@
 import React, { useState } from 'react';
 import { AuthProvider, useAuth } from './contexts/AuthContext';
 import { Header } from './components/Layout/Header';
 import { Sidebar } from './components/Layout/Sidebar';
 import { LoginForm } from './components/Auth/LoginForm';
 import { RegisterForm } from './components/Auth/RegisterForm';
+import { HomePage } from './components/Home/HomePage';
 import { Dashboard } from './components/Dashboard/Dashboard';
 import { ClientesSection } from './components/Clientes/ClientesSection';
 import { AeropuertosSection } from './components/Aeropuertos/AeropuertosSection';
@@ .. @@
 
 const AppContent: React.FC = () => {
   const { user, isLoading } = useAuth();
-  const [activeSection, setActiveSection] = useState('dashboard');
+  const [activeSection, setActiveSection] = useState(user ? 'dashboard' : 'home');
   const [isAuthMode, setIsAuthMode] = useState<'login' | 'register'>('login');
   const [sidebarOpen, setSidebarOpen] = useState(false);

@@ .. @@
   if (isLoading) {
     return <LoadingSpinner />;
   }

-  if (!user) {
+  if (!user && (activeSection === 'login' || activeSection === 'register')) {
     return (
       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-center justify-center p-4">
         <div className="w-full max-w-4xl">
@@ .. @@
   const renderSection = () => {
     switch (activeSection) {
+      case 'home':
+        return <HomePage />;
+      case 'login':
+        return user ? <Dashboard /> : null;
       case 'dashboard':
-        return <Dashboard />;
+        return user ? <Dashboard /> : <HomePage />;
       case 'clientes':
-        return <ClientesSection />;
+        return user ? <ClientesSection /> : <HomePage />;
       case 'aeropuertos':
-        return <AeropuertosSection />;
+        return user ? <AeropuertosSection /> : <HomePage />;
       case 'aeronaves':
-        return <AeronavesSection />;
+        return user ? <AeronavesSection /> : <HomePage />;
       case 'tickets':
         return <TicketsSection />;
       case 'checkin':
@@ .. @@
       case 'salud':
         return <SaludSection />;
       default:
-        return <Dashboard />;
+        return user ? <Dashboard /> : <HomePage />;
     }
   };

@@ .. @@
   return (
-    <div className="min-h-screen bg-gray-50 flex">
+    <div className="min-h-screen bg-avianca-light flex">
       <Sidebar
         activeSection={activeSection}
         onSectionChange={setActiveSection}
@@ .. @@
       <div className="flex-1 flex flex-col">
         <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
         
         <main className="flex-1 p-6 overflow-auto">
           {renderSection()}
         </main>
       </div>
     </div>
   );
 };