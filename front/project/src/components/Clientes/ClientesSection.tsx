import React, { useState } from 'react';
import { Search, Plus, User, Phone, Mail, Globe, Filter } from 'lucide-react';
import { Cliente } from '../../types';

export const ClientesSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('todos');

  // Mock data
  const clientes: Cliente[] = [
    {
      id_cliente: '1',
      nombre_cliente: 'María González',
      cel_cliente: '+57 300 123 4567',
      pais_cliente: 'Colombia',
      tipo_identificacion: 'cedula',
      numero_identificacion: '12345678',
      fecha_nacimiento: '1990-05-15',
      correo_cliente: 'maria@email.com',
      contraseña_cliente: '',
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id_cliente: '2',
      nombre_cliente: 'Carlos Ruiz',
      cel_cliente: '+57 301 987 6543',
      pais_cliente: 'Colombia',
      tipo_identificacion: 'pasaporte',
      numero_identificacion: 'AB123456',
      fecha_nacimiento: '1985-12-22',
      correo_cliente: 'carlos@email.com',
      contraseña_cliente: '',
      created_at: '2024-01-10T14:30:00Z'
    }
  ];

  const filteredClientes = clientes.filter(cliente =>
    cliente.nombre_cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.correo_cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Clientes</h1>
          <p className="text-gray-600 mt-1">Administra los clientes registrados en el sistema</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Nuevo Cliente</span>
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
                placeholder="Buscar por nombre o correo..."
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
              <option value="cedula">Cédula</option>
              <option value="pasaporte">Pasaporte</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClientes.map((cliente) => (
          <div key={cliente.id_cliente} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{cliente.nombre_cliente}</h3>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">
                    {cliente.tipo_identificacion}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{cliente.correo_cliente}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{cliente.cel_cliente}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Globe className="h-4 w-4" />
                <span>{cliente.pais_cliente}</span>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  {cliente.tipo_identificacion.toUpperCase()}: {cliente.numero_identificacion}
                </p>
                <p className="text-xs text-gray-500">
                  Registrado: {new Date(cliente.created_at).toLocaleDateString('es-ES')}
                </p>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                Editar
              </button>
              <button className="flex-1 px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                Ver Historial
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredClientes.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron clientes</h3>
          <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  );
};