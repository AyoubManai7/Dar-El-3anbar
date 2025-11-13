import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './AdminLogin.css'; // Custom CSS for the admin login page

const AdminLogin = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      setError('');
      navigate('/admin-dashboard'); // Redirect to the admin dashboard
    } else {
      setIsLoggedIn(false);
      setError('Erreur: Vos informations sont incorrectes.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center bg-ivory-50 py-12">
        <div className="w-full max-w-md px-4">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="text-center mb-8">
              <h1 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
                Connexion Admin
              </h1>
              <p className="text-gray-600">
                Accédez à votre espace admin pour gérer le site.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {!isLoggedIn ? (
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="text"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gold-500 hover:bg-gold-600 text-white"
                >
                  Se connecter
                </Button>
              </form>
            ) : (
              <div className="welcome-message">
                <h2>Bienvenue, Admin!</h2>
                <p>Vous êtes maintenant connecté en tant qu'administrateur.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminLogin;
