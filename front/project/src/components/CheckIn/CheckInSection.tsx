import React, { useState } from 'react';
import { Search, CheckSquare, User, Plane, Clock, Camera, Smartphone, QrCode, MapPin } from 'lucide-react';
import { CheckIn, Ticket, Vuelo, Cliente } from '../../types';

export const CheckInSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<'tradicional' | 'biometrico'>('tradicional');
  const [showCheckInModal, setShowCheckInModal] = useState(false);

  // Mock data
  const checkIns: CheckIn[] = [
    {
      id: '1',
      ticket_id: '1',
      cliente_id: '1',
      vuelo_id: '1',
      fecha_checkin: '2024-01-19T10:30:00Z',
      asiento_asignado: '12A',
      tarjeta_embarque: 'AE101-12A-20240120'
    }
  ];

  const tickets: Ticket[] = [
    {
      id: '1',
      cliente_id: '1',
      vuelo_id: '1',
      clase: 'economia',
      asiento: '12A',
      estado: 'check_in',
      precio_total: 450000,
      equipaje: { bodega: 23, mano: 8, peso_total: 31 },
      servicios_especiales: ['comida_vegetariana'],
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      cliente_id: '2',
      vuelo_id: '2',
      clase: 'business',
      asiento: '3B',
      estado: 'pagado',
      precio_total: 1200000,
      equipaje: { bodega: 32, mano: 10, peso_total: 42 },
      servicios_especiales: ['asistencia_medica'],
      created_at: '2024-01-10T14:30:00Z'
    }
  ];

  const vuelos: Vuelo[] = [
    {
      id: '1',
      numero_vuelo: 'AE-101',
      aeronave_id: '1',
      aeropuerto_origen: 'BOG',
      aeropuerto_destino: 'MDE',
      fecha_salida: '2024-01-20T08:30:00Z',
      fecha_llegada: '2024-01-20T09:45:00Z',
      estado: 'programado',
      precio_base: 350000
    },
    {
      id: '2',
      numero_vuelo: 'AE-205',
      aeronave_id: '2',
      aeropuerto_origen: 'CTG',
      aeropuerto_destino: 'BOG',
      fecha_salida: '2024-01-20T14:15:00Z',
      fecha_llegada: '2024-01-20T16:30:00Z',
      estado: 'programado',
      precio_base: 400000
    }
  ];

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

  // Tickets elegibles para check-in (24 horas antes)
  const ticketsElegibles = tickets.filter(ticket => {
    const vuelo = vuelos.find(v => v.id === ticket.vuelo_id);
    if (!vuelo) return false;
    
    const fechaVuelo = new Date(vuelo.fecha_salida);
    const ahora = new Date();
    const horasHastaVuelo = (fechaVuelo.getTime() - ahora.getTime()) / (1000 * 60 * 60);
    
    return horasHastaVuelo <= 24 && horasHastaVuelo > 0 && ticket.estado === 'pagado';
  });

  const filteredTickets = ticketsElegibles.filter(ticket => {
    const vuelo = vuelos.find(v => v.id === ticket.vuelo_id);
    const cliente = clientes.find(c => c.id_cliente === ticket.cliente_id);
    
    return vuelo?.numero_vuelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
           cliente?.nombre_cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
           ticket.asiento.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getTimeUntilFlight = (fechaSalida: string) => {
    const ahora = new Date();
    const vuelo = new Date(fechaSalida);
    const diff = vuelo.getTime() - ahora.getTime();
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${horas}h ${minutos}m`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Check-in</h1>
          <p className="text-gray-600 mt-1">Gestión de check-in tradicional y biométrico</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setSelectedMethod('tradicional')}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                selectedMethod === 'tradicional'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Smartphone className="h-4 w-4 inline mr-1" />
              Tradicional
            </button>
            <button
              onClick={() => setSelectedMethod('biometrico')}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                selectedMethod === 'biometrico'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Camera className="h-4 w-4 inline mr-1" />
              Biométrico
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por vuelo, pasajero o asiento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Check-in Method Info */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        {selectedMethod === 'tradicional' ? (
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Smartphone className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Check-in Tradicional</h3>
              <p className="text-gray-600 mb-4">
                Proceso estándar de check-in utilizando documento de identidad y número de reserva.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xs">1</span>
                  </div>
                  <span className="text-gray-700">Verificar documento de identidad</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xs">2</span>
                  </div>
                  <span className="text-gray-700">Confirmar datos del vuelo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xs">3</span>
                  </div>
                  <span className="text-gray-700">Generar tarjeta de embarque</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Camera className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Check-in Biométrico</h3>
              <p className="text-gray-600 mb-4">
                Proceso avanzado utilizando reconocimiento facial integrado con sistemas migratorios.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-xs">1</span>
                  </div>
                  <span className="text-gray-700">Captura facial en tiempo real</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-xs">2</span>
                  </div>
                  <span className="text-gray-700">Validación con base biométrica</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-xs">3</span>
                  </div>
                  <span className="text-gray-700">Verificación migratoria automática</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-xs">4</span>
                  </div>
                  <span className="text-gray-700">Check-in automático</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Eligible Tickets */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Vuelos Elegibles para Check-in ({filteredTickets.length})
        </h3>
        
        {filteredTickets.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredTickets.map((ticket) => {
              const vuelo = vuelos.find(v => v.id === ticket.vuelo_id);
              const cliente = clientes.find(c => c.id_cliente === ticket.cliente_id);
              
              return (
                <div key={ticket.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <CheckSquare className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{vuelo?.numero_vuelo}</h4>
                        <p className="text-sm text-gray-600">{cliente?.nombre_cliente}</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-blue-600">{ticket.asiento}</span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">
                        {vuelo?.aeropuerto_origen} → {vuelo?.aeropuerto_destino}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">
                        Salida: {vuelo && new Date(vuelo.fecha_salida).toLocaleString('es-ES')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Plane className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">
                        Tiempo restante: {vuelo && getTimeUntilFlight(vuelo.fecha_salida)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full capitalize">
                          {ticket.clase}
                        </span>
                        {ticket.servicios_especiales.length > 0 && (
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            {ticket.servicios_especiales.length} servicios
                          </span>
                        )}
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                        {selectedMethod === 'biometrico' ? (
                          <>
                            <Camera className="h-3 w-3 inline mr-1" />
                            Check-in Facial
                          </>
                        ) : (
                          <>
                            <QrCode className="h-3 w-3 inline mr-1" />
                            Check-in
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No hay vuelos elegibles</h4>
            <p className="text-gray-600">
              El check-in está disponible 24 horas antes del vuelo
            </p>
          </div>
        )}
      </div>

      {/* Recent Check-ins */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Check-ins Recientes</h3>
        
        <div className="space-y-3">
          {checkIns.map((checkin) => {
            const ticket = tickets.find(t => t.id === checkin.ticket_id);
            const vuelo = vuelos.find(v => v.id === checkin.vuelo_id);
            const cliente = clientes.find(c => c.id_cliente === checkin.cliente_id);
            
            return (
              <div key={checkin.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <User className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{cliente?.nombre_cliente}</p>
                    <p className="text-sm text-gray-600">
                      {vuelo?.numero_vuelo} - Asiento {checkin.asiento_asignado}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(checkin.fecha_checkin).toLocaleString('es-ES')}
                  </p>
                  <p className="text-xs text-gray-500">Tarjeta: {checkin.tarjeta_embarque}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};