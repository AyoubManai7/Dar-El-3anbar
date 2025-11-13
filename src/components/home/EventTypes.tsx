
import React from 'react';
import { Link } from 'react-router-dom';

const eventTypes = [
  {
    id: 'weddings',
    title: 'Mariages',
    description: 'Salles somptueuses pour votre jour spécial',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3',
    url: '/salles?type=mariage'
  },
  {
    id: 'conferences',
    title: 'Conférences',
    description: 'Espaces professionnels entièrement équipés',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3',
    url: '/salles?type=conference'
  },
  {
    id: 'parties',
    title: 'Fêtes Privées',
    description: 'Célébrez vos moments importants dans un cadre exceptionnel',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3',
    url: '/salles?type=prive'
  }
];

const EventTypes = () => {
  return (
    <section className="py-16 bg-ivory-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl font-bold text-gray-900">
            Un Cadre Parfait pour Chaque Événement
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Des salles adaptées pour tous types d'événements, avec des services sur mesure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {eventTypes.map((event) => (
            <Link key={event.id} to={event.url} className="group">
              <div className="relative overflow-hidden rounded-xl shadow-md h-80">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${event.image})` }}
                ></div>
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-500"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="font-playfair text-2xl font-bold mb-2">{event.title}</h3>
                  <p className="text-white text-opacity-90 mb-4">{event.description}</p>
                  <span className="inline-block py-2 px-4 bg-gold-500 rounded-md text-sm font-medium transition-transform duration-300 group-hover:translate-x-2">
                    Découvrir
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventTypes;
