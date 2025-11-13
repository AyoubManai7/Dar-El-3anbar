import React, { useEffect, useState } from 'react';
import { Search, Calendar, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeroBanner = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationTime, setAnimationTime] = useState(0);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Simple animation timer - less resource intensive
    const interval = setInterval(() => {
      setAnimationTime(prev => (prev + 1) % 1000);
    }, 100); // Slower update for better performance
    
    return () => clearInterval(interval);
  }, []);

  // Generate a limited number of squares for better performance
  const squares = [];
  const squareCount = 8; // Fewer elements to reduce lag
  
  for (let i = 0; i < squareCount; i++) {
    // Calculate position based on animation time
    const speed = 0.3 + (i % 3) * 0.1;
    const posX = ((animationTime * speed) + (i * 120)) % 120 - 20; // Move from -20% to 100% across screen
    const posY = 15 + (i * 70 / squareCount) % 70; // Distribute vertically
    const size = 30 + (i % 4) * 10; // Vary sizes
    
    // Select from website color palette - darker, richer colors
    const colors = [
      'rgba(184, 134, 11, 0.35)',  // Darker gold
      'rgba(139, 69, 19, 0.3)',    // Saddle brown
      'rgba(160, 82, 45, 0.3)',    // Sienna
      'rgba(205, 133, 63, 0.35)',  // Peru
    ];
    
    squares.push({
      id: i,
      posX,
      posY,
      size,
      color: colors[i % colors.length],
      rotation: (animationTime * 0.1 + i * 45) % 360
    });
  }

  return (
    <div className="relative bg-ivory-50 overflow-hidden">
      {/* Simple solid background with subtle gradient */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          background: 'linear-gradient(135deg, rgba(255,248,220,1) 0%, rgba(255,236,179,1) 100%)',
          zIndex: 0
        }}
      ></div>
      
      {/* Animated squares */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
        {squares.map(square => (
          <div 
            key={square.id}
            className="absolute shadow-md"
            style={{
              width: `${square.size}px`,
              height: `${square.size}px`,
              left: `${square.posX}%`,
              top: `${square.posY}%`,
              backgroundColor: square.color,
              transform: `rotate(${square.rotation}deg)`,
              transition: 'top 0.5s ease-out'
            }}
          ></div>
        ))}
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Trouvez la Salle Parfaite<br />pour Votre <span className="gold-gradient">Événement</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Des salles élégantes et prestigieuses pour vos mariages, conférences et fêtes privées partout en Tunisie.
          </p>
          
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mt-8 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-3.5 text-gray-400" />
                <Input 
                  placeholder="Lieu (ville, région...)" 
                  className="pl-10 border-gray-200 rounded-md"
                />
              </div>
              
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-3.5 text-gray-400" />
                <Input 
                  type="date" 
                  placeholder="Date" 
                  className="pl-10 border-gray-200 rounded-md"
                />
              </div>
              
              <Button className="bg-gold-500 hover:bg-gold-600 text-white h-full">
                <Search size={18} className="mr-2" />
                Rechercher
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;