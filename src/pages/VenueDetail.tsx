import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Users, MapPin, Calendar as CalendarIcon, Phone, Check } from 'lucide-react';

// Types
interface Venue {
  id: string;
  name: string;
  location: string;
  address: string;
  capacity: number;
  rating: number;
  reviews: number;
  price: number;
  images: string[];
  phone: string;
  type: string;
  description: string;
  features: string[];
}

// Données fictives détaillées pour une salle
const venuesData: Record<string, Venue> = {
  '1': {
    id: '1',
    name: 'Palais Royal',
    location: 'Tunis',
    address: '123 Avenue Habib Bourguiba, Tunis, Tunisie',
    capacity: 500,
    rating: 4.8,
    reviews: 124,
    price: 5000,
    images: [
      'https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3',
    ],
    phone: '+216 23 456 789',
    type: 'mariage',
    description: 'Le Palais Royal est un lieu d\'exception pour vos mariages et réceptions. Situé au cœur de Tunis, il offre un cadre élégant et raffiné pour vos événements. Avec sa grande salle de 500m², son jardin arboré et ses équipements modernes, le Palais Royal est le lieu idéal pour célébrer les moments importants de votre vie. Notre équipe de professionnels sera à votre écoute pour vous accompagner dans l\'organisation de votre événement et faire de ce jour un moment inoubliable.',
    features: [
      'Parking privé',
      'Jardin pour photos',
      'Cuisine équipée',
      'Système audio professionnel',
      'Piste de danse',
      'Service traiteur',
      'Climatisation',
      'Personnel de sécurité'
    ]
  },
  '2': {
    id: '2',
    name: 'Le Diamant',
    location: 'Hammamet',
    address: '45 Avenue de la Mer, Hammamet, Tunisie',
    capacity: 350,
    rating: 4.6,
    reviews: 96,
    price: 3800,
    images: [
      'https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3',
    ],
    phone: '+216 23 456 790',
    type: 'mariage',
    description: 'Le Diamant est une salle de réception élégante située dans la belle ville d\'Hammamet. Avec sa vue imprenable sur la mer Méditerranée, cette salle offre un cadre parfait pour les mariages et événements spéciaux. La salle peut accueillir jusqu\'à 350 invités confortablement installés, et dispose d\'une terrasse extérieure idéale pour les cocktails au coucher du soleil.',
    features: [
      'Vue sur la mer',
      'Terrasse extérieure',
      'Équipement audiovisuel',
      'Parking',
      'Service traiteur',
      'Décoration personnalisable',
      'Climatisation',
      'Accès pour personnes à mobilité réduite'
    ]
  }
};

// Dates fictives indisponibles
const unavailableDates = [
  new Date(2025, 4, 10),
  new Date(2025, 4, 11),
  new Date(2025, 4, 12),
  new Date(2025, 4, 20),
  new Date(2025, 4, 21),
  new Date(2025, 5, 5),
  new Date(2025, 5, 6),
  new Date(2025, 5, 15),
];

const VenueDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  // Fallback si l'ID n'existe pas dans nos données
  const venue = venuesData[id || '1'] || venuesData['1'];
  
  // Gestion du changement d'image
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % venue.images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? venue.images.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Galerie photos */}
          <div className="relative h-96 rounded-xl overflow-hidden mb-8">
            <div
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
              style={{ backgroundImage: `url(${venue.images[currentImageIndex]})` }}
            ></div>
            
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-between px-4">
              <button 
                onClick={prevImage}
                className="bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={nextImage}
                className="bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {venue.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    currentImageIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                ></button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informations principales */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="font-playfair text-3xl font-bold text-gray-900">{venue.name}</h1>
                  <div className="flex items-center space-x-1">
                    <Star size={20} className="text-gold-500 fill-gold-500" />
                    <span className="font-semibold">{venue.rating}</span>
                    <span className="text-gray-500 text-sm">({venue.reviews} avis)</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600 mb-3">
                  <MapPin size={18} />
                  <span>{venue.address}</span>
                </div>
                
                <div className="flex flex-col space-y-4 text-gray-600 mb-6">
                  <div className="flex items-center space-x-2">
                    <Users size={18} />
                    <span>Capacité: jusqu'à {venue.capacity} personnes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={18} />
                    <a
                      href={`https://wa.me/${venue.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Appeler sur WhatsApp
                    </a>
                  </div>
                  
                  {/* Reservation Button */}
                  <div>
                    <a
                      href={`https://wa.me/${venue.phone.replace(/[^0-9]/g, '')}?text=Bonjour, je souhaiterais réserver une table dans votre établissement. Pourriez-vous me donner les disponibilités ?`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      <Phone size={18} />
                      <span>Appeler pour réserver</span>
                    </a>
                  </div>
                </div>
                
                <hr className="my-6" />
                
                <h2 className="font-playfair text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">{venue.description}</p>
                
                <h2 className="font-playfair text-xl font-semibold mb-3">Équipements et Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                  {venue.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check size={16} className="text-gold-600" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <Tabs defaultValue="calendar">
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="calendar">Disponibilité</TabsTrigger>
                    <TabsTrigger value="map">Carte</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="calendar" className="space-y-4">
                    <div className="text-center">
                      <p className="text-gray-600 mb-4">Vérifiez les dates disponibles et contactez-nous pour réserver.</p>
                      <div className="flex justify-center">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => {
                            return unavailableDates.some(
                              (d) => d.toDateString() === date.toDateString()
                            ) || date < new Date();
                          }}
                          className="border rounded-md p-3 pointer-events-auto"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="map">
                    <div className="rounded-lg overflow-hidden h-64 bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-600">Carte indisponible</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Sidebar / Contact */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="mb-4">
                  <span className="text-2xl font-bold text-gold-700">{venue.price} TND</span>
                  <span className="text-gray-500"> / soirée</span>
                </div>
                
                <div className="space-y-4">
                  <a href={`tel:${venue.phone}`} className="btn-primary w-full flex items-center justify-center space-x-2">
                    <Phone size={18} />
                    <span>Appeler pour réserver</span>
                  </a>
                  
                  <Button variant="outline" className="w-full border-gold-400 text-gold-700 hover:bg-gold-50">
                    Demander des informations
                  </Button>
                </div>
                
                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>Pas de frais de réservation</p>
                  <p className="mt-1">Réponse rapide garantie</p>
                </div>
              </div>
              
              <div className="bg-gold-50 rounded-xl p-6 border border-gold-100">
                <h3 className="font-playfair text-lg font-semibold mb-3">Besoin d'aide ?</h3>
                <p className="text-gray-700 mb-4">Notre équipe est disponible pour répondre à toutes vos questions.</p>
                <div className="flex items-center space-x-3">
                  <Phone size={18} className="text-gold-600" />
                  <a href="tel:+21612345678" className="text-gold-700 hover:underline">+216 12 345 678</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VenueDetail;