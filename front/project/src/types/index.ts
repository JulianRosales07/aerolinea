// Core Types for Airline Management System

export interface Cliente {
  id_cliente: string;
  nombre_cliente: string;
  cel_cliente: string;
  pais_cliente: string;
  tipo_identificacion: 'cedula' | 'pasaporte' | 'tarjeta_identidad';
  numero_identificacion: string;
  fecha_nacimiento: string;
  correo_cliente: string;
  contraseña_cliente: string;
  created_at: string;
}

export interface Aeropuerto {
  id: string;
  nombre: string;
  ciudad: string;
  departamento: string;
  codigo_iata: string;
  tipo: 'nacional' | 'internacional';
  latitud: number;
  longitud: number;
  created_at: string;
}

export interface Aeronave {
  id: string;
  matricula: string;
  modelo: string;
  capacidad: number;
  estado: 'operativa' | 'mantenimiento' | 'fuera_servicio';
  ultima_inspeccion: string;
  proxima_inspeccion: string;
  certificaciones: string[];
  configuracion_cabina: {
    economia: number;
    premium: number;
    business: number;
    primera: number;
  };
}

export interface Vuelo {
  id: string;
  numero_vuelo: string;
  aeronave_id: string;
  aeropuerto_origen: string;
  aeropuerto_destino: string;
  fecha_salida: string;
  fecha_llegada: string;
  estado: 'programado' | 'abordando' | 'en_vuelo' | 'completado' | 'cancelado';
  precio_base: number;
}

export interface Ticket {
  id: string;
  cliente_id: string;
  vuelo_id: string;
  clase: 'economia' | 'premium' | 'business' | 'primera';
  asiento: string;
  estado: 'reservado' | 'pagado' | 'check_in' | 'abordado' | 'cancelado';
  precio_total: number;
  equipaje: {
    bodega: number;
    mano: number;
    peso_total: number;
  };
  servicios_especiales: string[];
  created_at: string;
}

export interface CheckIn {
  id: string;
  ticket_id: string;
  cliente_id: string;
  vuelo_id: string;
  fecha_checkin: string;
  asiento_asignado: string;
  tarjeta_embarque: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'operador' | 'cliente';
  created_at: string;
}