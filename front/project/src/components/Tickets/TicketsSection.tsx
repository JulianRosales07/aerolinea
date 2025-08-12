import React, { useState } from 'react';
import { Search, Plus, Ticket, Calendar, MapPin, User, Edit3, Trash2, Filter, Plane } from 'lucide-react';
import { Ticket as TicketType, Vuelo, Cliente } from '../../types';

// Simple modal component
const Modal: React.FC<{ open: boolean, onClose: () => void, children: React.ReactNode }> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 min-w-[300px] shadow-lg relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export const TicketsSection: React.FC = () => {
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
      tipo_tarifa: 'reembolsable', // RF2
      motivo_cambio: '',           // RF2
      tipo_compensacion: '',       // RF2
      reglamento: 'EU261/2004',    // RF2
      documento_identidad: '12345678', // RF3
      datos_biometricos: '',           // RF3
      asistencia_medica: '',           // RF8
      documento_medico: '',            // RF8
      terminos_condiciones: 'Acepto los términos y condiciones', // RF1
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
      case 'reservado': return 'bg-yellow-100 text-yellow-800';
      case 'pagado': return 'bg-green-100 text-green-800';
      case 'check_in': return 'bg-blue-100 text-blue-800';
      case 'abordado': return 'bg-purple-100 text-purple-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getClaseColor = (clase: string) => {
    switch (clase) {
      case 'primera': return 'bg-purple-100 text-purple-800';
      case 'business': return 'bg-blue-100 text-blue-800';
      case 'premium': return 'bg-green-100 text-green-800';
      case 'economia': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Handlers
  const handleDelete = (ticketId: string) => {
    if (window.confirm('¿Seguro que deseas eliminar este ticket?')) {
      setTickets(tickets.filter(t => t.id !== ticketId));
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

  const handleModify = (ticket: TicketType) => {
    handleEdit(ticket);
  };

  // Simple form for new ticket (mock)
  const handleNewTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const cliente_id = form.cliente_id.value;
    const vuelo_id = form.vuelo_id.value;
    const asiento = form.asiento.value;
    const clase = form.clase.value;
    const precio_total = Number(form.precio_total.value);
    const tipo_tarifa = form.tipo_tarifa.value;
    const motivo_cambio = form.motivo_cambio.value;
    const tipo_compensacion = form.tipo_compensacion.value;
    const reglamento = form.reglamento.value;
    const documento_identidad = form.documento_identidad.value;
    const asistencia_medica = form.asistencia_medica.value;
    const documento_medico = form.documento_medico.value;
    const terminos_condiciones = form.terminos_condiciones.value;

    const newTicket: TicketType = {
      id: (tickets.length + 1).toString(),
      cliente_id,
      vuelo_id,
      clase,
      asiento,
      estado: 'reservado',
      precio_total,
      equipaje: { bodega: 20, mano: 8, peso_total: 28 },
      servicios_especiales: [],
      tipo_tarifa,
      motivo_cambio,
      tipo_compensacion,
      reglamento,
      documento_identidad,
      datos_biometricos: '',
      asistencia_medica,
      documento_medico,
      terminos_condiciones,
      created_at: new Date().toISOString()
    };
    setTickets([...tickets, newTicket]);
    setShowNewTicketModal(false);
  };

  // Simple edit form (mock)
  const handleEditTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket) return;
    const form = e.target as HTMLFormElement;
    const asiento = form.asiento.value;
    const clase = form.clase.value;
    const estado = form.estado.value;
    setTickets(tickets.map(t =>
      t.id === selectedTicket.id
        ? { ...t, asiento, clase, estado }
        : t
    ));
    setShowEditModal(false);
    setSelectedTicket(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Tickets</h1>
          <p className="text-gray-600 mt-1">Administra reservas, emisión y modificación de boletos</p>
        </div>
        <button
          onClick={() => setShowNewTicketModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Nuevo Ticket</span>
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
                placeholder="Buscar por vuelo, cliente o asiento..."
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
            <div key={ticket.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Ticket className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{vuelo?.numero_vuelo}</h3>
                    <p className="text-sm text-gray-600">{cliente?.nombre_cliente}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    onClick={() => handleEdit(ticket)}
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    onClick={() => handleDelete(ticket.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {vuelo?.aeropuerto_origen} → {vuelo?.aeropuerto_destino}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{ticket.asiento}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
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
                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(ticket.estado)}`}>
                      {ticket.estado.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${getClaseColor(ticket.clase)}`}>
                      {ticket.clase}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">
                    ${ticket.precio_total.toLocaleString()}
                  </span>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Equipaje: {ticket.equipaje.peso_total}kg</span>
                    <span>Servicios: {ticket.servicios_especiales.length}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <button
                  className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  onClick={() => handleDetails(ticket)}
                >
                  Ver Detalles
                </button>
                <button
                  className="flex-1 px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => handleModify(ticket)}
                >
                  Modificar
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTickets.length === 0 && (
        <div className="text-center py-12">
          <Ticket className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron tickets</h3>
          <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}

      {/* Nuevo Ticket Modal */}
      <Modal open={showNewTicketModal} onClose={() => setShowNewTicketModal(false)}>
        <h2 className="text-lg font-bold mb-4">Nuevo Ticket</h2>
        <form onSubmit={handleNewTicket} className="space-y-3">
          <select name="cliente_id" className="w-full border rounded p-2" required>
            <option value="">Selecciona Cliente</option>
            {clientes.map(c => (
              <option key={c.id_cliente} value={c.id_cliente}>{c.nombre_cliente}</option>
            ))}
          </select>
          <select name="vuelo_id" className="w-full border rounded p-2" required>
            <option value="">Selecciona Vuelo</option>
            {vuelos.map(v => (
              <option key={v.id} value={v.id}>{v.numero_vuelo}</option>
            ))}
          </select>
          <input name="asiento" type="text" placeholder="Asiento" className="w-full border rounded p-2" required />
          <select name="clase" className="w-full border rounded p-2" required>
            <option value="economia">Economía</option>
            <option value="business">Business</option>
            <option value="primera">Primera</option>
            <option value="premium">Premium</option>
          </select>
          <input name="precio_total" type="number" placeholder="Precio Total" className="w-full border rounded p-2" required />
          <select name="tipo_tarifa" className="w-full border rounded p-2" required>
            <option value="reembolsable">Reembolsable</option>
            <option value="no_reembolsable">No Reembolsable</option>
          </select>
          <input name="motivo_cambio" type="text" placeholder="Motivo de cambio/cancelación" className="w-full border rounded p-2" />
          <input name="tipo_compensacion" type="text" placeholder="Tipo de compensación" className="w-full border rounded p-2" />
          <input name="reglamento" type="text" placeholder="Reglamento legal" className="w-full border rounded p-2" defaultValue="EU261/2004" />
          <input name="documento_identidad" type="text" placeholder="Documento de identidad" className="w-full border rounded p-2" required />
          <input name="asistencia_medica" type="text" placeholder="Asistencia médica" className="w-full border rounded p-2" />
          <input name="documento_medico" type="text" placeholder="Documento médico" className="w-full border rounded p-2" />
          <textarea name="terminos_condiciones" className="w-full border rounded p-2" required defaultValue="Acepto los términos y condiciones" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Crear Ticket</button>
        </form>
      </Modal>

      {/* Editar Ticket Modal */}
      <Modal open={showEditModal} onClose={() => setShowEditModal(false)}>
        <h2 className="text-lg font-bold mb-4">Editar Ticket</h2>
        {selectedTicket && (
          <form onSubmit={handleEditTicket} className="space-y-3">
            <input name="asiento" type="text" defaultValue={selectedTicket.asiento} className="w-full border rounded p-2" required />
            <select name="clase" defaultValue={selectedTicket.clase} className="w-full border rounded p-2" required>
              <option value="economia">Economía</option>
              <option value="business">Business</option>
              <option value="primera">Primera</option>
              <option value="premium">Premium</option>
            </select>
            <select name="estado" defaultValue={selectedTicket.estado} className="w-full border rounded p-2" required>
              <option value="reservado">Reservado</option>
              <option value="pagado">Pagado</option>
              <option value="check_in">Check-in</option>
              <option value="abordado">Abordado</option>
              <option value="cancelado">Cancelado</option>
            </select>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Guardar Cambios</button>
          </form>
        )}
      </Modal>

{/* Detalles Modal */}
<Modal open={showDetailsModal} onClose={() => setShowDetailsModal(false)}>
  <h2 className="text-lg font-bold mb-4">Detalles del Ticket</h2>
  {selectedTicket ? (
    <div className="space-y-2">
      <div><strong>Nombre:</strong> {clientes.find(c => c.id_cliente === selectedTicket.cliente_id)?.nombre_cliente || 'N/A'}</div>
      <div><strong>Documento Identidad:</strong> {selectedTicket.documento_identidad ?? 'N/A'}</div>
      <div><strong>Número de Vuelo:</strong> {vuelos.find(v => v.id === selectedTicket.vuelo_id)?.numero_vuelo || 'N/A'}</div>
      <div>
        <strong>Fecha y Hora:</strong> {
          (() => {
            const vuelo = vuelos.find(v => v.id === selectedTicket.vuelo_id);
            return vuelo && vuelo.fecha_salida
              ? new Date(vuelo.fecha_salida).toLocaleString('es-ES')
              : 'N/A';
          })()
        }
      </div>
      <div><strong>Clase:</strong> {selectedTicket.clase ?? 'N/A'}</div>
      <div><strong>Tipo de Tarifa:</strong> {selectedTicket.tipo_tarifa ?? 'N/A'}</div>
      <div><strong>Motivo de Cambio/Cancelación:</strong> {selectedTicket.motivo_cambio?.trim() ? selectedTicket.motivo_cambio : 'N/A'}</div>
      <div><strong>Tipo de Compensación:</strong> {selectedTicket.tipo_compensacion?.trim() ? selectedTicket.tipo_compensacion : 'N/A'}</div>
      <div><strong>Reglamento:</strong> {selectedTicket.reglamento ?? 'N/A'}</div>
      <div><strong>Equipaje:</strong> {selectedTicket.equipaje?.peso_total ? `${selectedTicket.equipaje.peso_total}kg` : 'N/A'}</div>
      <div><strong>Servicios Especiales:</strong> {selectedTicket.servicios_especiales?.length ? selectedTicket.servicios_especiales.join(', ') : 'Ninguno'}</div>
      <div><strong>Asistencia Médica:</strong> {selectedTicket.asistencia_medica?.trim() ? selectedTicket.asistencia_medica : 'Ninguna'}</div>
      <div><strong>Documento Médico:</strong> {selectedTicket.documento_medico?.trim() ? selectedTicket.documento_medico : 'N/A'}</div>
      <div><strong>Términos y Condiciones:</strong> {selectedTicket.terminos_condiciones?.trim() ? selectedTicket.terminos_condiciones : 'N/A'}</div>
      <div><strong>Fecha de creación:</strong> {selectedTicket.created_at ? new Date(selectedTicket.created_at).toLocaleString('es-ES') : 'N/A'}</div>
    </div>
  ) : (
    <div>No hay ticket seleccionado.</div>
  )}
</Modal>
    </div>
  );
};