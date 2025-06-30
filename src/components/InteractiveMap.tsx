
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Leaf, ArrowLeft, Plus, Minus, RotateCcw } from 'lucide-react';
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
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  const parks = data?.results || [];

  // Fonction pour convertir les coordonnées géographiques en position sur la carte
  const convertGeoToMapPosition = (lon: number, lat: number) => {
    // Paris bounds approximatifs
    const parisCenter = { lon: 2.3522, lat: 48.8566 };
    const bounds = {
      minLon: 2.224,
      maxLon: 2.469,
      minLat: 48.815,
      maxLat: 48.902
    };

    const x = ((lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * 100;
    const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 100;

    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (selectedPark) return; // Ne pas permettre le drag si un parc est sélectionné
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      handleZoomOut();
    } else {
      handleZoomIn();
    }
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
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
      {/* Carte interactive */}
      <div
        ref={mapRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {/* Fond de carte de Paris avec image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-200"
          style={{
            backgroundImage: `url('/lovable-uploads/c199e465-6191-4eb7-aefb-882e131a644d.png')`,
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
          }}
        >
          {/* Overlay pour améliorer la lisibilité */}
          <div className="absolute inset-0 bg-green-50/20"></div>

          {/* Points des espaces verts positionnés géographiquement */}
          {parks.map((park, index) => {
            const position = convertGeoToMapPosition(
              park.fields?.geo_point_2d?.lon || 2.3522,
              park.fields?.geo_point_2d?.lat || 48.8566
            );

            return (
              <div
                key={park.record_id || `park-${index}`}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-all duration-200 z-10"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPark(park);
                }}
              >
                <div className="relative">
                  <div className="w-4 h-4 rounded-full bg-green-600 shadow-lg flex items-center justify-center animate-pulse border-2 border-white">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                    {park.fields?.nom_ev || 'Espace vert'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contrôles de zoom */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
        <Button
          variant="outline"
          size="icon"
          className="bg-white/90 backdrop-blur-sm hover:bg-white"
          onClick={handleZoomIn}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white/90 backdrop-blur-sm hover:bg-white"
          onClick={handleZoomOut}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white/90 backdrop-blur-sm hover:bg-white"
          onClick={handleReset}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Indicateur de zoom */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm z-20">
        <p className="text-sm font-medium">Zoom: {Math.round(zoom * 100)}%</p>
      </div>

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

      {/* Instructions d'utilisation */}
      <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-2 rounded-lg text-xs max-w-xs">
        <p className="mb-1">💡 Utilisez la molette pour zoomer</p>
        <p>🖱️ Cliquez et glissez pour vous déplacer</p>
      </div>
    </div>
  );
};

export default InteractiveMap;
