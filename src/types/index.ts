@@ .. @@
 export interface User {
   id: string;
   email: string;
   name: string;
   role: 'admin' | 'operador' | 'cliente';
   created_at: string;
 }
+
+export interface PublicUser {
+  isGuest: true;
+}