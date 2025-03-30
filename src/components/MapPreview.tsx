
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Search, Filter } from 'lucide-react';

const MapPreview: React.FC = () => {
  return (
    <div className="w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden relative">
      {/* Fond de carte stylisé */}
      <div className="absolute inset-0 bg-greenspace-neutral">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60')] bg-cover bg-center opacity-60"></div>
        
        {/* Éléments stylisés de la carte */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-greenspace-primary flex items-center justify-center mb-4 animate-float">
            <MapPin className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-greenspace-primary bg-white/80 px-4 py-2 rounded-full mb-4">
            Découvrez les espaces verts de Paris
          </h3>
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
