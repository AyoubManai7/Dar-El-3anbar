
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Star, Users, MapPin, Search, Calendar, Phone } from 'lucide-react';

// Types
interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: number;
  rating: number;
  price: number;
  image: string;
  phone: string;
  type: string;
}

// Données fictives pour les salles
const allVenues: Venue[] = [
  {
    id: '1',
    name: 'Palais Royal',
    location: 'Tunis',
    capacity: 500,
    rating: 4.8,
    price: 5000,
    image: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3',
    phone: '+216 23 456 789',
    type: 'mariage'
  },
  {
    id: '2',
    name: 'Le Diamant',
    location: 'Hammamet',
    capacity: 350,
    rating: 4.6,
    price: 3800,
    image: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3',
    phone: '+216 23 456 790',
    type: 'mariage'
  },
  {
    id: '3',
    name: 'Garden Palace',
    location: 'Sousse',
    capacity: 420,
    rating: 4.7,
    price: 4200,
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3',
    phone: '+216 23 456 791',
    type: 'prive'
  },
  {
    id: '4',
    name: 'L\'Élégance',
    location: 'Sfax',
    capacity: 280,
    rating: 4.5,
    price: 3400,
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3',
    phone: '+216 23 456 792',
    type: 'conference'
  },
  {
    id: '5',
    name: 'Le Grand Salon',
    location: 'Tunis',
    capacity: 450,
    rating: 4.9,
    price: 4800,
    image: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3',
    phone: '+216 23 456 793',
    type: 'mariage'
  },
  {
    id: '6',
    name: 'Dar El Nour',
    location: 'Hammamet',
    capacity: 320,
    rating: 4.5,
    price: 3600,
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3',
    phone: '+216 23 456 794',
    type: 'prive'
  },
  {
    id: '7',
    name: 'Business Center',
    location: 'Tunis',
    capacity: 150,
    rating: 4.7,
    price: 2800,
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3',
    phone: '+216 23 456 795',
    type: 'conference'
  },
  {
    id: '8',
    name: 'Villa Jasmin',
    location: 'Sousse',
    capacity: 200,
    rating: 4.6,
    price: 3200,
    image: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3',
    phone: '+216 23 456 796',
    type: 'prive'
  }
];

const VenuesList = () => {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type');
  
  // États pour les filtres
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [capacityMin, setCapacityMin] = useState(0);
  const [selectedType, setSelectedType] = useState(typeParam || 'all');
  
  // Filtrage des salles
  const filteredVenues = allVenues.filter((venue) => {
    const matchesLocation = location === '' || venue.location.toLowerCase().includes(location.toLowerCase());
    const matchesPrice = venue.price >= priceRange[0] && venue.price <= priceRange[1];
    const matchesCapacity = venue.capacity >= capacityMin;
    const matchesType = selectedType === 'all' || venue.type === selectedType;
    
    return matchesLocation && matchesPrice && matchesCapacity && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-ivory-50 py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
              Nos Salles de Fêtes
            </h1>
            
            {/* Filtres */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Lieu</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-3 text-gray-400" />
                    <Input 
                      placeholder="Ville, région..." 
                      className="pl-10"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Type d'événement</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="mariage">Mariage</SelectItem>
                      <SelectItem value="conference">Conférence</SelectItem>
                      <SelectItem value="prive">Événement privé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Prix (TND)</label>
                  <div className="px-3 pt-6 pb-2">
                    <Slider 
                      defaultValue={[0, 10000]} 
                      max={10000} 
                      step={100}
                      onValueChange={(value) => setPriceRange(value)}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>{priceRange[0]} TND</span>
                      <span>{priceRange[1]} TND</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Capacité minimale</label>
                  <Select 
                    value={capacityMin.toString()} 
                    onValueChange={(value) => setCapacityMin(parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Toutes</SelectItem>
                      <SelectItem value="100">100+</SelectItem>
                      <SelectItem value="200">200+</SelectItem>
                      <SelectItem value="300">300+</SelectItem>
                      <SelectItem value="400">400+</SelectItem>
                      <SelectItem value="500">500+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Résultats */}
            <div className="mb-4">
              <p className="text-gray-600">
                {filteredVenues.length} salles trouvées
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <div key={venue.id} className="elegant-card">
                  <div 
                    className="h-48 bg-cover bg-center"
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
                    
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin size={16} />
                      <span className="text-sm">{venue.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Users size={16} />
                      <span className="text-sm">Jusqu'à {venue.capacity} personnes</span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-3">
                      <div>
                        <span className="text-lg font-semibold text-gold-700">{venue.price} TND</span>
                        <span className="text-xs text-gray-500"> / soirée</span>
                      </div>
                      <div className="flex space-x-2">
                        <a href={`tel:${venue.phone}`}>
                          <Button variant="outline" size="sm" className="border-gold-400 text-gold-700 hover:bg-gold-50">
                            <Phone size={16} className="mr-1" />
                            Appeler
                          </Button>
                        </a>
                        <Link to={`/salles/${venue.id}`}>
                          <Button size="sm" className="bg-gold-500 hover:bg-gold-600 text-white">
                            Détails
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredVenues.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">Aucune salle ne correspond à vos critères.</p>
                <Button 
                  onClick={() => {
                    setLocation('');
                    setPriceRange([0, 10000]);
                    setCapacityMin(0);
                    setSelectedType('all');
                  }}
                  className="bg-gold-500 hover:bg-gold-600 text-white"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VenuesList;
