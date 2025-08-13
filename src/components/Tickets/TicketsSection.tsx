import React, { useState } from 'react';
import { Search, Plus, Ticket, Calendar, MapPin, User, Edit3, Trash2, Filter, Plane, X, Check } from 'lucide-react';
import { Ticket as TicketType, Vuelo, Cliente } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

// Enhanced Modal component
const Modal: React.FC<{ 
  open: boolean, 
  onClose: () => void, 
  children: React.ReactNode,
  title: string,
  size?: 'sm' | 'md' | 'lg' | 'xl'
}> = ({ open, onClose, children, title, size = 'md' }) => {
  if (!open) return null;
  
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-2xl shadow-2xl ${sizeClasses[size]} w-full max-h-[90vh] overflow-hidden`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-avianca-light">
          <h2 className="text-xl font-bold text-avianca-text">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-avianca-text" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export const TicketsSection: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('todos');
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  const [tickets, setTickets] = useState<TicketType[]>([
    {
      id: '1',
      cliente_id: '1',
      vuelo_id: '1',
      clase: 'economia',
      asiento: '12A',
      estado: 'pagado',
      precio_total: 450000,
      equipaje: { bodega: 23, mano: 8, peso_total: 31 },
      servicios_especiales: ['comida_vegetariana'],
      tipo_tarifa: 'reembolsable',
      motivo_cambio: '',
      tipo_compensacion: '',
      reglamento: 'EU261/2004',
      documento_identidad: '12345678',
      datos_biometricos: '',
      asistencia_medica: '',
      documento_medico: '',
      terminos_condiciones: 'Acepto los términos y condiciones',
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      cliente_id: '2',
      vuelo_id: '2',
      clase: 'business',
      asiento: '3B',
      estado: 'check_in',
      precio_total: 1200000,
      equipaje: { bodega: 32, mano: 10, peso_total: 42 },
      servicios_especiales: ['asistencia_medica', 'silla_ruedas'],
      created_at: '2024-01-10T14:30:00Z'
    }
  ]);

  const vuelos: Vuelo[] = [
    {
      id: '1',
      numero_vuelo: 'AV-101',
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
      numero_vuelo: 'AV-205',
      aeronave_id: '2',
      aeropuerto_origen: 'CTG',
      aeropuerto_destino: 'BOG',
      fecha_salida: '2024-01-20T14:15:00Z',
      fecha_llegada: '2024-01-20T16:30:00Z',
      estado: 'programado',
      precio_base: 400000
    },
    {
      id: '3',
      numero_vuelo: 'AV-301',
      aeronave_id: '3',
      aeropuerto_origen: 'BOG',
      aeropuerto_destino: 'MAD',
      fecha_salida: '2024-01-21T22:00:00Z',
      fecha_llegada: '2024-01-22T14:30:00Z',
      estado: 'programado',
      precio_base: 1200000
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
      nombre_cliente: 'Juan Pérez',
      cel_cliente: '+57 301 987 6543',
      pais_cliente: 'Colombia',
      tipo_identificacion: 'cedula',
      numero_identificacion: '87654321',
      fecha_nacimiento: '1985-09-10',
      correo_cliente: 'juan@email.com',
      contraseña_cliente: '',
      created_at: '2024-01-10T14:30:00Z'
    }
  ];

  const filteredTickets = tickets.filter(ticket => {
    const vuelo = vuelos.find(v => v.id === ticket.vuelo_id);
    const cliente = clientes.find(c => c.id_cliente === ticket.cliente_id);

    const matchesSearch = vuelo?.numero_vuelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente?.nombre_cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.asiento.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = selectedFilter === 'todos' || ticket.estado === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'reservado': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pagado': return 'bg-green-100 text-green-800 border-green-200';
      case 'check_in': return 'bg-avianca-secondary/10 text-avianca-secondary border-avianca-secondary/20';
      case 'abordado': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'cancelado': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getClaseColor = (clase: string) => {
    switch (clase) {
      case 'primera': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'business': return 'bg-avianca-primary/10 text-avianca-primary border-avianca-primary/20';
      case 'premium': return 'bg-green-100 text-green-800 border-green-200';
      case 'economia': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Handlers
  const handleDelete = (ticketId: string) => {
    if (window.confirm('¿Seguro que deseas cancelar este ticket?')) {
      setTickets(tickets.map(t => 
        t.id === ticketId ? { ...t, estado: 'cancelado' } : t
      ));
    }
  };

  const handleEdit = (ticket: TicketType) => {
    setSelectedTicket(ticket);
    setShowEditModal(true);
  };

  const handleDetails = (ticket: TicketType) => {
    setSelectedTicket(ticket);
    setShowDetailsModal(true);
  };

  // Enhanced form for new ticket
  const handleNewTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newTicket: TicketType = {
      id: (tickets.length + 1).toString(),
      cliente_id: formData.get('cliente_id') as string,
      vuelo_id: formData.get('vuelo_id') as string,
      clase: formData.get('clase') as any,
      asiento: formData.get('asiento') as string,
      estado: 'reservado',
      precio_total: Number(formData.get('precio_total')),
      equipaje: { 
        bodega: Number(formData.get('equipaje_bodega')) || 20, 
        mano: Number(formData.get('equipaje_mano')) || 8, 
        peso_total: (Number(formData.get('equipaje_bodega')) || 20) + (Number(formData.get('equipaje_mano')) || 8)
      },
      servicios_especiales: Array.from(formData.getAll('servicios_especiales')) as string[],
      tipo_tarifa: formData.get('tipo_tarifa') as any,
      motivo_cambio: formData.get('motivo_cambio') as string,
      tipo_compensacion: formData.get('tipo_compensacion') as string,
      reglamento: formData.get('reglamento') as string,
      documento_identidad: formData.get('documento_identidad') as string,
      datos_biometricos: formData.get('datos_biometricos') as string,
      asistencia_medica: formData.get('asistencia_medica') as string,
      documento_medico: formData.get('documento_medico') as string,
      terminos_condiciones: formData.get('terminos_condiciones') as string,
      created_at: new Date().toISOString()
    };
    
    setTickets([...tickets, newTicket]);
    setShowNewTicketModal(false);
  };

  // Enhanced edit form
  const handleEditTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket) return;
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    setTickets(tickets.map(t =>
      t.id === selectedTicket.id
        ? { 
            ...t, 
            asiento: formData.get('asiento') as string,
            clase: formData.get('clase') as any,
            estado: formData.get('estado') as any,
            servicios_especiales: Array.from(formData.getAll('servicios_especiales')) as string[]
          }
        : t
    ));
    setShowEditModal(false);
    setSelectedTicket(null);
  };

  const isAdmin = user && (user.role === 'admin' || user.role === 'operador');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-avianca-text">
            {isAdmin ? 'Gestión de Tickets' : 'Comprar Vuelos'}
          </h1>
          <p className="text-avianca-gray mt-1">
            {isAdmin ? 'Administra reservas y emisión de boletos' : 'Encuentra y reserva tu próximo destino con Avianca'}
          </p>
        </div>
        <button
          onClick={() => setShowNewTicketModal(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-avianca-primary text-white rounded-xl hover:bg-opacity-90 transition-colors shadow-lg"
        >
          <Plus className="h-5 w-5" />
          <span>{isAdmin ? 'Nuevo Ticket' : 'Reservar Vuelo'}</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-avianca-gray" />
              <input
                type="text"
                placeholder="Buscar por vuelo, cliente o asiento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-avianca-primary focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Filter className="h-5 w-5 text-avianca-gray" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-avianca-primary focus:border-transparent"
            >
              <option value="todos">Todos los estados</option>
              <option value="reservado">Reservado</option>
              <option value="pagado">Pagado</option>
              <option value="check_in">Check-in</option>
              <option value="abordado">Abordado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTickets.map((ticket) => {
          const vuelo = vuelos.find(v => v.id === ticket.vuelo_id);
          const cliente = clientes.find(c => c.id_cliente === ticket.cliente_id);

          return (
            <div key={ticket.id} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-avianca-primary/10 rounded-xl">
                    <Ticket className="h-6 w-6 text-avianca-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-avianca-text text-lg">{vuelo?.numero_vuelo}</h3>
                    <p className="text-avianca-gray">{cliente?.nombre_cliente}</p>
                  </div>
                </div>
                {isAdmin && (
                  <div className="flex space-x-2">
                    <button
                      className="p-2 text-avianca-gray hover:text-avianca-secondary hover:bg-avianca-light rounded-lg transition-colors"
                      onClick={() => handleEdit(ticket)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      className="p-2 text-avianca-gray hover:text-avianca-primary hover:bg-red-50 rounded-lg transition-colors"
                      onClick={() => handleDelete(ticket.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-avianca-secondary" />
                    <span className="text-avianca-text font-medium">
                      {vuelo?.aeropuerto_origen} → {vuelo?.aeropuerto_destino}
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-avianca-primary">{ticket.asiento}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-avianca-secondary" />
                  <span className="text-avianca-text">
                    {vuelo && new Date(vuelo.fecha_salida).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <span className={`px-3 py-1 text-sm rounded-full border capitalize ${getStatusColor(ticket.estado)}`}>
                      {ticket.estado.replace('_', ' ')}
                    </span>
                    <span className={`px-3 py-1 text-sm rounded-full border capitalize ${getClaseColor(ticket.clase)}`}>
                      {ticket.clase}
                    </span>
                  </div>
                  <span className="text-xl font-bold text-avianca-text">
                    ${ticket.precio_total.toLocaleString()}
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <div className="flex justify-between text-sm text-avianca-gray">
                    <span>Equipaje: {ticket.equipaje.peso_total}kg</span>
                    <span>Servicios: {ticket.servicios_especiales.length}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  className="flex-1 px-4 py-2 text-sm bg-avianca-secondary/10 text-avianca-secondary rounded-xl hover:bg-avianca-secondary/20 transition-colors"
                  onClick={() => handleDetails(ticket)}
                >
                  Ver Detalles
                </button>
                <button
                  className="flex-1 px-4 py-2 text-sm bg-avianca-light text-avianca-text rounded-xl hover:bg-gray-200 transition-colors"
                  onClick={() => handleEdit(ticket)}
                >
                  {isAdmin ? 'Modificar' : 'Cambiar'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTickets.length === 0 && (
        <div className="text-center py-16">
          <div className="p-4 bg-avianca-light rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Ticket className="h-10 w-10 text-avianca-gray" />
          </div>
          <h3 className="text-xl font-semibold text-avianca-text mb-2">No se encontraron vuelos</h3>
          <p className="text-avianca-gray">Intenta ajustar los filtros de búsqueda o crear una nueva reserva</p>
        </div>
      )}

      {/* Enhanced New Ticket Modal */}
      <Modal 
        open={showNewTicketModal} 
        onClose={() => setShowNewTicketModal(false)}
        title={isAdmin ? "Crear Nuevo Ticket" : "Reservar Vuelo"}
        size="xl"
      >
        <form onSubmit={handleNewTicket} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cliente Selection */}
            <div>
              <label className="block text-sm font-semibold text-avianca-text mb-2">
                Pasajero *
              </label>
              <select 
                name="cliente_id" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-avianca-primary focus:border-transparent" 
                required
              >
                <option value="">Selecciona el pasajero</option>
                {clientes.map(c => (
                  <option key={c.id_cliente} value={c.id_cliente}>
                    {c.nombre_cliente} - {c.numero_identificacion}
                  </option>
                ))}
              </select>
            </div>

            {/* Vuelo Selection */}
            <div>
              <label className="block text-sm font-semibold text-avianca-text mb-2">
                Vuelo *
              </label>
              <select 
                name="vuelo_id" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-avianca-primary focus:border-transparent" 
                required
              >
                <option value="">Selecciona el vuelo</option>
                {vuelos.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.numero_vuelo} - {v.aeropuerto_origen} → {v.aeropuerto_destino} - ${v.precio_base.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {/* Asiento */}
            <div>
              <label className="block text-sm font-semibold text-avianca-text mb-2">
                Asiento *
              </label>
              <input 
                name="asiento" 
                type="text" 
                placeholder="Ej: 12A" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-avianca-primary focus:border-transparent" 
                required 
              />
            </div>

            {/* Clase */}
            <div>
              <label className="block text-sm font-semibold text-avianca-text mb-2">
                Clase de Servicio *
              </label>
              <select 
                name="clase" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-avianca-primary focus:border-transparent" 
                required
              >
                <option value="economia">Economía</option>
                <option value="premium">Premium Economy</option>
                <option value="business">Business</option>
                <option value="primera">Primera Clase</option>
              </select>
            </div>

            {/* Precio */}
            <div>
              <label className="block text-sm font-semibold text-avianca-text mb-2">
                Precio Total *
              </label>
              <input 
                name="precio_total" 
                type="number" 
                placeholder="450000" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-avianca-primary focus:border-transparent" 
                required 
              />
            </div>

            {/* Tipo de Tarifa */}
            <div>
              <label className="block text-sm font-semibold text-avianca-text mb-2">
                Tipo de Tarifa *
              </label>
              <select 
                name="tipo_tarifa" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-avianca-primary focus:border-transparent" 
                required
              >
                <option value="reembolsable">Reembolsable</option>
                <option value="no_reembolsable">No Reembolsable</option>
              </select>
            </div>
          </div>

          {/* Equipaje Section */}
          <div className="bg-avianca-light rounded-xl p-4">
            <h3 className="font-semibold text-avianca-text mb-4">Equipaje</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-avianca-text mb-2">
                  Equipaje de Mano (kg)
                </label>
                <input 
                  name="equipaje_mano" 
                  type="number" 
                  defaultValue="8"
                  min="0"
                  max="15"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-avianca-primary focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-avianca-text mb-2">
                  Equipaje de Bodega (kg)
                </label>
                <input 
                  name="equipaje_bodega" 
                  type="number" 
                  defaultValue="20"
                  min="0"
                  max="32"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-avianca-primary focus:border-transparent" 
                />
              </div>
            </div>
          </div>

          {/* Servicios Especiales */}
          <div>
            <label className="block text-sm font-semibold text-avianca-text mb-3">
              Servicios Especiales
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                'comida_vegetariana',
                'asistencia_medica',
                'silla_ruedas',
                'mascota_cabina',
                'menor_no_acompañado',
                'oxigeno_medico'
              ].map(servicio => (
                <label key={servicio} className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    name="servicios_especiales" 
                    value={servicio}
                    className="rounded border-gray-300 text-avianca-primary focus:ring-avianca-primary"
                  />
                  <span className="text-sm text-avianca-text capitalize">
                    {servicio.replace('_', ' ')}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Documento de Identidad */}
          <div>
            <label className="block text-sm font-semibold text-avianca-text mb-2">
              Documento de Identidad *
            </label>
            <input 
              name="documento_identidad" 
              type="text" 
              placeholder="Número de documento" 
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-avianca-primary focus:border-transparent" 
              required 
            />
          </div>

          {/* Términos y Condiciones */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <input 
                type="checkbox" 
                name="terminos_condiciones" 
                value="Acepto los términos y condiciones"
                className="mt-1 rounded border-gray-300 text-avianca-primary focus:ring-avianca-primary"
                required
              />
              <div className="text-sm text-avianca-text">
                <p className="font-medium mb-1">Acepto los términos y condiciones *</p>
                <p className="text-avianca-gray">
                  Al marcar esta casilla, acepto las condiciones de transporte de Avianca, 
                  las políticas de privacidad y las condiciones generales de venta.
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button 
              type="button"
              onClick={() => setShowNewTicketModal(false)}
              className="flex-1 px-6 py-3 border border-gray-300 text-avianca-text rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="flex-1 px-6 py-3 bg-avianca-primary text-white rounded-xl hover:bg-opacity-90 transition-colors"
            >
              {isAdmin ? 'Crear Ticket' : 'Reservar Vuelo'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Enhanced Edit Modal */}
      <Modal 
        open={showEditModal} 
        onClose={() => setShowEditModal(false)}
        title="Modificar Ticket"
        size="lg"
      >
        {selectedTicket && (
          <form onSubmit={handleEditTicket} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-avianca-text mb-2">
                  Asiento
                </label>
                <input 
                  name="asiento" 
                  type="text" 
                  defaultValue={selectedTicket.asiento} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-avianca-primary focus:border-transparent" 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-avianca-text mb-2">
                  Clase de Servicio
                </label>
                <select 
                  name="clase" 
                  defaultValue={selectedTicket.clase} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-avianca-primary focus:border-transparent" 
                  required
                >
                  <option value="economia">Economía</option>
                  <option value="premium">Premium Economy</option>
                  <option value="business">Business</option>
                  <option value="primera">Primera Clase</option>
                </select>
              </div>
              
              {isAdmin && (
                <div>
                  <label className="block text-sm font-semibold text-avianca-text mb-2">
                    Estado
                  </label>
                  <select 
                    name="estado" 
                    defaultValue={selectedTicket.estado} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-avianca-primary focus:border-transparent" 
                    required
                  >
                    <option value="reservado">Reservado</option>
                    <option value="pagado">Pagado</option>
                    <option value="check_in">Check-in</option>
                    <option value="abordado">Abordado</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </div>
              )}
            </div>

            {/* Servicios Especiales */}
            <div>
              <label className="block text-sm font-semibold text-avianca-text mb-3">
                Servicios Especiales
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  'comida_vegetariana',
                  'asistencia_medica',
                  'silla_ruedas',
                  'mascota_cabina',
                  'menor_no_acompañado',
                  'oxigeno_medico'
                ].map(servicio => (
                  <label key={servicio} className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      name="servicios_especiales" 
                      value={servicio}
                      defaultChecked={selectedTicket.servicios_especiales.includes(servicio)}
                      className="rounded border-gray-300 text-avianca-primary focus:ring-avianca-primary"
                    />
                    <span className="text-sm text-avianca-text capitalize">
                      {servicio.replace('_', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button 
                type="button"
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-avianca-text rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="flex-1 px-6 py-3 bg-avianca-primary text-white rounded-xl hover:bg-opacity-90 transition-colors"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Enhanced Details Modal */}
      <Modal 
        open={showDetailsModal} 
        onClose={() => setShowDetailsModal(false)}
        title="Detalles del Ticket"
        size="lg"
      >
        {selectedTicket && (
          <div className="space-y-6">
            {/* Flight Info */}
            <div className="bg-avianca-light rounded-xl p-4">
              <h3 className="font-semibold text-avianca-text mb-3">Información del Vuelo</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-avianca-gray">Vuelo:</span>
                  <span className="ml-2 font-medium text-avianca-text">
                    {vuelos.find(v => v.id === selectedTicket.vuelo_id)?.numero_vuelo || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-avianca-gray">Ruta:</span>
                  <span className="ml-2 font-medium text-avianca-text">
                    {(() => {
                      const vuelo = vuelos.find(v => v.id === selectedTicket.vuelo_id);
                      return vuelo ? `${vuelo.aeropuerto_origen} → ${vuelo.aeropuerto_destino}` : 'N/A';
                    })()}
                  </span>
                </div>
                <div>
                  <span className="text-avianca-gray">Fecha y Hora:</span>
                  <span className="ml-2 font-medium text-avianca-text">
                    {(() => {
                      const vuelo = vuelos.find(v => v.id === selectedTicket.vuelo_id);
                      return vuelo && vuelo.fecha_salida
                        ? new Date(vuelo.fecha_salida).toLocaleString('es-ES')
                        : 'N/A';
                    })()}
                  </span>
                </div>
                <div>
                  <span className="text-avianca-gray">Asiento:</span>
                  <span className="ml-2 font-medium text-avianca-primary text-lg">
                    {selectedTicket.asiento}
                  </span>
                </div>
              </div>
            </div>

            {/* Passenger Info */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-avianca-text mb-3">Información del Pasajero</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-avianca-gray">Nombre:</span>
                  <span className="ml-2 font-medium text-avianca-text">
                    {clientes.find(c => c.id_cliente === selectedTicket.cliente_id)?.nombre_cliente || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-avianca-gray">Documento:</span>
                  <span className="ml-2 font-medium text-avianca-text">
                    {selectedTicket.documento_identidad ?? 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-avianca-gray">Clase:</span>
                  <span className="ml-2 font-medium text-avianca-text capitalize">
                    {selectedTicket.clase}
                  </span>
                </div>
                <div>
                  <span className="text-avianca-gray">Estado:</span>
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(selectedTicket.estado)}`}>
                    {selectedTicket.estado.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Services and Baggage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="font-semibold text-avianca-text mb-3">Equipaje</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-avianca-gray">Equipaje de mano:</span>
                    <span className="font-medium text-avianca-text">
                      {selectedTicket.equipaje?.mano || 0} kg
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-avianca-gray">Equipaje de bodega:</span>
                    <span className="font-medium text-avianca-text">
                      {selectedTicket.equipaje?.bodega || 0} kg
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-avianca-gray font-medium">Total:</span>
                    <span className="font-bold text-avianca-text">
                      {selectedTicket.equipaje?.peso_total || 0} kg
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="font-semibold text-avianca-text mb-3">Servicios Especiales</h3>
                {selectedTicket.servicios_especiales?.length ? (
                  <div className="space-y-2">
                    {selectedTicket.servicios_especiales.map((servicio, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-avianca-text capitalize">
                          {servicio.replace('_', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-avianca-gray">No hay servicios especiales</p>
                )}
              </div>
            </div>

            {/* Price and Terms */}
            <div className="bg-avianca-primary/5 rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-avianca-text">Información de Pago</h3>
                <span className="text-2xl font-bold text-avianca-primary">
                  ${selectedTicket.precio_total.toLocaleString()}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-avianca-gray">Tipo de Tarifa:</span>
                  <span className="ml-2 font-medium text-avianca-text capitalize">
                    {selectedTicket.tipo_tarifa?.replace('_', ' ') || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-avianca-gray">Fecha de Reserva:</span>
                  <span className="ml-2 font-medium text-avianca-text">
                    {selectedTicket.created_at ? new Date(selectedTicket.created_at).toLocaleDateString('es-ES') : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};