
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Leaf, ArrowLeft } from 'lucide-react';
import { useParisGreenSpaces } from '@/hooks/useParisGreenSpaces';

interface GreenSpaceRecord {
  record_id: string;
  fields: {
    nom_ev: string;
    type_ev: string;
    adresse_complete?: string;
    arrondissement: string;
    surface_totale_reelle?: number;
    geo_point_2d: {
      lon: number;
      lat: number;
    };
    equipement?: string[];
    horaire_ouverture?: string;
  };
}

const InteractiveMap: React.FC = () => {
  const { data, isLoading, error } = useParisGreenSpaces();
  const [selectedPark, setSelectedPark] = useState<GreenSpaceRecord | null>(null);

  console.log('Green spaces data:', data);
  console.log('Loading state:', isLoading);
  console.log('Error state:', error);

  if (isLoading) {
    return (
      <div className="w-full h-[600px] bg-greenspace-neutral rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-greenspace-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des espaces verts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Error loading green spaces:', error);
    return (
      <div className="w-full h-[600px] bg-red-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">Erreur lors du chargement des données</p>
          <p className="text-sm text-gray-500">{error.message}</p>
        </div>
      </div>
    );
  }

  const parks = data?.results || [];

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
      {/* Fond de carte de Paris */}
      <div className="absolute inset-0 bg-greenspace-neutral">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/lovable-uploads/80208021-a061-4c96-bb4e-9f1e7eff2aa3.png')`
          }}
        >
          {/* Overlay pour améliorer la lisibilité */}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        {/* Points des espaces verts */}
        <div className="absolute inset-0">
          {parks.slice(0, 20).map((park, index) => (
            <div
              key={park.record_id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
              style={{
                left: `${30 + (index % 8) * 8}%`,
                top: `${25 + Math.floor(index / 8) * 15}%`,
              }}
              onClick={() => setSelectedPark(park)}
            >
              <div className="w-6 h-6 rounded-full bg-greenspace-primary shadow-lg flex items-center justify-center animate-pulse">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                {park.fields.nom_ev}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Panneau d'information */}
      {selectedPark && (
        <div className="absolute inset-y-0 right-0 w-full md:w-96 bg-white shadow-lg z-20 transform transition-transform">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedPark(null)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </div>
            
            <div className="flex-1 overflow-auto p-4">
              <h2 className="text-xl font-bold mb-2">{selectedPark.fields.nom_ev}</h2>
              <p className="text-gray-600 mb-4">{selectedPark.fields.adresse_complete || 'Adresse non disponible'}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-greenspace-neutral rounded-lg p-3 text-center">
                  <MapPin className="h-5 w-5 mx-auto mb-1 text-greenspace-primary" />
                  <p className="text-xs text-gray-500">Arrondissement</p>
                  <p className="text-sm font-medium">{selectedPark.fields.arrondissement}ème</p>
                </div>
                <div className="bg-greenspace-neutral rounded-lg p-3 text-center">
                  <Leaf className="h-5 w-5 mx-auto mb-1 text-greenspace-primary" />
                  <p className="text-xs text-gray-500">Surface</p>
                  <p className="text-sm font-medium">
                    {selectedPark.fields.surface_totale_reelle ? `${selectedPark.fields.surface_totale_reelle}m²` : 'N/A'}
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Type d'espace</h3>
                <p className="text-sm text-gray-600">{selectedPark.fields.type_ev}</p>
              </div>
              
              {selectedPark.fields.horaire_ouverture && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Horaires
                  </h3>
                  <p className="text-sm text-gray-600">{selectedPark.fields.horaire_ouverture}</p>
                </div>
              )}
              
              {selectedPark.fields.equipement && selectedPark.fields.equipement.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Équipements</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPark.fields.equipement.map((eq, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-greenspace-primary/10 text-greenspace-primary text-xs rounded-full"
                      >
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Statistiques en overlay */}
      <div className="absolute bottom-4 left-4">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-greenspace-primary">{parks.length}</p>
                <p className="text-xs text-gray-600">Espaces verts</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-greenspace-primary">
                  {Math.round(parks.reduce((sum, park) => sum + (park.fields.surface_totale_reelle || 0), 0) / 10000)}
                </p>
                <p className="text-xs text-gray-600">Hectares</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveMap;
