import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center bg-ivory-50">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-playfair text-9xl font-bold text-gold-500">404</h1>
          <h2 className="font-playfair text-3xl font-bold text-gray-900 mt-4 mb-6">
            Page Non Trouvée
          </h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <Link to="/">
            <Button className="bg-gold-500 hover:bg-gold-600 text-white">
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;