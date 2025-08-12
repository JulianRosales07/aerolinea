import React, { useState } from 'react';
import { Briefcase, Scale, AlertTriangle, CheckCircle, Info, Package, Ruler, Ban } from 'lucide-react';

export const EquipajeSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'politicas' | 'restricciones' | 'calculadora'>('politicas');

  const politicasEquipaje = {
    economia: {
      mano: { peso: 8, dimensiones: '55x40x20 cm', cantidad: 1 },
      bodega: { peso: 23, dimensiones: '158 cm lineales', cantidad: 1 },
      adicional: { precio: 50000, peso: 23 }
    },
    premium: {
      mano: { peso: 10, dimensiones: '55x40x20 cm', cantidad: 1 },
      bodega: { peso: 32, dimensiones: '158 cm lineales', cantidad: 2 },
      adicional: { precio: 40000, peso: 23 }
    },
    business: {
      mano: { peso: 12, dimensiones: '55x40x20 cm', cantidad: 2 },
      bodega: { peso: 32, dimensiones: '158 cm lineales', cantidad: 2 },
      adicional: { precio: 30000, peso: 23 }
    },
    primera: {
      mano: { peso: 15, dimensiones: '55x40x20 cm', cantidad: 2 },
      bodega: { peso: 40, dimensiones: '158 cm lineales', cantidad: 3 },
      adicional: { precio: 20000, peso: 23 }
    }
  };

  const objetosProhibidos = [
    { categoria: 'Explosivos', items: ['Fuegos artificiales', 'Bengalas', 'Municiones', 'Dinamita'] },
    { categoria: 'Líquidos Inflamables', items: ['Gasolina', 'Alcohol >70%', 'Pintura', 'Disolventes'] },
    { categoria: 'Gases', items: ['Butano', 'Propano', 'Aerosoles inflamables', 'Oxígeno comprimido'] },
    { categoria: 'Armas', items: ['Armas de fuego', 'Cuchillos', 'Objetos punzocortantes', 'Armas deportivas'] }
  ];

  const objetosRestringidos = [
    { item: 'Líquidos en cabina', limite: '100ml por envase, máximo 1L total', ubicacion: 'Solo equipaje de mano' },
    { item: 'Medicamentos', limite: 'Cantidad necesaria para el viaje', ubicacion: 'Cabina con prescripción' },
    { item: 'Baterías de litio', limite: 'Máximo 100Wh', ubicacion: 'Solo equipaje de mano' },
    { item: 'Instrumentos musicales', limite: 'Según dimensiones', ubicacion: 'Cabina o bodega' }
  ];

  const [calculadora, setCalculadora] = useState({
    clase: 'economia',
    equipajeMano: 0,
    equipajeBodega: 0,
    equipajeAdicional: 0
  });

  const calcularCosto = () => {
    const politica = politicasEquipaje[calculadora.clase as keyof typeof politicasEquipaje];
    let costoAdicional = 0;
    
    // Costo por exceso de peso en equipaje de mano
    if (calculadora.equipajeMano > politica.mano.peso) {
      costoAdicional += (calculadora.equipajeMano - politica.mano.peso) * 15000;
    }
    
    // Costo por exceso de peso en equipaje de bodega
    if (calculadora.equipajeBodega > politica.bodega.peso) {
      costoAdicional += (calculadora.equipajeBodega - politica.bodega.peso) * 8000;
    }
    
    // Costo por equipaje adicional
    costoAdicional += calculadora.equipajeAdicional * politica.adicional.precio;
    
    return costoAdicional;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Equipaje</h1>
          <p className="text-gray-600 mt-1">Políticas, restricciones y normativas de equipaje</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'politicas', label: 'Políticas y Límites', icon: Briefcase },
            { id: 'restricciones', label: 'Restricciones', icon: Ban },
            { id: 'calculadora', label: 'Calculadora de Costos', icon: Scale }
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
          {activeTab === 'politicas' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                {Object.entries(politicasEquipaje).map(([clase, politica]) => (
                  <div key={clase} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className={`p-2 rounded-full ${
                        clase === 'primera' ? 'bg-purple-100' :
                        clase === 'business' ? 'bg-blue-100' :
                        clase === 'premium' ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <Briefcase className={`h-5 w-5 ${
                          clase === 'primera' ? 'text-purple-600' :
                          clase === 'business' ? 'text-blue-600' :
                          clase === 'premium' ? 'text-green-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <h3 className="font-semibold text-gray-900 capitalize">{clase}</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Equipaje de Mano</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>Peso: <strong>{politica.mano.peso} kg</strong></p>
                          <p>Dimensiones: <strong>{politica.mano.dimensiones}</strong></p>
                          <p>Cantidad: <strong>{politica.mano.cantidad} pieza(s)</strong></p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Equipaje de Bodega</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>Peso: <strong>{politica.bodega.peso} kg</strong></p>
                          <p>Dimensiones: <strong>{politica.bodega.dimensiones}</strong></p>
                          <p>Cantidad: <strong>{politica.bodega.cantidad} pieza(s)</strong></p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          Equipaje adicional: <strong>${politica.adicional.precio.toLocaleString()}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Normas Generales</h3>
                    <ul className="space-y-1 text-sm text-blue-800">
                      <li>• El equipaje de mano debe caber en los compartimentos superiores</li>
                      <li>• Todos los líquidos en cabina deben estar en envases de máximo 100ml</li>
                      <li>• El peso máximo por pieza de equipaje de bodega es 32kg por razones de seguridad</li>
                      <li>• Los objetos frágiles y valiosos deben transportarse en cabina</li>
                      <li>• Se requiere identificación en todas las piezas de equipaje</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'restricciones' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Ban className="h-5 w-5 text-red-600 mr-2" />
                    Objetos Prohibidos
                  </h3>
                  <div className="space-y-4">
                    {objetosProhibidos.map((categoria, index) => (
                      <div key={index} className="bg-red-50 rounded-lg p-4 border border-red-200">
                        <h4 className="font-medium text-red-900 mb-2">{categoria.categoria}</h4>
                        <ul className="space-y-1">
                          {categoria.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-sm text-red-800 flex items-center">
                              <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                    Objetos Restringidos
                  </h3>
                  <div className="space-y-4">
                    {objetosRestringidos.map((objeto, index) => (
                      <div key={index} className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <h4 className="font-medium text-yellow-900 mb-2">{objeto.item}</h4>
                        <div className="space-y-1 text-sm text-yellow-800">
                          <p><strong>Límite:</strong> {objeto.limite}</p>
                          <p><strong>Ubicación:</strong> {objeto.ubicacion}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2">Objetos Permitidos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-800">
                      <div>
                        <h4 className="font-medium mb-1">En Cabina:</h4>
                        <ul className="space-y-1">
                          <li>• Medicamentos personales</li>
                          <li>• Dispositivos electrónicos</li>
                          <li>• Libros y revistas</li>
                          <li>• Comida sólida</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">En Bodega:</h4>
                        <ul className="space-y-1">
                          <li>• Ropa y efectos personales</li>
                          <li>• Equipos deportivos</li>
                          <li>• Herramientas (sin filo)</li>
                          <li>• Productos de aseo personal</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'calculadora' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Scale className="h-5 w-5 text-blue-600 mr-2" />
                  Calculadora de Costos de Equipaje
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Clase de Vuelo
                      </label>
                      <select
                        value={calculadora.clase}
                        onChange={(e) => setCalculadora({...calculadora, clase: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="economia">Economía</option>
                        <option value="premium">Premium</option>
                        <option value="business">Business</option>
                        <option value="primera">Primera Clase</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Peso Equipaje de Mano (kg)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={calculadora.equipajeMano}
                        onChange={(e) => setCalculadora({...calculadora, equipajeMano: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Peso Equipaje de Bodega (kg)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={calculadora.equipajeBodega}
                        onChange={(e) => setCalculadora({...calculadora, equipajeBodega: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Piezas de Equipaje Adicional
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        value={calculadora.equipajeAdicional}
                        onChange={(e) => setCalculadora({...calculadora, equipajeAdicional: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4">Resumen de Costos</h4>
                    
                    {(() => {
                      const politica = politicasEquipaje[calculadora.clase as keyof typeof politicasEquipaje];
                      const costoTotal = calcularCosto();
                      const excesoMano = Math.max(0, calculadora.equipajeMano - politica.mano.peso);
                      const excesoBodega = Math.max(0, calculadora.equipajeBodega - politica.bodega.peso);
                      
                      return (
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Límite equipaje de mano:</span>
                            <span className="font-medium">{politica.mano.peso} kg</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Límite equipaje de bodega:</span>
                            <span className="font-medium">{politica.bodega.peso} kg</span>
                          </div>
                          
                          {excesoMano > 0 && (
                            <div className="flex justify-between text-sm text-red-600">
                              <span>Exceso equipaje de mano ({excesoMano} kg):</span>
                              <span className="font-medium">${(excesoMano * 15000).toLocaleString()}</span>
                            </div>
                          )}
                          
                          {excesoBodega > 0 && (
                            <div className="flex justify-between text-sm text-red-600">
                              <span>Exceso equipaje de bodega ({excesoBodega} kg):</span>
                              <span className="font-medium">${(excesoBodega * 8000).toLocaleString()}</span>
                            </div>
                          )}
                          
                          {calculadora.equipajeAdicional > 0 && (
                            <div className="flex justify-between text-sm text-blue-600">
                              <span>Equipaje adicional ({calculadora.equipajeAdicional} piezas):</span>
                              <span className="font-medium">${(calculadora.equipajeAdicional * politica.adicional.precio).toLocaleString()}</span>
                            </div>
                          )}
                          
                          <div className="pt-3 border-t border-gray-200">
                            <div className="flex justify-between text-lg font-bold">
                              <span>Total a pagar:</span>
                              <span className={costoTotal > 0 ? 'text-red-600' : 'text-green-600'}>
                                ${costoTotal.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          
                          {costoTotal === 0 && (
                            <div className="flex items-center space-x-2 text-green-600 text-sm">
                              <CheckCircle className="h-4 w-4" />
                              <span>Tu equipaje está dentro de los límites permitidos</span>
                            </div>
                          )}
                        </div>
                      );
                    })()}
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