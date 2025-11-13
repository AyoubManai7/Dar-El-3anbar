
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Ben Ahmed',
    role: 'Mariée',
    content: 'Le Palais Royal a dépassé nos attentes. Notre mariage était parfait et l\'équipe a été incroyablement attentionnée. Je recommande vivement !',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/62.jpg'
  },
  {
    id: 2,
    name: 'Mohamed Khelifi',
    role: 'Organisateur d\'événements',
    content: 'J\'organise régulièrement des conférences professionnelles dans les salles proposées par Dar El 3anbar. Le service est impeccable et les lieux sont magnifiques.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/40.jpg'
  },
  {
    id: 3,
    name: 'Leila Mansour',
    role: 'Fête d\'anniversaire',
    content: 'La salle Garden Palace a été parfaite pour l\'anniversaire surprise de mon mari. L\'équipe nous a aidés à tout organiser et nos invités ont adoré !',
    rating: 4,
    image: 'https://randomuser.me/api/portraits/women/36.jpg'
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl font-bold text-gray-900">Ce que disent nos clients</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Des centaines de clients satisfaits ont choisi nos salles pour leurs événements importants.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="elegant-card p-6">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-gold-500 fill-gold-500" />
                ))}
              </div>
              
              <p className="text-gray-700 italic">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
