@@ .. @@
 export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
   const { user, logout } = useAuth();

   return (
-    <header className="bg-white shadow-sm border-b border-gray-200">
+    <header className="bg-white shadow-sm border-b border-gray-200">
       <div className="flex items-center justify-between px-4 py-3">
         <div className="flex items-center space-x-3">
           <button
             onClick={onMenuToggle}
-            className="p-2 rounded-md hover:bg-gray-100 transition-colors md:hidden"
+            className="p-2 rounded-md hover:bg-avianca-light transition-colors md:hidden"
           >
-            <Menu className="h-5 w-5 text-gray-600" />
+            <Menu className="h-5 w-5 text-avianca-text" />
           </button>
           
           <div className="flex items-center space-x-2">
-            <div className="p-2 bg-blue-100 rounded-lg">
-              <Plane className="h-6 w-6 text-blue-600" />
+            <div className="p-2 bg-avianca-primary rounded-lg">
+              <Plane className="h-6 w-6 text-white" />
             </div>
             <div>
-              <h1 className="text-xl font-bold text-gray-900">AeroManage</h1>
-              <p className="text-sm text-gray-500 hidden sm:block">Sistema de Gestión Aeronáutica</p>
+              <h1 className="text-xl font-bold text-avianca-text">Avianca</h1>
+              <p className="text-sm text-avianca-gray hidden sm:block">Conectamos tu mundo</p>
             </div>
           </div>
         </div>

@@ .. @@
           {user && (
             <>
               <div className="flex items-center space-x-2">
-                <div className="p-2 bg-gray-100 rounded-full">
-                  <User className="h-4 w-4 text-gray-600" />
+                <div className="p-2 bg-avianca-light rounded-full">
+                  <User className="h-4 w-4 text-avianca-secondary" />
                 </div>
                 <div className="hidden sm:block">
-                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
-                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
+                  <p className="text-sm font-medium text-avianca-text">{user.name}</p>
+                  <p className="text-xs text-avianca-gray capitalize">{user.role}</p>
                 </div>
               </div>
               
               <button
                 onClick={logout}
-                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
+                className="p-2 text-avianca-gray hover:text-avianca-primary hover:bg-red-50 rounded-lg transition-colors"
                 title="Cerrar Sesión"
               >
                 <LogOut className="h-5 w-5" />
               </button>
             </>
           )}
         </div>
       </div>
     </header>
   );
 };