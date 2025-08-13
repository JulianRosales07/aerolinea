@@ .. @@
 /** @type {import('tailwindcss').Config} */
 export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
-    extend: {},
+    extend: {
+      colors: {
+        'avianca': {
+          'text': '#2E2F3C',
+          'secondary': '#1391A6',
+          'primary': '#FE305C',
+          'light': '#F8F9FA',
+          'gray': '#6B7280'
+        }
+      }
+    },
   },
   plugins: [],
 };