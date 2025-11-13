import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch("http://127.0.0.1:8888/dar_el_3anbar/api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Origin": "http://localhost:8081"
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // Store user info in localStorage or context if needed
        if (data.user_id && data.user_name) {
          localStorage.setItem('user_id', data.user_id.toString());
          localStorage.setItem('user_name', data.user_name);
          localStorage.setItem('user_email', email);
        }

        alert("✅ " + data.message);

        // Redirect to dashboard or home page
        navigate('/dashboard'); // Change this to your desired route
      } else {
        setError(data.message);
        alert("❌ " + data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = "Erreur lors de la connexion. Vérifiez votre connexion internet.";
      setError(errorMessage);
      alert("🚨 " + errorMessage);
    } finally {
      setIsLoading(false);
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
                Connectez-vous à votre compte
              </h1>
              <p className="text-gray-600">
                Accédez à votre espace personnel pour gérer vos réservations.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link to="/forgotten-password" className="text-sm text-gold-600 hover:text-gold-700">
                    Mot de passe oublié ?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gold-500 hover:bg-gold-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 bg-white text-gray-500 text-sm">Ou</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  disabled={isLoading}
                >
                  Continuer avec Google
                </Button>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600">
                Vous n'avez pas de compte ?{' '}
                <Link to="/signup" className="text-gold-600 hover:text-gold-700 font-medium">
                  S'inscrire
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
