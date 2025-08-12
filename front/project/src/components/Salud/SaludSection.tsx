import React, { useState } from 'react';
import { Heart, AlertTriangle, Shield, Stethoscope, Pill, Accessibility, Phone, FileText } from 'lucide-react';

export const SaludSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'requisitos' | 'asistencia' | 'emergencia'>('requisitos');

  const requisitosSalud = [
    {
      destino: 'Destinos Nacionales',
      requisitos: [
        'Certificado de vacunación COVID-19 (recomendado)',
        'Documento de identidad vigente',
        'Seguro médico de viaje (opcional)'
      ],
      color: 'green'
    },
    {
      destino: 'Destinos Internacionales',
      requisitos: [
        'Pasaporte vigente con mínimo 6 meses',
        'Certificado de vacunación según destino',
        'Prueba PCR negativa (según regulaciones)',
        'Seguro médico internacional obligatorio',
        'Formulario de declaración de salud'
      ],
      color: 'blue'
    },
    {
      destino: 'Zonas de Riesgo Sanitario',
      requisitos: [
        'Vacuna contra fiebre amarilla',
        'Profilaxis contra malaria',
        'Certificado médico de aptitud',
        'Kit de primeros auxilios personal',
        'Seguro médico con cobertura de evacuación'
      ],
      color: 'red'
    }
  ];

  const serviciosAsistencia = [
    {
      servicio: 'Silla de Ruedas',
      descripcion: 'Asistencia para movilidad en aeropuerto y abordaje',
      codigo: 'WCHR',
      requisitos: 'Solicitar con 48h de anticipación',
      costo: 'Gratuito'
    },
    {
      servicio: 'Oxígeno Médico',
      descripcion: 'Suministro de oxígeno durante el vuelo',
      codigo: 'OXYG',
      requisitos: 'Certificado médico obligatorio',
      costo: '$150.000 por vuelo'
    },
    {
      servicio: 'Acompañante Médico',
      descripcion: 'Personal médico especializado durante el vuelo',
      codigo: 'MEDA',
      requisitos: 'Evaluación médica previa',
      costo: '$800.000 por vuelo'
    },
    {
      servicio: 'Medicamentos Refrigerados',
      descripcion: 'Transporte de medicamentos que requieren refrigeración',
      codigo: 'MEDS',
      requisitos: 'Prescripción médica y embalaje especial',
      costo: '$75.000 por vuelo'
    },
    {
      servicio: 'Dieta Especial',
      descripcion: 'Comidas adaptadas a condiciones médicas específicas',
      codigo: 'SPML',
      requisitos: 'Solicitar con 24h de anticipación',
      costo: 'Gratuito'
    },
    {
      servicio: 'Asistencia Visual/Auditiva',
      descripcion: 'Apoyo para pasajeros con discapacidad visual o auditiva',
      codigo: 'DEAF/BLND',
      requisitos: 'Notificación al momento de la reserva',
      costo: 'Gratuito'
    }
  ];

  const protocolosEmergencia = [
    {
      situacion: 'Emergencia Médica en Vuelo',
      procedimiento: [
        'Activación inmediata del protocolo médico',
        'Evaluación por tripulación entrenada',
        'Contacto con centro médico terrestre',
        'Administración de primeros auxilios',
        'Desvío a aeropuerto más cercano si es necesario'
      ],
      equipamiento: ['Desfibrilador automático', 'Kit médico avanzado', 'Oxígeno de emergencia']
    },
    {
      situacion: 'Pasajero con Condición Médica Preexistente',
      procedimiento: [
        'Verificación de documentación médica',
        'Asignación de asiento apropiado',
        'Briefing especial a la tripulación',
        'Coordinación con servicios médicos del destino'
      ],
      equipamiento: ['Medicamentos de emergencia', 'Equipo de monitoreo', 'Comunicación médica']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Requisitos de Salud</h1>
          <p className="text-gray-600 mt-1">Información médica, asistencia especial y protocolos de emergencia</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'requisitos', label: 'Requisitos Sanitarios', icon: Shield },
            { id: 'asistencia', label: 'Asistencia Médica', icon: Stethoscope },
            { id: 'emergencia', label: 'Protocolos de Emergencia', icon: Heart }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'requisitos' | 'asistencia' | 'emergencia')}
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
          {activeTab === 'requisitos' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {requisitosSalud.map((categoria, index) => (
                  <div key={index} className={`rounded-xl p-6 border-2 ${
                    categoria.color === 'green' ? 'bg-green-50 border-green-200' :
                    categoria.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                    'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className={`p-2 rounded-full ${
                        categoria.color === 'green' ? 'bg-green-100' :
                        categoria.color === 'blue' ? 'bg-blue-100' :
                        'bg-red-100'
                      }`}>
                        <Shield className={`h-5 w-5 ${
                          categoria.color === 'green' ? 'text-green-600' :
                          categoria.color === 'blue' ? 'text-blue-600' :
                          'text-red-600'
                        }`} />
                      </div>
                      <h3 className={`font-semibold ${
                        categoria.color === 'green' ? 'text-green-900' :
                        categoria.color === 'blue' ? 'text-blue-900' :
                        'text-red-900'
                      }`}>
                        {categoria.destino}
                      </h3>
                    </div>

                    <ul className="space-y-2">
                      {categoria.requisitos.map((requisito, reqIndex) => (
                        <li key={reqIndex} className={`text-sm flex items-start space-x-2 ${
                          categoria.color === 'green' ? 'text-green-800' :
                          categoria.color === 'blue' ? 'text-blue-800' :
                          'text-red-800'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full mt-2 ${
                            categoria.color === 'green' ? 'bg-green-600' :
                            categoria.color === 'blue' ? 'bg-blue-600' :
                            'bg-red-600'
                          }`}></div>
                          <span>{requisito}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-yellow-900 mb-2">Importante</h3>
                    <div className="text-sm text-yellow-800 space-y-1">
                      <p>• Los requisitos sanitarios pueden cambiar según las regulaciones gubernamentales</p>
                      <p>• Consulta siempre las regulaciones más actualizadas antes de viajar</p>
                      <p>• Algunos destinos pueden requerir cuarentena o pruebas adicionales</p>
                      <p>• Mantén tus certificados de vacunación actualizados y en formato digital</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'asistencia' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {serviciosAsistencia.map((servicio, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          {servicio.codigo === 'WCHR' && <Accessibility className="h-5 w-5 text-blue-600" />}
                          {servicio.codigo === 'OXYG' && <Heart className="h-5 w-5 text-blue-600" />}
                          {servicio.codigo === 'MEDA' && <Stethoscope className="h-5 w-5 text-blue-600" />}
                          {servicio.codigo === 'MEDS' && <Pill className="h-5 w-5 text-blue-600" />}
                          {(servicio.codigo === 'SPML' || servicio.codigo === 'DEAF/BLND') && <Heart className="h-5 w-5 text-blue-600" />}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{servicio.servicio}</h3>
                          <p className="text-xs text-gray-500 font-mono">{servicio.codigo}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        servicio.costo === 'Gratuito' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {servicio.costo}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">{servicio.descripcion}</p>
                      
                      <div className="pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          <strong>Requisitos:</strong> {servicio.requisitos}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                        Solicitar Servicio
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Contacto para Asistencia Médica</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                      <div>
                        <p><strong>Línea de Asistencia:</strong></p>
                        <p>+57 1 800-SALUD (72583)</p>
                        <p>Disponible 24/7</p>
                      </div>
                      <div>
                        <p><strong>Email Especializado:</strong></p>
                        <p>asistencia.medica@aeromanage.com</p>
                        <p>Respuesta en 2 horas</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'emergencia' && (
            <div className="space-y-6">
              {protocolosEmergencia.map((protocolo, index) => (
                <div key={index} className="bg-red-50 rounded-xl p-6 border border-red-200">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="p-2 bg-red-100 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-900 text-lg">{protocolo.situacion}</h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-red-900 mb-3">Procedimiento de Respuesta</h4>
                      <ol className="space-y-2">
                        {protocolo.procedimiento.map((paso, pasoIndex) => (
                          <li key={pasoIndex} className="text-sm text-red-800 flex items-start space-x-2">
                            <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                              <span className="text-red-600 font-bold text-xs">{pasoIndex + 1}</span>
                            </div>
                            <span>{paso}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-medium text-red-900 mb-3">Equipamiento Disponible</h4>
                      <ul className="space-y-2">
                        {protocolo.equipamiento.map((equipo, equipoIndex) => (
                          <li key={equipoIndex} className="text-sm text-red-800 flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                            <span>{equipo}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center space-x-2 mb-4">
                    <FileText className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-green-900">Certificaciones Médicas</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>• Tripulación certificada en primeros auxilios</li>
                    <li>• Equipos médicos certificados por autoridades sanitarias</li>
                    <li>• Protocolos aprobados por medicina aeronáutica</li>
                    <li>• Convenios con centros médicos especializados</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center space-x-2 mb-4">
                    <Phone className="h-5 w-5 text-purple-600" />
                    <h3 className="font-semibold text-purple-900">Contactos de Emergencia</h3>
                  </div>
                  <div className="space-y-2 text-sm text-purple-800">
                    <p><strong>Centro de Control Médico:</strong></p>
                    <p>+57 1 911-MEDICO</p>
                    <p><strong>Coordinación de Emergencias:</strong></p>
                    <p>emergencias@aeromanage.com</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};