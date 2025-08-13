@@ .. @@
 /** @type {import('tailwindcss').Config} */
 export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
-    extend: {},
+    extend: {
+      colors: {
+        'avianca-text': '#2E2F3C',
+        'avianca-secondary': '#1391A6',
+        'avianca-primary': '#FE305C',
+        'avianca-light': '#F8F9FA',
+        'avianca-gray': '#6B7280'
+      }
+    },
   },
   plugins: [],
 };