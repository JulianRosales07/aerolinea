import React, { useState } from 'react';
import { Search, Plus, MapPin, Edit3, Trash2, Filter } from 'lucide-react';
import { Aeropuerto } from '../../types';

export const AeropuertosSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('todos');

  // Mock data
  const aeropuertos: Aeropuerto[] = [
    {
      id: '1',
      nombre: 'Aeropuerto Internacional El Dorado',
      ciudad: 'Bogotá',
      departamento: 'Cundinamarca',
      codigo_iata: 'BOG',
      tipo: 'internacional',
      latitud: 4.701594,
      longitud: -74.146947,
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      nombre: 'Aeropuerto José María Córdova',
      ciudad: 'Medellín',
      departamento: 'Antioquia',
      codigo_iata: 'MDE',
      tipo: 'internacional',
      latitud: 6.164833,
      longitud: -75.423056,
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '3',
      nombre: 'Aeropuerto Rafael Núñez',
      ciudad: 'Cartagena',
      departamento: 'Bolívar',
      codigo_iata: 'CTG',
      tipo: 'nacional',
      latitud: 10.442381,
      longitud: -75.512961,
      created_at: '2024-01-01T00:00:00Z'
    }
  ];

  const filteredAeropuertos = aeropuertos.filter(aeropuerto => {
    const matchesSearch = aeropuerto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         aeropuerto.ciudad.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         aeropuerto.codigo_iata.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'todos' || aeropuerto.tipo === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Aeropuertos</h1>
          <p className="text-gray-600 mt-1">Administra la red de aeropuertos nacionales e internacionales</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Registrar Aeropuerto</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, ciudad o código IATA..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todos">Todos</option>
              <option value="nacional">Nacional</option>
              <option value="internacional">Internacional</option>
            </select>
          </div>
        </div>
      </div>

      {/* Airports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAeropuertos.map((aeropuerto) => (
          <div key={aeropuerto.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{aeropuerto.nombre}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-lg font-bold text-blue-600">{aeropuerto.codigo_iata}</span>
                    <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                      aeropuerto.tipo === 'internacional' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {aeropuerto.tipo}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-1">
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit3 className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">
                  <strong>Ubicación:</strong> {aeropuerto.ciudad}, {aeropuerto.departamento}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p><strong>Latitud:</strong> {aeropuerto.latitud.toFixed(6)}</p>
                </div>
                <div>
                  <p><strong>Longitud:</strong> {aeropuerto.longitud.toFixed(6)}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Registrado: {new Date(aeropuerto.created_at).toLocaleDateString('es-ES')}
                </p>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                Ver en Mapa
              </button>
              <button className="flex-1 px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                Ver Vuelos
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredAeropuertos.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron aeropuertos</h3>
          <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  );
};