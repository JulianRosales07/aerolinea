@@ .. @@
 export const StatsCard: React.FC<StatsCardProps> = ({ 
   title, 
   value, 
   change, 
   icon: Icon, 
   color 
 }) => {
   const colors = colorClasses[color];

   return (
-    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
+    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
       <div className="flex items-center justify-between">
         <div>
-          <p className="text-sm font-medium text-gray-600">{title}</p>
-          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
+          <p className="text-sm font-medium text-avianca-gray">{title}</p>
+          <p className="text-2xl font-bold text-avianca-text mt-1">{value}</p>
           {change && (
-            <p className={`text-sm font-medium mt-1 ${colors.text}`}>
+            <p className={`text-sm font-medium mt-1 text-avianca-secondary`}>
               {change}
             </p>
           )}
         </div>
-        <div className={`p-3 rounded-xl ${colors.bg}`}>
-          <Icon className={`h-6 w-6 ${colors.icon}`} />
+        <div className={`p-3 rounded-xl bg-avianca-primary/10`}>
+          <Icon className={`h-6 w-6 text-avianca-primary`} />
         </div>
       </div>
     </div>
   );
 };