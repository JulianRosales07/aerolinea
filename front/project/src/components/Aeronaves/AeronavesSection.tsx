import React, { useState } from 'react';
import { Search, Plus, Plane, Wrench, CheckCircle, AlertTriangle, XCircle, Filter, Calendar, Settings } from 'lucide-react';
import { Aeronave } from '../../types';

export const AeronavesSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('todos');
  const [activeTab, setActiveTab] = useState<'general' | 'certificaciones' | 'mantenimiento'>('general');

  // Mock data
  const aeronaves: Aeronave[] = [
    {
      id: '1',
      matricula: 'HK-4821',
      modelo: 'Boeing 737-800',
      capacidad: 189,
      estado: 'operativa',
      ultima_inspeccion: '2024-01-01T00:00:00Z',
      proxima_inspeccion: '2024-04-01T00:00:00Z',
      certificaciones: ['FAA', 'EASA', 'OACI'],
      configuracion_cabina: {
        economia: 162,
        premium: 18,
        business: 9,
        primera: 0
      }
    },
    {
      id: '2',
      matricula: 'HK-5142',
      modelo: 'Airbus A320',
      capacidad: 180,
      estado: 'mantenimiento',
      ultima_inspeccion: '2023-12-15T00:00:00Z',
      proxima_inspeccion: '2024-03-15T00:00:00Z',
      certificaciones: ['FAA', 'EASA'],
      configuracion_cabina: {
        economia: 150,
        premium: 24,
        business: 6,
        primera: 0
      }
    },
    {
      id: '3',
      matricula: 'HK-3967',
      modelo: 'Boeing 787-9',
      capacidad: 290,
      estado: 'fuera_servicio',
      ultima_inspeccion: '2023-11-20T00:00:00Z',
      proxima_inspeccion: '2024-02-20T00:00:00Z',
      certificaciones: ['FAA', 'EASA', 'OACI'],
      configuracion_cabina: {
        economia: 234,
        premium: 28,
        business: 24,
        primera: 4
      }
    }
  ];

  const filteredAeronaves = aeronaves.filter(aeronave => {
    const matchesSearch = aeronave.matricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         aeronave.modelo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'todos' || aeronave.estado === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case 'operativa': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'mantenimiento': return <Wrench className="h-5 w-5 text-yellow-600" />;
      case 'fuera_servicio': return <XCircle className="h-5 w-5 text-red-600" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'operativa': return 'bg-green-100 text-green-800';
      case 'mantenimiento': return 'bg-yellow-100 text-yellow-800';
      case 'fuera_servicio': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysUntilInspection = (fecha: string) => {
    const today = new Date();
    const inspectionDate = new Date(fecha);
    const diffTime = inspectionDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Aeronaves</h1>
          <p className="text-gray-600 mt-1">Certificaciones, mantenimiento y configuración de flota</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Registrar Aeronave</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'general', label: 'Vista General', icon: Plane },
            { id: 'certificaciones', label: 'Certificaciones', icon: CheckCircle },
            { id: 'mantenimiento', label: 'Mantenimiento', icon: Wrench }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por matrícula o modelo..."
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
                <option value="operativa">Operativa</option>
                <option value="mantenimiento">Mantenimiento</option>
                <option value="fuera_servicio">Fuera de Servicio</option>
              </select>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'general' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredAeronaves.map((aeronave) => (
                <div key={aeronave.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Plane className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{aeronave.matricula}</h3>
                        <p className="text-sm text-gray-600">{aeronave.modelo}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(aeronave.estado)}
                      <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(aeronave.estado)}`}>
                        {aeronave.estado.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Capacidad Total:</span>
                      <span className="font-medium text-gray-900">{aeronave.capacidad} pasajeros</span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-900">Configuración de Cabina:</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Economía:</span>
                          <span className="font-medium">{aeronave.configuracion_cabina.economia}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Premium:</span>
                          <span className="font-medium">{aeronave.configuracion_cabina.premium}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Business:</span>
                          <span className="font-medium">{aeronave.configuracion_cabina.business}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Primera:</span>
                          <span className="font-medium">{aeronave.configuracion_cabina.primera}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>
                          Próxima inspección: {getDaysUntilInspection(aeronave.proxima_inspeccion)} días
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                      Ver Detalles
                    </button>
                    <button className="flex-1 px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                      <Settings className="h-3 w-3 inline mr-1" />
                      Configurar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'certificaciones' && (
            <div className="space-y-6">
              {filteredAeronaves.map((aeronave) => (
                <div key={aeronave.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{aeronave.matricula}</h3>
                        <p className="text-sm text-gray-600">Certificaciones y Cumplimiento</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(aeronave.estado)}`}>
                      {aeronave.estado.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Certificaciones Vigentes</h4>
                      <div className="space-y-2">
                        {aeronave.certificaciones.map((cert, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-gray-700">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Inspecciones</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Última A-Check:</span>
                          <span className="text-gray-900">
                            {new Date(aeronave.ultima_inspeccion).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Próxima C-Check:</span>
                          <span className="text-gray-900">
                            {new Date(aeronave.proxima_inspeccion).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Documentación</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-gray-700">Certificado Aeronavegabilidad</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-gray-700">Manual de Operación</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-gray-700">Manual de Mantenimiento</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'mantenimiento' && (
            <div className="space-y-6">
              {filteredAeronaves.map((aeronave) => {
                const diasProximaInspeccion = getDaysUntilInspection(aeronave.proxima_inspeccion);
                const urgente = diasProximaInspeccion <= 30;
                
                return (
                  <div key={aeronave.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${urgente ? 'bg-red-100' : 'bg-yellow-100'}`}>
                          <Wrench className={`h-5 w-5 ${urgente ? 'text-red-600' : 'text-yellow-600'}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{aeronave.matricula}</h3>
                          <p className="text-sm text-gray-600">Programa de Mantenimiento</p>
                        </div>
                      </div>
                      {urgente && (
                        <span className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full">
                          Inspección Urgente
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900">Chequeos de Sistemas</h4>
                        <div className="space-y-3">
                          {[
                            { sistema: 'Motores', estado: 'ok', ultimo: '2024-01-15' },
                            { sistema: 'Sistema de Combustible', estado: 'ok', ultimo: '2024-01-15' },
                            { sistema: 'Aviónica', estado: 'revision', ultimo: '2024-01-10' },
                            { sistema: 'Balance y Peso', estado: 'ok', ultimo: '2024-01-15' }
                          ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                              <div className="flex items-center space-x-2">
                                {item.estado === 'ok' ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                )}
                                <span className="text-sm font-medium text-gray-900">{item.sistema}</span>
                              </div>
                              <span className="text-xs text-gray-500">{item.ultimo}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900">Equipamiento de Emergencia</h4>
                        <div className="space-y-3">
                          {[
                            { equipo: 'Chalecos Salvavidas', cantidad: '195/195', estado: 'ok' },
                            { equipo: 'Máscaras de Oxígeno', cantidad: '210/210', estado: 'ok' },
                            { equipo: 'Bengalas de Emergencia', cantidad: '8/8', estado: 'ok' },
                            { equipo: 'Botiquines Médicos', cantidad: '3/3', estado: 'ok' },
                            { equipo: 'Desfibrilador', cantidad: '1/1', estado: 'revision' }
                          ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                              <div className="flex items-center space-x-2">
                                {item.estado === 'ok' ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                )}
                                <span className="text-sm font-medium text-gray-900">{item.equipo}</span>
                              </div>
                              <span className="text-xs text-gray-600">{item.cantidad}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          Próxima inspección en <strong>{diasProximaInspeccion} días</strong>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                            Programar Mantenimiento
                          </button>
                          <button className="px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                            Ver Historial
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {filteredAeronaves.length === 0 && (
        <div className="text-center py-12">
          <Plane className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron aeronaves</h3>
          <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  );
};