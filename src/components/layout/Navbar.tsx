import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-playfair text-2xl font-bold gold-gradient">Dar El 3anbar</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">Accueil</Link>
            <Link to="/salles" className="nav-link">Nos Salles</Link>
            <Link to="/about" className="nav-link">À Propos</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" size="sm" className="border-gold-400 text-gold-700 hover:bg-gold-50">
                Se Connecter
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="sm" className="border-gold-400 text-gold-700 hover:bg-gold-50">
                S'Inscrire
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline" size="sm" className="border-gold-400 text-gold-700 hover:bg-gold-50">
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gold-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white animate-fade-in border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <Link to="/" className="nav-link py-2" onClick={toggleMenu}>Accueil</Link>
            <Link to="/salles" className="nav-link py-2" onClick={toggleMenu}>Nos Salles</Link>
            <Link to="/about" className="nav-link py-2" onClick={toggleMenu}>À Propos</Link>
            <Link to="/contact" className="nav-link py-2" onClick={toggleMenu}>Contact</Link>
            <hr className="my-2" />
            <div className="flex flex-col space-y-3">
              <Link to="/login" onClick={toggleMenu}>
                <Button variant="outline" className="w-full border-gold-400 text-gold-700 hover:bg-gold-50">
                  Se Connecter
                </Button>
              </Link>
              <Link to="/signup" onClick={toggleMenu}>
                <Button variant="outline" className="w-full border-gold-400 text-gold-700 hover:bg-gold-50">
                  S'Inscrire
                </Button>
              </Link>
              <Link to="/admin" onClick={toggleMenu}>
                <Button variant="outline" className="w-full border-gold-400 text-gold-700 hover:bg-gold-50">
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
