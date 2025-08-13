import React from 'react';
import { Plane, MapPin, Clock, Star, Users, Shield, Award } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-avianca-primary to-avianca-secondary rounded-2xl p-8 text-white overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Vuela con Avianca
          </h1>
          <p className="text-xl mb-6 opacity-90">
            Conectamos Colombia y el mundo con la mejor experiencia de vuelo
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-3 bg-white text-avianca-primary rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Comprar Vuelos
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-avianca-primary transition-colors">
              Check-in Online
            </button>
          </div>
        </div>
        <div className="absolute right-0 top-0 opacity-20">
          <Plane className="h-64 w-64 transform rotate-12" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Comprar Vuelos',
            description: 'Encuentra las mejores tarifas',
            icon: Plane,
            color: 'avianca-primary'
          },
          {
            title: 'Check-in',
            description: 'Haz tu check-in online',
            icon: Users,
            color: 'avianca-secondary'
          },
          {
            title: 'Equipaje',
            description: 'Consulta políticas',
            icon: Shield,
            color: 'avianca-primary'
          },
          {
            title: 'Estado de Vuelo',
            description: 'Consulta tu vuelo',
            icon: Clock,
            color: 'avianca-secondary'
          }
        ].map((action, index) => {
          const Icon = action.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className={`p-3 bg-${action.color}/10 rounded-xl w-fit mb-4`}>
                <Icon className={`h-6 w-6 text-${action.color}`} />
              </div>
              <h3 className="font-bold text-avianca-text mb-2">{action.title}</h3>
              <p className="text-avianca-gray text-sm">{action.description}</p>
            </div>
          );
        })}
      </div>

      {/* Destinations */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-avianca-text mb-6">Destinos Populares</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              city: 'Madrid',
              country: 'España',
              price: 'Desde $1.200.000',
              image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=400'
            },
            {
              city: 'Miami',
              country: 'Estados Unidos',
              price: 'Desde $800.000',
              image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=400'
            },
            {
              city: 'Buenos Aires',
              country: 'Argentina',
              price: 'Desde $600.000',
              image: 'https://images.pexels.com/photos/1386444/pexels-photo-1386444.jpeg?auto=compress&cs=tinysrgb&w=400'
            }
          ].map((destination, index) => (
            <div key={index} className="relative rounded-xl overflow-hidden group cursor-pointer">
              <img 
                src={destination.image} 
                alt={destination.city}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">{destination.city}</h3>
                <p className="text-sm opacity-90">{destination.country}</p>
                <p className="text-sm font-semibold mt-1">{destination.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Avianca */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-avianca-text mb-6 text-center">¿Por qué elegir Avianca?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Star,
              title: '100 años de experiencia',
              description: 'La aerolínea más antigua de América con un siglo de tradición'
            },
            {
              icon: MapPin,
              title: 'Red de destinos',
              description: 'Conectamos más de 100 destinos en América y Europa'
            },
            {
              icon: Award,
              title: 'Calidad certificada',
              description: 'Reconocimientos internacionales por nuestro servicio'
            }
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="p-4 bg-avianca-primary/10 rounded-full w-fit mx-auto mb-4">
                  <Icon className="h-8 w-8 text-avianca-primary" />
                </div>
                <h3 className="font-bold text-avianca-text mb-2">{feature.title}</h3>
                <p className="text-avianca-gray">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Flight Search Widget */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-avianca-text mb-6">Buscar Vuelos</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-avianca-text mb-2">Origen</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-avianca-primary focus:border-transparent">
              <option>Bogotá (BOG)</option>
              <option>Medellín (MDE)</option>
              <option>Cartagena (CTG)</option>
              <option>Cali (CLO)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-avianca-text mb-2">Destino</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-avianca-primary focus:border-transparent">
              <option>Madrid (MAD)</option>
              <option>Miami (MIA)</option>
              <option>Buenos Aires (EZE)</option>
              <option>Lima (LIM)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-avianca-text mb-2">Fecha de salida</label>
            <input 
              type="date" 
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-avianca-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-avianca-text mb-2">Pasajeros</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-avianca-primary focus:border-transparent">
              <option>1 Adulto</option>
              <option>2 Adultos</option>
              <option>3 Adultos</option>
              <option>4+ Adultos</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <button className="w-full md:w-auto px-8 py-3 bg-avianca-primary text-white rounded-xl font-semibold hover:bg-opacity-90 transition-colors">
            Buscar Vuelos
          </button>
        </div>
      </div>
    </div>
  );
};