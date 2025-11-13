
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900">
            Restez informés de nos nouveautés
          </h2>
          <p className="mt-3 mb-6 text-gray-600">
            Inscrivez-vous à notre newsletter pour recevoir nos offres spéciales et découvrir nos nouvelles salles.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3">
            <Input 
              type="email" 
              placeholder="Votre adresse e-mail" 
              className="flex-grow"
              required
            />
            <Button type="submit" className="bg-gold-500 hover:bg-gold-600 text-white">
              S'inscrire
            </Button>
          </form>
          <p className="mt-3 text-xs text-gray-500">
            En vous inscrivant, vous acceptez notre politique de confidentialité. Vous pourrez vous désinscrire à tout moment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
