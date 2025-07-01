import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TreeDeciduous, Info, Leaf, Map, Calendar, AlertTriangle, Recycle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTreeRemovalData } from '@/hooks/useTreeRemovalData';

const Biodiversity = () => {
  const [selectedTree, setSelectedTree] = useState<string | null>(null);
  const { data: treeRemovalData, isLoading: isLoadingTreeRemoval } = useTreeRemovalData();
  
  // Données simulées pour la répartition des espèces
  const speciesData = [
    { name: 'Platane', value: 35 },
    { name: 'Marronnier', value: 25 },
    { name: 'Tilleul', value: 20 },
    { name: 'Érable', value: 10 },
    { name: 'Autres', value: 10 },
  ];
  
  const COLORS = ['#66BB6A', '#43A047', '#2E7D32', '#1B5E20', '#81C784'];
  
  // Données simulées des arbres remarquables
  const remarkableTrees = [
    {
      id: 1,
      name: 'Platane du Luxembourg',
      species: 'Platanus x hispanica',
      age: '~150 ans',
      height: '25 mètres',
      location: 'Jardin du Luxembourg',
      description: 'Ce platane majestueux est l\'un des plus anciens du Jardin du Luxembourg. Ses branches imposantes offrent une ombre généreuse aux visiteurs.',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      name: 'Cèdre du Liban',
      species: 'Cedrus libani',
      age: '~200 ans',
      height: '30 mètres',
      location: 'Jardin des Plantes',
      description: 'Planté au début du 19ème siècle, ce cèdre du Liban est remarquable par sa silhouette étalée caractéristique et sa longévité exceptionnelle.',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      name: 'Ginkgo biloba du Petit Palais',
      species: 'Ginkgo biloba',
      age: '~120 ans',
      height: '22 mètres',
      location: 'Jardin du Petit Palais',
      description: 'Le Ginkgo est une espèce "fossile vivante" qui existe depuis plus de 270 millions d\'années. Cet exemplaire présente un magnifique feuillage doré à l\'automne.',
      image: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?auto=format&fit=crop&w=800&q=80'
    }
  ];
  
  // Projets de plantation
  const plantingProjects = [
    {
      title: 'Forêt urbaine Place de Catalogne',
      description: 'Création d\'une micro-forêt urbaine avec 500 arbres de différentes essences locales.',
      status: 'En cours',
      completion: '75%',
      date: 'Été 2023'
    },
    {
      title: 'Plantation participative Square Boucicaut',
      description: 'Plantation collective de 50 arbres fruitiers avec les habitants du quartier.',
      status: 'Planifié',
      completion: '25%',
      date: 'Automne 2023'
    },
    {
      title: 'Végétalisation des cours d\'écoles',
      description: 'Transformation des cours d\'écoles en îlots de fraîcheur avec plantation d\'arbres.',
      status: 'En cours',
      completion: '60%',
      date: 'Année 2023-2024'
    }
  ];

  // Données des statistiques avec clés uniques
  const biodiversityStats = [
    {
      id: 'trees',
      icon: TreeDeciduous,
      value: '200 000',
      label: 'Arbres d\'alignement'
    },
    {
      id: 'species',
      icon: Leaf,
      value: '150',
      label: 'Espèces différentes'
    },
    {
      id: 'greenspaces',
      icon: Map,
      value: '500',
      label: 'Hectares d\'espaces verts'
    },
    {
      id: 'plantations',
      icon: Calendar,
      value: '10 000',
      label: 'Plantations par an'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="section-container py-8">
        <h1 className="text-3xl font-bold mb-2">Biodiversité à Paris</h1>
        <p className="text-gray-600 mb-6">
          Découvrez la richesse de la flore parisienne et les projets de végétalisation
        </p>
        
        <Tabs defaultValue="trees">
          <TabsList className="mb-6">
            <TabsTrigger value="trees">Arbres remarquables</TabsTrigger>
            <TabsTrigger value="species">Répartition des essences</TabsTrigger>
            <TabsTrigger value="projects">Projets écologiques</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trees">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {remarkableTrees.map((tree) => (
                <Card key={tree.id} className="overflow-hidden card-hover">
                  <div className="aspect-[4/3] relative">
                    <img 
                      src={tree.image} 
                      alt={tree.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4">
                      <h3 className="text-white text-xl font-bold">{tree.name}</h3>
                      <p className="text-white/90 text-sm">{tree.species}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Âge</p>
                        <p className="font-medium">{tree.age}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Hauteur</p>
                        <p className="font-medium">{tree.height}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-gray-500">Localisation</p>
                        <p className="font-medium">{tree.location}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {tree.description.length > 120 
                        ? tree.description.substring(0, 120) + '...' 
                        : tree.description}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setSelectedTree(tree.name)}
                    >
                      En savoir plus
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {/* Afficher plus de cartes */}
              <Card className="flex flex-col items-center justify-center p-6 border-dashed border-2 border-gray-300 card-hover">
                <TreeDeciduous className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Découvrir plus</h3>
                <p className="text-sm text-gray-500 text-center mb-4">
                  Il y a plus de 200 arbres remarquables répertoriés à Paris.
                </p>
                <Button variant="outline">
                  Voir tous les arbres
                </Button>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="species">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Répartition des essences</CardTitle>
                    <Badge variant="outline" className="flex items-center">
                      <Info className="mr-1 h-3 w-3" />
                      Données 2023
                    </Badge>
                  </div>
                  <CardDescription>
                    Principales espèces d'arbres présentes à Paris (en %)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={speciesData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {speciesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      Paris compte environ 200 000 arbres d'alignement et d'ornement, 
                      avec une nette prédominance des platanes, marronniers et tilleuls.
                      La diversification des essences est un enjeu important pour
                      renforcer la résilience face au changement climatique.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>La biodiversité en chiffres</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {biodiversityStats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                          <div key={stat.id} className="flex flex-col items-center p-4 bg-greenspace-neutral/50 rounded-lg">
                            <Icon className="h-8 w-8 text-greenspace-primary mb-2" />
                            <span className="text-3xl font-bold">{stat.value}</span>
                            <span className="text-sm text-gray-600 text-center">{stat.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Évolution du patrimoine arboré</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">2019</span>
                          <span className="text-sm font-medium">195 000 arbres</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-greenspace-light h-2 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">2021</span>
                          <span className="text-sm font-medium">198 000 arbres</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-greenspace-light h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">2023</span>
                          <span className="text-sm font-medium">200 000 arbres</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-greenspace-light h-2 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Objectif 2026</span>
                          <span className="text-sm font-medium">210 000 arbres</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-greenspace-primary h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                      La Ville de Paris s'est engagée à planter 170 000 arbres supplémentaires
                      d'ici 2026, à travers son plan de végétalisation.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="projects">
            {/* Section des données d'abattage d'arbres */}
            <div className="mb-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                        Abattage et remplacement d'arbres
                      </CardTitle>
                      <CardDescription>
                        Arbres abattus pour raisons sanitaires et leurs remplacements
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="flex items-center">
                      <Info className="mr-1 h-3 w-3" />
                      Données en temps réel
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingTreeRemoval ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                      <span className="ml-2 text-gray-600">Chargement des données...</span>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {treeRemovalData?.results?.slice(0, 3).map((record, index) => (
                        <div key={record.record_id} className="border rounded-lg p-4 bg-orange-50">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {record.fields?.essence_a_abattre || 'Essence non précisée'}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {record.fields?.adresse || 'Adresse non disponible'} - {record.fields?.arrondissement || 'N/A'}e arr.
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {record.fields?.nombre_arbres_abattus && (
                                <Badge variant="destructive" className="text-xs">
                                  {record.fields.nombre_arbres_abattus} abattu{record.fields.nombre_arbres_abattus > 1 ? 's' : ''}
                                </Badge>
                              )}
                              {record.fields?.nombre_arbres_replantes && (
                                <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                                  {record.fields.nombre_arbres_replantes} replanté{record.fields.nombre_arbres_replantes > 1 ? 's' : ''}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Motif:</span>
                              <p className="font-medium">{record.fields?.motif_abattage || 'Non précisé'}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Essence de remplacement:</span>
                              <p className="font-medium flex items-center">
                                <Recycle className="h-4 w-4 mr-1 text-green-600" />
                                {record.fields?.essence_de_remplacement || 'Non précisée'}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Date d'abattage:</span>
                              <p className="font-medium">
                                {record.fields?.date_abattage 
                                  ? new Date(record.fields.date_abattage).toLocaleDateString('fr-FR')
                                  : 'Non précisée'}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {treeRemovalData?.results && treeRemovalData.results.length > 3 && (
                        <div className="text-center">
                          <Button variant="outline" className="mt-4">
                            Voir tous les {treeRemovalData.total_count} enregistrements
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Section des projets de plantation existants */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {plantingProjects.map((project, index) => (
                <Card key={index} className="card-hover">
                  <CardHeader className="pb-2">
                    <Badge className={`mb-2 ${
                      project.status === 'En cours' 
                        ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' 
                        : 'bg-green-100 text-green-800 hover:bg-green-100'
                    }`}>
                      {project.status}
                    </Badge>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                    <div className="mb-1 flex justify-between">
                      <span className="text-xs text-gray-500">Avancement</span>
                      <span className="text-xs font-medium">{project.completion}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className="bg-greenspace-primary h-2 rounded-full" 
                        style={{ width: project.completion }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {project.date}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="outline" className="w-full">Détails du projet</Button>
                  </CardFooter>
                </Card>
              ))}
              
              <Card className="bg-green-gradient text-white card-hover">
                <CardContent className="flex flex-col items-center justify-center h-full p-6">
                  <Leaf className="h-16 w-16 mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-center">Contribuer</h3>
                  <p className="text-center mb-6">
                    Participez aux projets de plantation citoyenne et aidez à végétaliser Paris.
                  </p>
                  <Button variant="secondary" className="bg-white text-greenspace-primary hover:bg-white/90">
                    Rejoindre un projet
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Plan de végétalisation de Paris</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Objectifs</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-greenspace-primary mt-1.5 mr-2"></span>
                          Planter 170 000 arbres d'ici 2026
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-greenspace-primary mt-1.5 mr-2"></span>
                          Créer 300 rues végétalisées
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-greenspace-primary mt-1.5 mr-2"></span>
                          Transformer 100 cours d'écoles en "oasis"
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-greenspace-primary mt-1.5 mr-2"></span>
                          Ouvrir 30 nouveaux jardins publics
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-3">Bénéfices</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-greenspace-primary mt-1.5 mr-2"></span>
                          Adaptation au changement climatique
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-greenspace-primary mt-1.5 mr-2"></span>
                          Lutte contre les îlots de chaleur urbains
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-greenspace-primary mt-1.5 mr-2"></span>
                          Amélioration de la qualité de l'air
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-greenspace-primary mt-1.5 mr-2"></span>
                          Renforcement de la biodiversité urbaine
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Biodiversity;
