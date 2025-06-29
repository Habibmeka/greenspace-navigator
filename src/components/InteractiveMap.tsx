
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
    adresse_ev?: string;
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

  const parks = data?.results || [];

  if (isLoading) {
    return (
      <div className="w-full h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des espaces verts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
      {/* Fond de carte stylisé */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-green-50 to-blue-50">
        {/* Simulation d'une carte avec des formes géométriques */}
        <div className="absolute inset-0">
          {/* Rivière Seine stylisée */}
          <div className="absolute top-1/2 left-0 w-full h-8 bg-blue-200 opacity-60 transform -rotate-12"></div>
          
          {/* Zones vertes de fond */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-40"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-green-300 rounded-full opacity-40"></div>
          <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-green-200 rounded-full opacity-40"></div>
          
          {/* Points des espaces verts */}
          {parks.slice(0, 15).map((park, index) => (
            <div
              key={park.record_id || `park-${index}`}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
              style={{
                left: `${20 + (index % 5) * 15}%`,
                top: `${20 + Math.floor(index / 5) * 20}%`,
              }}
              onClick={() => setSelectedPark(park)}
            >
              <div className="w-6 h-6 rounded-full bg-green-600 shadow-lg flex items-center justify-center animate-pulse">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                {park.fields?.nom_ev || 'Espace vert'}
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
              <h2 className="text-xl font-bold mb-2">{selectedPark.fields?.nom_ev || 'Espace vert'}</h2>
              <p className="text-gray-600 mb-4">{selectedPark.fields?.adresse_ev || 'Adresse non disponible'}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <MapPin className="h-5 w-5 mx-auto mb-1 text-green-600" />
                  <p className="text-xs text-gray-500">Arrondissement</p>
                  <p className="text-sm font-medium">{selectedPark.fields?.arrondissement || 'N/A'}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <Leaf className="h-5 w-5 mx-auto mb-1 text-green-600" />
                  <p className="text-xs text-gray-500">Surface</p>
                  <p className="text-sm font-medium">
                    {selectedPark.fields?.surface_totale_reelle ? `${selectedPark.fields.surface_totale_reelle}m²` : 'N/A'}
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Type d'espace</h3>
                <p className="text-sm text-gray-600">{selectedPark.fields?.type_ev || 'Espace vert'}</p>
              </div>
              
              {selectedPark.fields?.horaire_ouverture && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Horaires
                  </h3>
                  <p className="text-sm text-gray-600">{selectedPark.fields.horaire_ouverture}</p>
                </div>
              )}
              
              {selectedPark.fields?.equipement && selectedPark.fields.equipement.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Équipements</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPark.fields.equipement.map((eq, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
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
                <p className="text-2xl font-bold text-green-600">{parks.length}</p>
                <p className="text-xs text-gray-600">Espaces verts</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {Math.round(parks.reduce((sum, park) => sum + (park.fields?.surface_totale_reelle || 0), 0) / 10000)}
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
