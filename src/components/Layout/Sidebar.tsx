@@ .. @@
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
-  X
+  X,
+  LogIn,
+  Home
 } from 'lucide-react';
 import { useAuth } from '../../contexts/AuthContext';

@@ .. @@
 const menuItems = [
-  { id: 'dashboard', label: 'Panel Principal', icon: BarChart3, roles: ['admin', 'operador'] },
-  { id: 'clientes', label: 'Clientes', icon: Users, roles: ['admin', 'operador'] },
-  { id: 'aeropuertos', label: 'Aeropuertos', icon: MapPin, roles: ['admin', 'operador'] },
-  { id: 'aeronaves', label: 'Aeronaves', icon: Plane, roles: ['admin', 'operador'] },
-  { id: 'tickets', label: 'Tickets', icon: Ticket, roles: ['admin', 'operador', 'cliente'] },
-  { id: 'checkin', label: 'Check-in', icon: CheckSquare, roles: ['admin', 'operador', 'cliente'] },
-  { id: 'equipaje', label: 'Equipaje', icon: Briefcase, roles: ['admin', 'operador', 'cliente'] },
-  { id: 'salud', label: 'Requisitos de Salud', icon: Heart, roles: ['admin', 'operador', 'cliente'] },
+  { id: 'home', label: 'Inicio', icon: Home, roles: ['guest', 'admin', 'operador', 'cliente'] },
+  { id: 'tickets', label: 'Comprar Vuelos', icon: Ticket, roles: ['guest', 'admin', 'operador', 'cliente'] },
+  { id: 'checkin', label: 'Check-in', icon: CheckSquare, roles: ['guest', 'admin', 'operador', 'cliente'] },
+  { id: 'equipaje', label: 'Equipaje', icon: Briefcase, roles: ['guest', 'admin', 'operador', 'cliente'] },
+  { id: 'salud', label: 'Requisitos de Salud', icon: Heart, roles: ['guest', 'admin', 'operador', 'cliente'] },
+  { id: 'dashboard', label: 'Panel Principal', icon: BarChart3, roles: ['admin', 'operador'] },
+  { id: 'clientes', label: 'Clientes', icon: Users, roles: ['admin', 'operador'] },
+  { id: 'aeropuertos', label: 'Aeropuertos', icon: MapPin, roles: ['admin', 'operador'] },
+  { id: 'aeronaves', label: 'Aeronaves', icon: Plane, roles: ['admin', 'operador'] },
 ];

@@ .. @@
 export const Sidebar: React.FC<SidebarProps> = ({ 
   activeSection, 
   onSectionChange, 
   isOpen, 
   onClose 
 }) => {
   const { user } = useAuth();

   const filteredMenuItems = menuItems.filter(item => 
-    !user || item.roles.includes(user.role)
+    user ? item.roles.includes(user.role) : item.roles.includes('guest')
   );

@@ .. @@
       {/* Sidebar */}
       <aside className={`
-        fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50
+        fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 border-r border-gray-200
         md:relative md:translate-x-0
         ${isOpen ? 'translate-x-0' : '-translate-x-full'}
       `}>
-        <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
-          <h2 className="text-lg font-semibold text-gray-900">Menú</h2>
+        <div className="flex items-center justify-between p-4 border-b border-gray-200">
+          <div className="flex items-center space-x-2">
+            <div className="w-8 h-8 bg-avianca-primary rounded-full flex items-center justify-center">
+              <Plane className="h-4 w-4 text-white" />
+            </div>
+            <h2 className="text-lg font-bold text-avianca-text">Avianca</h2>
+          </div>
           <button
             onClick={onClose}
-            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
+            className="p-2 rounded-md hover:bg-gray-100 transition-colors md:hidden"
           >
             <X className="h-5 w-5 text-gray-600" />
           </button>
         </div>
         
-        <nav className="p-4 space-y-2">
+        <nav className="p-4 space-y-1">
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
-                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
+                  w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200
                   ${isActive 
-                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
-                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
+                    ? 'bg-avianca-primary text-white shadow-lg' 
+                    : 'text-avianca-text hover:bg-avianca-light hover:text-avianca-primary'
                   }
                 `}
               >
-                <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
+                <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-avianca-secondary'}`} />
                 <span className="font-medium">{item.label}</span>
               </button>
             );
           })}
+          
+          {!user && (
+            <div className="pt-4 border-t border-gray-200 mt-4">
+              <button
+                onClick={() => {
+                  onSectionChange('login');
+                  onClose();
+                }}
+                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 bg-avianca-secondary text-white hover:bg-opacity-90"
+              >
+                <LogIn className="h-5 w-5 text-white" />
+                <span className="font-medium">Iniciar Sesión</span>
+              </button>
+            </div>
+          )}
         </nav>
       </aside>
     </>