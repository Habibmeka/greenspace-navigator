
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Leaf, ArrowLeft } from 'lucide-react';
import { useParisGreenSpaces } from '@/hooks/useParisGreenSpaces';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedPark, setSelectedPark] = useState<GreenSpaceRecord | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  const parks = data?.results || [];
  const mapboxToken = 'pk.eyJ1IjoiaGFiaWJtZWthIiwiYSI6ImNtY2l2bmlsZTEzNDgybHF4d3pma2tpcmEifQ.2VzNf3TJWgYs2kn-a3iTxw';

  // Initialiser la carte Mapbox
  useEffect(() => {
    if (!mapContainer.current) return;

    // Définir le token d'accès Mapbox
    mapboxgl.accessToken = mapboxToken;

    // Créer la carte
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [2.3522, 48.8566], // Centre de Paris
      zoom: 11
    });

    // Désactiver le zoom par scroll pour éviter les conflits avec le scroll de la page
    map.current.scrollZoom.disable();

    // Ajouter les contrôles de navigation
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Nettoyer les anciens marqueurs
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Attendre que la carte soit chargée avant d'ajouter les marqueurs
    map.current.on('load', () => {
      addMarkersToMap();
    });

    return () => {
      map.current?.remove();
    };
  }, [parks]);

  // Ajouter les marqueurs des espaces verts
  const addMarkersToMap = () => {
    if (!map.current) return;

    parks.forEach((park) => {
      if (park.fields?.geo_point_2d) {
        // Créer un élément DOM pour le marqueur
        const el = document.createElement('div');
        el.className = 'mapbox-marker';
        el.style.width = '20px';
        el.style.height = '20px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = '#16a34a';
        el.style.border = '3px solid white';
        el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3), 0 0 0 0 rgba(22, 163, 74, 0.7)';
        el.style.cursor = 'pointer';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.animation = 'mapboxPulse 2s infinite';

        // Créer le marqueur
        const marker = new mapboxgl.Marker(el)
          .setLngLat([park.fields.geo_point_2d.lon, park.fields.geo_point_2d.lat])
          .addTo(map.current as mapboxgl.Map);

        // Ajouter un événement de clic
        el.addEventListener('click', () => {
          setSelectedPark(park);
        });

        // Ajouter un popup au survol
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          closeOnClick: false
        }).setHTML(`<div class="p-2"><strong>${park.fields.nom_ev}</strong><br/>${park.fields.type_ev}</div>`);

        el.addEventListener('mouseenter', () => {
          marker.setPopup(popup).togglePopup();
        });

        el.addEventListener('mouseleave', () => {
          popup.remove();
        });

        markers.current.push(marker);
      }
    });
  };

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
    <>
      {/* CSS pour l'animation des marqueurs */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes mapboxPulse {
            0% {
              box-shadow: 0 2px 4px rgba(0,0,0,0.3), 0 0 0 0 rgba(22, 163, 74, 0.7);
            }
            70% {
              box-shadow: 0 2px 4px rgba(0,0,0,0.3), 0 0 0 10px rgba(22, 163, 74, 0);
            }
            100% {
              box-shadow: 0 2px 4px rgba(0,0,0,0.3), 0 0 0 0 rgba(22, 163, 74, 0);
            }
          }
        `
      }} />

      <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
        {/* Container de la carte */}
        <div ref={mapContainer} className="absolute inset-0" />

        {/* Panneau d'information */}
        {selectedPark && (
          <div className="absolute inset-y-0 right-0 w-full md:w-96 bg-white shadow-xl z-30 transform transition-transform">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b flex items-center justify-between bg-green-50">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedPark(null)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour à la carte
                </Button>
              </div>
              
              <div className="flex-1 overflow-auto p-4">
                <h2 className="text-xl font-bold mb-2 text-green-800">
                  {selectedPark.fields?.nom_ev || 'Espace vert'}
                </h2>
                <p className="text-gray-600 mb-4 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {selectedPark.fields?.adresse_ev || 'Adresse non disponible'}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 rounded-lg p-3 text-center border border-green-100">
                    <div className="w-8 h-8 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">
                        {selectedPark.fields?.arrondissement || 'N/A'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Arrondissement</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center border border-green-100">
                    <Leaf className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <p className="text-xs text-gray-500">Surface</p>
                    <p className="text-sm font-medium">
                      {selectedPark.fields?.surface_totale_reelle 
                        ? `${Math.round(selectedPark.fields.surface_totale_reelle / 10000)} ha` 
                        : 'N/A'}
                    </p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Type d'espace</h3>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {selectedPark.fields?.type_ev || 'Espace vert'}
                  </span>
                </div>
                
                {selectedPark.fields?.horaire_ouverture && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2 flex items-center text-gray-800">
                      <Clock className="h-4 w-4 mr-2" />
                      Horaires d'ouverture
                    </h3>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {selectedPark.fields.horaire_ouverture}
                    </p>
                  </div>
                )}
                
                {selectedPark.fields?.equipement && selectedPark.fields.equipement.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Équipements disponibles</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPark.fields.equipement.map((eq, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full border border-blue-200"
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
          <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{parks.length}</p>
                  <p className="text-xs text-gray-600">Espaces verts</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {Math.round(parks.reduce((sum, park) => sum + (park.fields?.surface_totale_reelle || 0), 0) / 10000)}
                  </p>
                  <p className="text-xs text-gray-600">Hectares total</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {new Set(parks.map(park => park.fields?.arrondissement)).size}
                  </p>
                  <p className="text-xs text-gray-600">Arrondissements</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default InteractiveMap;
