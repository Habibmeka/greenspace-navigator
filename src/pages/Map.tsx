import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import InteractiveMap from '@/components/InteractiveMap';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

const Map = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);

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
        
        {/* Carte interactive avec données réelles */}
        <div className="pt-20">
          <InteractiveMap />
        </div>
      </div>
    </div>
  );
};

export default Map;
