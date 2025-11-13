import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Github, Mail } from 'lucide-react';

const About = () => {
  const developers = [
    
    {
      name: "Manai Ayoub",
      role: "Développeur Web & Étudiant ISET Jendouba",
      email: "ayoubmanai106@gmail.com",
      github: "https://github.com/AyoubManai7",
      image: "/lovable-uploads/5c2a88a9-9bd8-46cb-9c0e-cf3ce4b8d771.png"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <h1 className="text-4xl font-playfair text-center font-bold mb-12 gold-gradient">
          Développé Par
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {developers.map((dev) => (
            <Card key={dev.name} className="border border-gold-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                  <img
                    src={dev.image}
                    alt={dev.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">{dev.name}</h2>
                <p className="text-gold-600">{dev.role}</p>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-3">
                <a
                  href={`mailto:${dev.email}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-gold-600"
                >
                  <Mail size={18} />
                  {dev.email}
                </a>
                <a
                  href={dev.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-gold-600"
                >
                  <Github size={18} />
                  GitHub
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;