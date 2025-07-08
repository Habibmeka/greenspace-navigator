
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TreePine, Leaf, MapPin, Calendar, Ruler, Info } from 'lucide-react';
import { useTreeRemovalData } from '@/hooks/useTreeRemovalData';
import { useRemarkableTreesData } from '@/hooks/useRemarkableTreesData';
import { useNavigate } from 'react-router-dom';

const Biodiversity = () => {
  const { data: treeRemovalData, isLoading: isLoadingRemoval } = useTreeRemovalData();
  const { data: remarkableTreesData, isLoading: isLoadingTrees } = useRemarkableTreesData(50);
  const navigate = useNavigate();

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'Date inconnue';
    const date = new Date(dateString);
    return `${date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}`;
  };

  const formatAddress = (tree: any): string => {
    let address = tree.adresse ? tree.adresse : 'Adresse non disponible';
    if (tree.complementadresse) {
      address += `, ${tree.complementadresse}`;
    }
    if (tree.arrondissement) {
      address += ` - ${tree.arrondissement}ème`;
    }
    return address;
  };

  const handleLearnMore = (treeId: string) => {
    navigate(`/tree-details/${treeId}`);
  };

  // Fonction pour obtenir une image d'arbre basée sur le genre
  const getTreeImage = (genre?: string) => {
    const treeImages: { [key: string]: string } = {
      'platanus': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'tilia': 'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'aesculus': 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'acer': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'quercus': 'https://images.unsplash.com/photo-1459664018906-085c36f472af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'default': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    };
    
    if (!genre) return treeImages.default;
    const genreKey = Object.keys(treeImages).find(key => 
      genre.toLowerCase().includes(key.toLowerCase())
    );
    return treeImages[genreKey || 'default'];
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-greenspace-primary mb-4">
            Biodiversité Parisienne
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez la richesse de la biodiversité urbaine de Paris à travers nos espaces verts, 
            arbres remarquables et initiatives de préservation de l'environnement.
          </p>
        </div>

        <Tabs defaultValue="trees" className="space-y-8">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="trees">Arbres Remarquables</TabsTrigger>
            <TabsTrigger value="removal">Abattages</TabsTrigger>
            <TabsTrigger value="species">Espèces</TabsTrigger>
          </TabsList>

          <TabsContent value="trees" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-greenspace-primary mb-2">
                Arbres Remarquables de Paris
              </h2>
              <p className="text-gray-600">
                Découvrez les arbres exceptionnels qui font la richesse du patrimoine végétal parisien
              </p>
            </div>

            {isLoadingTrees ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remarkableTreesData?.results?.slice(0, 12).map((tree) => (
                  <Card key={tree.idbase} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={getTreeImage(tree.genre)} 
                        alt={tree.libellefrancais || 'Arbre remarquable'}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-white/90 text-green-700">
                          {tree.libellefrancais || tree.genre || 'Arbre'}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 text-green-800">
                        {tree.genre && tree.espece ? `${tree.genre} ${tree.espece}` : (tree.genre || 'Arbre remarquable')}
                      </h3>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        {tree.circonferenceencm && (
                          <div className="flex items-center">
                            <Ruler className="h-4 w-4 mr-2 text-green-600" />
                            <span>Circonférence: {tree.circonferenceencm} cm</span>
                          </div>
                        )}
                        
                        {tree.hauteurenm && (
                          <div className="flex items-center">
                            <TreePine className="h-4 w-4 mr-2 text-green-600" />
                            <span>Hauteur: {tree.hauteurenm} m</span>
                          </div>
                        )}
                        
                        {tree.adresse && (
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-green-600" />
                            <span className="truncate">
                              {tree.adresse}
                              {tree.arrondissement && ` - ${tree.arrondissement}ème`}
                            </span>
                          </div>
                        )}
                        
                        {tree.stadedeveloppement && (
                          <div className="flex items-center">
                            <Leaf className="h-4 w-4 mr-2 text-green-600" />
                            <span>Stade: {tree.stadedeveloppement}</span>
                          </div>
                        )}
                        
                        {tree.dateplantation && tree.dateplantation !== '1900-01-01' && (
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-green-600" />
                            <span>Planté en: {new Date(tree.dateplantation).getFullYear()}</span>
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        className="w-full bg-greenspace-primary hover:bg-greenspace-primary/90"
                        onClick={() => handleLearnMore(tree.idbase || 'unknown')}
                      >
                        <Info className="h-4 w-4 mr-2" />
                        En savoir plus
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="removal" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-red-600 mb-2">
                Suivi des Abattages d'Arbres
              </h2>
              <p className="text-gray-600">
                Restez informé des abattages d'arbres à Paris et des efforts de compensation.
              </p>
            </div>
            
            {isLoadingRemoval ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {treeRemovalData?.results?.slice(0, 12).map((removal) => (
                  <Card key={removal.record_id || removal.idbase} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 text-red-700">
                        {removal.libellefrancais || 'Arbre abattu'}
                      </h3>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        {removal.adresse && (
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-red-600" />
                            <span className="truncate">
                              {removal.adresse}
                              {removal.arrondissement && ` - ${removal.arrondissement}ème`}
                            </span>
                          </div>
                        )}
                        
                        {removal.fields?.date_abattage && (
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-red-600" />
                            <span>Abattu le: {formatDate(removal.fields.date_abattage)}</span>
                          </div>
                        )}
                        
                        {removal.motifabattage && (
                          <div className="flex items-start">
                            <Info className="h-4 w-4 mr-2 text-red-600" />
                            <span>Cause: {removal.motifabattage}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="species">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-greenspace-primary mb-4">
                Diversité des Espèces
              </h2>
              <p className="text-gray-600">
                Explorez la variété des espèces végétales présentes dans les espaces verts de Paris.
              </p>
            </div>
            <div className="mt-4">
              <p className="text-gray-700">
                Cette section est en cours de développement. Revenez bientôt pour découvrir une analyse
                détaillée de la diversité des espèces végétales à Paris.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Biodiversity;
