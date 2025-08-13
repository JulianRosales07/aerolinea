import React from 'react';
import { Plane, MapPin, Clock, Star, Users, Shield, Award } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-avianca-primary to-avianca-secondary rounded-2xl p-8 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">
              Bienvenido a Avianca
            </h1>
            <p className="text-xl mb-6 text-white/90">
              Conectamos tu mundo con más de 100 destinos en América y Europa. 
              Vuela con la aerolínea líder de Colombia.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-avianca-primary px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Comprar Vuelos
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-avianca-primary transition-colors">
                Check-in Online
              </button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 opacity-20">
          <Plane className="h-64 w-64 text-white transform rotate-12" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-avianca-primary/10 rounded-xl">
              <Plane className="h-6 w-6 text-avianca-primary" />
            </div>
            <h3 className="text-lg font-semibold text-avianca-text">Reservar Vuelos</h3>
          </div>
          <p className="text-avianca-gray mb-4">
            Encuentra y reserva vuelos a más de 100 destinos con las mejores tarifas.
          </p>
          <button className="w-full bg-avianca-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors">
            Buscar Vuelos
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-avianca-secondary/10 rounded-xl">
              <Clock className="h-6 w-6 text-avianca-secondary" />
            </div>
            <h3 className="text-lg font-semibold text-avianca-text">Check-in Online</h3>
          </div>
          <p className="text-avianca-gray mb-4">
            Realiza tu check-in desde 24 horas antes y ahorra tiempo en el aeropuerto.
          </p>
          <button className="w-full bg-avianca-secondary text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors">
            Hacer Check-in
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <MapPin className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-avianca-text">Estado de Vuelos</h3>
          </div>
          <p className="text-avianca-gray mb-4">
            Consulta el estado en tiempo real de tu vuelo y recibe notificaciones.
          </p>
          <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors">
            Consultar Estado
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-avianca-text mb-6 text-center">
          ¿Por qué elegir Avianca?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="p-4 bg-avianca-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Star className="h-8 w-8 text-avianca-primary" />
            </div>
            <h3 className="font-semibold text-avianca-text mb-2">100 años de experiencia</h3>
            <p className="text-sm text-avianca-gray">
              La aerolínea más antigua de América con un siglo de tradición.
            </p>
          </div>

          <div className="text-center">
            <div className="p-4 bg-avianca-secondary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <MapPin className="h-8 w-8 text-avianca-secondary" />
            </div>
            <h3 className="font-semibold text-avianca-text mb-2">Red de destinos</h3>
            <p className="text-sm text-avianca-gray">
              Más de 100 destinos en América, Europa y el Caribe.
            </p>
          </div>

          <div className="text-center">
            <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-avianca-text mb-2">Seguridad certificada</h3>
            <p className="text-sm text-avianca-gray">
              Certificaciones internacionales de seguridad y calidad.
            </p>
          </div>

          <div className="text-center">
            <div className="p-4 bg-yellow-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-avianca-text mb-2">Programa LifeMiles</h3>
            <p className="text-sm text-avianca-gray">
              Acumula millas y disfruta beneficios exclusivos.
            </p>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-avianca-text mb-6">Destinos Populares</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { city: 'Madrid', country: 'España', price: 'Desde $1.200.000', image: '🇪🇸' },
            { city: 'Miami', country: 'Estados Unidos', price: 'Desde $800.000', image: '🇺🇸' },
            { city: 'Buenos Aires', country: 'Argentina', price: 'Desde $600.000', image: '🇦🇷' },
            { city: 'México DF', country: 'México', price: 'Desde $700.000', image: '🇲🇽' },
            { city: 'Lima', country: 'Perú', price: 'Desde $400.000', image: '🇵🇪' },
            { city: 'Quito', country: 'Ecuador', price: 'Desde $350.000', image: '🇪🇨' }
          ].map((destination, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="bg-gradient-to-br from-avianca-light to-gray-100 rounded-xl p-6 hover:shadow-md transition-all duration-300 group-hover:scale-105">
                <div className="text-4xl mb-3">{destination.image}</div>
                <h3 className="font-bold text-avianca-text text-lg">{destination.city}</h3>
                <p className="text-avianca-gray text-sm mb-2">{destination.country}</p>
                <p className="text-avianca-primary font-semibold">{destination.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-avianca-text to-gray-800 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Avianca en Números</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">100+</div>
            <div className="text-white/80">Años de historia</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">180</div>
            <div className="text-white/80">Destinos</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">30M+</div>
            <div className="text-white/80">Pasajeros anuales</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">150+</div>
            <div className="text-white/80">Aeronaves</div>
          </div>
        </div>
      </div>
    </div>
  );
};