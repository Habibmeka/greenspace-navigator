
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Search, Filter, X, Info, ArrowLeft, Clock, Leaf, TreeDeciduous } from 'lucide-react';

const Map = () => {
  const [selectedPark, setSelectedPark] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Simulation d'un parc sélectionné pour démonstration
  const selectPark = (parkName: string) => {
    setSelectedPark(parkName);
  };

  const closeParkInfo = () => {
    setSelectedPark(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 relative">
        {/* Barre de recherche et filtres */}
        <div className="absolute top-4 left-4 right-4 z-10 flex flex-col gap-4">
          <Card className="w-full max-w-3xl mx-auto shadow-lg">
            <CardContent className="p-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input 
                    placeholder="Rechercher un parc ou jardin..." 
                    className="pl-9"
                  />
                </div>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-1"
                  onClick={() => setFiltersOpen(!filtersOpen)}
                >
                  <Filter className="h-4 w-4" />
                  Filtres
                </Button>
              </div>
              
              {filtersOpen && (
                <div className="mt-4 border-t pt-4">
                  <Tabs defaultValue="type">
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="type">Type d'espace</TabsTrigger>
                      <TabsTrigger value="equipment">Équipements</TabsTrigger>
                      <TabsTrigger value="size">Surface</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="type">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox id="type-park" />
                          <Label htmlFor="type-park" className="text-sm font-normal">Parcs</Label>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Checkbox id="type-garden" />
                          <Label htmlFor="type-garden" className="text-sm font-normal">Jardins</Label>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Checkbox id="type-square" />
                          <Label htmlFor="type-square" className="text-sm font-normal">Squares</Label>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Checkbox id="type-promenade" />
                          <Label htmlFor="type-promenade" className="text-sm font-normal">Promenades</Label>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Checkbox id="type-wood" />
                          <Label htmlFor="type-wood" className="text-sm font-normal">Bois</Label>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="equipment">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox id="eq-playground" />
                          <Label htmlFor="eq-playground" className="text-sm font-normal">Aires de jeux</Label>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Checkbox id="eq-toilet" />
                          <Label htmlFor="eq-toilet" className="text-sm font-normal">Toilettes</Label>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Checkbox id="eq-water" />
                          <Label htmlFor="eq-water" className="text-sm font-normal">Points d'eau</Label>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Checkbox id="eq-picnic" />
                          <Label htmlFor="eq-picnic" className="text-sm font-normal">Aires de pique-nique</Label>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Checkbox id="eq-sport" />
                          <Label htmlFor="eq-sport" className="text-sm font-normal">Équipements sportifs</Label>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Checkbox id="eq-dog" />
                          <Label htmlFor="eq-dog" className="text-sm font-normal">Accès chiens</Label>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="size">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm mb-2 block">Surface minimale (hectares)</Label>
                          <Slider defaultValue={[0]} max={20} step={1} />
                          <div className="flex justify-between mt-2 text-xs text-gray-500">
                            <span>0 ha</span>
                            <span>5 ha</span>
                            <span>10 ha</span>
                            <span>15 ha</span>
                            <span>20+ ha</span>
                          </div>
                        </div>
                        
                        <div>
                          <Label className="text-sm mb-2 block">Distance maximale</Label>
                          <Select defaultValue="500">
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner une distance" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="500">500 m</SelectItem>
                              <SelectItem value="1000">1 km</SelectItem>
                              <SelectItem value="2000">2 km</SelectItem>
                              <SelectItem value="5000">5 km</SelectItem>
                              <SelectItem value="all">Tous</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setFiltersOpen(false)}>
                      Annuler
                    </Button>
                    <Button className="bg-greenspace-primary hover:bg-greenspace-primary/90" onClick={() => setFiltersOpen(false)}>
                      Appliquer
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Fond de carte pour le moment (à remplacer par la vraie carte) */}
        <div className="w-full h-[calc(100vh-64px)] bg-greenspace-neutral">
          {/* Simulation de carte avec quelques éléments */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=60')] bg-cover bg-center opacity-30"></div>
          
          {/* Points d'intérêt simulés */}
          <div className="absolute top-1/3 left-1/4" onClick={() => selectPark("Parc des Buttes-Chaumont")}>
            <div className="w-8 h-8 rounded-full bg-greenspace-primary flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <MapPin className="h-5 w-5 text-white" />
            </div>
          </div>
          
          <div className="absolute top-2/3 left-1/2" onClick={() => selectPark("Jardin du Luxembourg")}>
            <div className="w-8 h-8 rounded-full bg-greenspace-primary flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <MapPin className="h-5 w-5 text-white" />
            </div>
          </div>
          
          <div className="absolute top-1/2 right-1/3" onClick={() => selectPark("Parc Monceau")}>
            <div className="w-8 h-8 rounded-full bg-greenspace-primary flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <MapPin className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        
        {/* Panneau d'information sur le parc sélectionné */}
        {selectedPark && (
          <div className="absolute inset-y-0 right-0 w-full md:w-96 bg-white shadow-lg transition-transform transform translate-x-0 z-20">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={closeParkInfo}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <Info className="h-4 w-4 mr-2" />
                  Signaler
                </Button>
              </div>
              
              <div className="flex-1 overflow-auto">
                {/* Image du parc */}
                <div className="relative h-48">
                  <img 
                    src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80" 
                    alt={selectedPark} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h2 className="text-white text-xl font-bold">{selectedPark}</h2>
                    <p className="text-white/90 text-sm flex items-center">
                      <MapPin className="h-4 w-4 mr-1" /> 19ème arrondissement
                    </p>
                  </div>
                </div>
                
                {/* Informations pratiques */}
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-greenspace-neutral rounded-lg p-3 text-center">
                      <Clock className="h-5 w-5 mx-auto mb-1 text-greenspace-primary" />
                      <p className="text-xs text-gray-500">Horaires</p>
                      <p className="text-sm font-medium">7h00 - 21h30</p>
                    </div>
                    <div className="bg-greenspace-neutral rounded-lg p-3 text-center">
                      <Leaf className="h-5 w-5 mx-auto mb-1 text-greenspace-primary" />
                      <p className="text-xs text-gray-500">Surface</p>
                      <p className="text-sm font-medium">25 hectares</p>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">À propos</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {selectedPark} est l'un des plus beaux parcs de Paris. Créé sous Napoléon III, ce parc offre 
                    des vues magnifiques sur la ville et dispose d'un lac, d'une grotte et de nombreux 
                    aménagements pour la détente et les loisirs.
                  </p>
                  
                  <h3 className="text-lg font-semibold mb-2">Équipements</h3>
                  <div className="grid grid-cols-2 gap-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-greenspace-primary mr-2"></span>
                      Aires de jeux
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-greenspace-primary mr-2"></span>
                      Toilettes
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-greenspace-primary mr-2"></span>
                      Points d'eau
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-greenspace-primary mr-2"></span>
                      Restaurants
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">Biodiversité</h3>
                  <div className="bg-greenspace-neutral/50 rounded-lg p-3 mb-4">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <TreeDeciduous className="h-5 w-5 mr-2 text-greenspace-primary" />
                        <span className="text-sm font-medium">Variété d'arbres</span>
                      </div>
                      <span className="text-sm font-bold">47 espèces</span>
                    </div>
                    <div className="h-2 bg-white rounded-full">
                      <div className="h-2 bg-greenspace-primary rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Diversité supérieure à la moyenne parisienne
                    </p>
                  </div>
                  
                  <Button className="w-full bg-greenspace-primary hover:bg-greenspace-primary/90">
                    Itinéraire vers ce parc
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
