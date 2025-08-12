import React from 'react';
import { Plane } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin">
            <Plane className="h-12 w-12 text-blue-600 mx-auto" />
          </div>
          <div className="mt-4">
            <div className="w-16 h-1 bg-blue-200 rounded-full mx-auto overflow-hidden">
              <div className="w-full h-full bg-blue-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        <p className="text-gray-600 mt-4 text-lg">Cargando AeroManage...</p>
      </div>
    </div>
  );
};