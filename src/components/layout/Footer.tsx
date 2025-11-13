
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="space-y-4">
            <Link to="/">
              <h2 className="font-playfair text-2xl font-bold gold-gradient">Dar El 3anbar</h2>
            </Link>
            <p className="text-gray-600 max-w-xs">
              La meilleure plateforme pour trouver et réserver des salles de fêtes exceptionnelles en Tunisie.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gold-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gold-600">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-semibold">Liens Rapides</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-600 hover:text-gold-600">Accueil</Link>
              <Link to="/salles" className="text-gray-600 hover:text-gold-600">Nos Salles</Link>
              <Link to="/about" className="text-gray-600 hover:text-gold-600">À Propos</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gold-600">Contact</Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-semibold">Services</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/salles?type=mariage" className="text-gray-600 hover:text-gold-600">Salles de Mariage</Link>
              <Link to="/salles?type=conference" className="text-gray-600 hover:text-gold-600">Salles de Conférence</Link>
              <Link to="/salles?type=evenement" className="text-gray-600 hover:text-gold-600">Événements Privés</Link>
              <Link to="/services" className="text-gray-600 hover:text-gold-600">Services Premium</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-semibold">Contact</h3>
            <div className="flex flex-col space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-gold-600 mt-1" />
                <span className="text-gray-600">123 Rue Principale, Tunis, Tunisie</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-gold-600" />
                <a href="tel:+21612345678" className="text-gray-600 hover:text-gold-600">+216 12 345 678</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-gold-600" />
                <a href="mailto:contact@darelanbar.tn" className="text-gray-600 hover:text-gold-600">contact@darelanbar.tn</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 Dar El 3anbar. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/terms" className="text-gray-500 hover:text-gold-600 text-sm">
                Conditions d'utilisation
              </Link>
              <Link to="/privacy" className="text-gray-500 hover:text-gold-600 text-sm">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
