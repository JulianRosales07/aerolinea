@@ .. @@
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
+  tipo_tarifa?: 'reembolsable' | 'no_reembolsable';
+  motivo_cambio?: string;
+  tipo_compensacion?: string;
+  reglamento?: string;
+  documento_identidad?: string;
+  datos_biometricos?: string;
+  asistencia_medica?: string;
+  documento_medico?: string;
+  terminos_condiciones?: string;
   created_at: string;
 }