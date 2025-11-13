
import React from 'react';
import { Star, Users, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

// Définition des types pour les salles
interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: number;
  rating: number;
  price: number;
  image: string;
  phone: string;
}

// Données fictives pour les salles vedettes
const featuredVenues: Venue[] = [
  {
    id: '1',
    name: 'Palais Royal',
    location: 'Tunis',
    capacity: 500,
    rating: 4.8,
    price: 5000,
    image: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3',
    phone: '+216 23 456 789'
  },
  {
    id: '2',
    name: 'Le Diamant',
    location: 'Hammamet',
    capacity: 350,
    rating: 4.6,
    price: 3800,
    image: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3',
    phone: '+216 23 456 790'
  },
  {
    id: '3',
    name: 'Garden Palace',
    location: 'Sousse',
    capacity: 420,
    rating: 4.7,
    price: 4200,
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3',
    phone: '+216 23 456 791'
  },
  {
    id: '4',
    name: 'L\'Élégance',
    location: 'Sfax',
    capacity: 280,
    rating: 4.5,
    price: 3400,
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3',
    phone: '+216 54616609'
  }
];

const VenueCard: React.FC<{ venue: Venue }> = ({ venue }) => {
  return (
    <div className="elegant-card">
      <div 
        className="h-56 bg-cover bg-center"
        style={{ backgroundImage: `url(${venue.image})` }}
      ></div>
      
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-playfair text-lg font-semibold text-gray-900">{venue.name}</h3>
          <div className="flex items-center space-x-1">
            <Star size={16} className="text-gold-500 fill-gold-500" />
            <span className="text-sm font-medium">{venue.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm">{venue.location}</p>
        
        <div className="flex items-center space-x-1 text-gray-600">
          <Users size={16} />
          <span className="text-sm">Jusqu'à {venue.capacity} personnes</span>
        </div>
        
        <div className="flex justify-between items-center pt-3">
          <div>
            <span className="text-lg font-semibold text-gold-700">{venue.price} TND</span>
            <span className="text-xs text-gray-500"> / soirée</span>
          </div>
          <Link to={`/salles/${venue.id}`}>
            <Button variant="outline" size="sm" className="border-gold-400 text-gold-700 hover:bg-gold-50">
              Voir détails
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeaturedVenues = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl font-bold text-gray-900">Nos Salles Vedettes</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Découvrez nos salles les plus prestigieuses et appréciées pour vos événements exceptionnels.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/salles">
            <Button className="bg-gold-500 hover:bg-gold-600 text-white">
              Voir toutes nos salles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVenues;
