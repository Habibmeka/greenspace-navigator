
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Search, Filter } from 'lucide-react';

const MapPreview: React.FC = () => {
  return (
    <div className="w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden relative">
      {/* Fond de carte de Paris */}
      <div className="absolute inset-0 bg-greenspace-neutral">
        <div className="absolute inset-0 bg-[url('/public/lovable-uploads/80208021-a061-4c96-bb4e-9f1e7eff2aa3.png')] bg-cover bg-center"></div>
        
        {/* Points violets sur la carte (stylisés pour ressembler à l'image de référence) */}
        <div className="absolute inset-0">
          {/* Points violets positionnés manuellement pour simuler la carte de référence */}
          {Array.from({ length: 15 }).map((_, index) => (
            <div 
              key={index}
              className="absolute w-4 h-4 rounded-full bg-purple-500 animate-pulse"
              style={{
                left: `${30 + Math.random() * 40}%`,
                top: `${20 + Math.random() * 60}%`,
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 0 4px rgba(139, 92, 246, 0.3)'
              }}
            />
          ))}
        </div>
        
        {/* Éléments stylisés de la carte */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center bg-white/80 px-6 py-3 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-greenspace-primary mb-2">
              Découvrez les espaces verts de Paris
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              Plus de 400 parcs et jardins à explorer
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button className="bg-greenspace-primary hover:bg-greenspace-primary/90">
                <MapPin className="mr-2 h-4 w-4" />
                Voir la carte
              </Button>
              <Button variant="outline" className="bg-white">
                <Search className="mr-2 h-4 w-4" />
                Rechercher
              </Button>
              <Button variant="outline" className="bg-white">
                <Filter className="mr-2 h-4 w-4" />
                Filtrer
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bouton d'accès à la carte complète */}
      <Link to="/map" className="absolute bottom-4 right-4">
        <Button className="bg-greenspace-primary hover:bg-greenspace-primary/90">
          Explorer la carte
        </Button>
      </Link>
    </div>
  );
};

export default MapPreview;
