
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-playfair text-center font-bold mb-12 gold-gradient">
          Contactez-nous
        </h1>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Information */}
          <Card className="border border-gold-200">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-gray-800">Nos Coordonnées</h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-3">
                <MapPin className="text-gold-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-700">Adresse</h3>
                  <p className="text-gray-600">ISET Jendouba, Avenue de l'UMA<br />8189 Jendouba, Tunisie</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-gold-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-700">Téléphone</h3>
                  <a href="tel:+21678611962" className="text-gray-600 hover:text-gold-600">
                    +216 54 616 609
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-gold-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-700">Email</h3>
                  <a href="mailto:contact@darelanbar.tn" className="text-gray-600 hover:text-gold-600">
                    contact@darelanbar.tn
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="border border-gold-200">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-gray-800">Envoyez-nous un message</h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Nom complet
                  </label>
                  <Input id="name" placeholder="Votre nom" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="votre@email.com" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Votre message..."
                    className="min-h-[150px]"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-gold-500 hover:bg-gold-600 text-white">
                  Envoyer
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
