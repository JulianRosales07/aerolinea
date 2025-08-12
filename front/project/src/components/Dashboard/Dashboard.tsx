import React from 'react';
import { Users, MapPin, Plane, Ticket, TrendingUp, Calendar } from 'lucide-react';
import { StatsCard } from './StatsCard';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Panel Principal</h1>
          <p className="text-gray-600 mt-1">Resumen del sistema aeronáutico</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>{new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Clientes"
          value="1,234"
          change="+12% este mes"
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Aeropuertos Activos"
          value="48"
          change="+2 nuevos"
          icon={MapPin}
          color="green"
        />
        <StatsCard
          title="Aeronaves en Servicio"
          value="156"
          change="98% operativas"
          icon={Plane}
          color="purple"
        />
        <StatsCard
          title="Tickets Vendidos Hoy"
          value="89"
          change="+25% vs ayer"
          icon={Ticket}
          color="yellow"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vuelos de Hoy</h3>
          <div className="space-y-4">
            {[
              { vuelo: 'AE-101', ruta: 'BOG → MDE', estado: 'A Tiempo', hora: '08:30' },
              { vuelo: 'AE-205', ruta: 'CTG → BOG', estado: 'Retrasado', hora: '14:15' },
              { vuelo: 'AE-087', ruta: 'CLO → BOG', estado: 'Abordando', hora: '16:45' }
            ].map((vuelo, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{vuelo.vuelo}</p>
                  <p className="text-sm text-gray-600">{vuelo.ruta}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{vuelo.hora}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    vuelo.estado === 'A Tiempo' ? 'bg-green-100 text-green-800' :
                    vuelo.estado === 'Retrasado' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {vuelo.estado}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado de Aeronaves</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Operativas</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 rounded-full h-2" style={{ width: '85%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900">132</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">En Mantenimiento</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 rounded-full h-2" style={{ width: '12%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900">18</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Fuera de Servicio</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 rounded-full h-2" style={{ width: '3%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900">6</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
        <div className="space-y-4">
          {[
            { accion: 'Nuevo cliente registrado', usuario: 'María González', tiempo: 'Hace 15 min' },
            { accion: 'Check-in completado', usuario: 'Carlos Ruiz - Vuelo AE-101', tiempo: 'Hace 32 min' },
            { accion: 'Mantenimiento programado', usuario: 'Aeronave HK-4821', tiempo: 'Hace 1 hora' },
            { accion: 'Ticket cancelado', usuario: 'Ana Martínez - Vuelo AE-205', tiempo: 'Hace 2 horas' }
          ].map((actividad, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="p-1 bg-blue-100 rounded-full">
                <TrendingUp className="h-3 w-3 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{actividad.accion}</p>
                <p className="text-xs text-gray-600">{actividad.usuario}</p>
              </div>
              <span className="text-xs text-gray-500">{actividad.tiempo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};