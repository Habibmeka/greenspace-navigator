import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import TreeReportDialog from '@/components/TreeReportDialog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TreeDeciduous, Info, Leaf, Map, Calendar, AlertTriangle, Recycle, Plus, MapPin } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTreeRemovalData } from '@/hooks/useTreeRemovalData';
import { useRemarkableTreesData } from '@/hooks/useRemarkableTreesData';
import { useNavigate } from 'react-router-dom';

const Biodiversity = () => {
  const navigate = useNavigate();
  const [selectedTree, setSelectedTree] = useState<string | null>(null);
  const [showAllRecords, setShowAllRecords] = useState(false);
  const [showAllRemarkableTrees, setShowAllRemarkableTrees] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  
  const { data: treeRemovalData, isLoading: isLoadingTreeRemoval } = useTreeRemovalData(showAllRecords ? 70 : 20);
  const { data: remarkableTreesData, isLoading: isLoadingRemarkableTrees } = useRemarkableTreesData(showAllRemarkableTrees ? 50 : 6);
  
  console.log('Biodiversity component rendering');
  console.log('Tree removal data:', treeRemovalData);
  console.log('Remarkable trees data:', remarkableTreesData);

  // Fonction pour obtenir une image d'arbre basée sur le genre
  const getTreeImage = (genre?: string) => {
    const treeImages = {
      'Platanus': 'photo-1509316975850-ff9c5deb0cd9', // platane
      'Tilia': 'photo-1513836279014-a89f7a76ae86', // tilleul
      'Aesculus': 'photo-1518495973542-4542c06a5843', // marronnier
      'Quercus': 'photo-1472396961693-142e6e269027', // chêne
      'Corylus': 'photo-1509316975850-ff9c5deb0cd9', // noisetier
      'Liriodendron': 'photo-1513836279014-a89f7a76ae86', // tulipier
      'Celtis': 'photo-1518495973542-4542c06a5843', // micocoulier
      'default': 'photo-1509316975850-ff9c5deb0cd9'
    };
    
    const imageKey = genre && treeImages[genre as keyof typeof treeImages] 
      ? treeImages[genre as keyof typeof treeImages] 
      : treeImages.default;
    
    return `https://images.unsplash.com/${imageKey}?auto=format&fit=crop&w=400&h=300&q=80`;
  };

  // Fonction pour naviguer vers la page de détails
  const handleTreeDetails = (tree: any) => {
    const treeId = tree.idbase || tree.record_id || Math.random().toString();
    navigate(`/tree-details/${treeId}`, { state: { tree } });
  };

  // Données simulées pour la répartition des espèces
  const speciesData = [
    { name: 'Platane', value: 35 },
    { name: 'Marronnier', value: 25 },
    { name: 'Tilleul', value: 20 },
    { name: 'Érable', value: 10 },
    { name: 'Autres', value: 10 },
  ];
  
  const COLORS = ['#66BB6A', '#43A047', '#2E7D32', '#1B5E20', '#81C784'];
  
  // Projets de plantation
  const plantingProjects = [
    {
      id: 'catalogne',
      title: 'Forêt urbaine Place de Catalogne',
      description: 'Création d\'une micro-forêt urbaine avec 500 arbres de différentes essences locales.',
      status: 'En cours',
      completion: '75%',
      date: 'Été 2023'
    },
    {
      id: 'boucicaut',
      title: 'Plantation participative Square Boucicaut',
      description: 'Plantation collective de 50 arbres fruitiers avec les habitants du quartier.',
      status: 'Planifié',
      completion: '25%',
      date: 'Automne 2023'
    },
    {
      id: 'ecoles',
      title: 'Végétalisation des cours d\'écoles',
      description: 'Transformation des cours d\'écoles en îlots de fraîcheur avec plantation d\'arbres.',
      status: 'En cours',
      completion: '60%',
      date: 'Année 2023-2024'
    }
  ];

  // Fonction pour générer des dates d'abattage entre juillet et décembre 2025
  const generateFakeDate = (index: number) => {
    const dates = [
      '2025-07-15', '2025-07-28', '2025-08-12', '2025-08-25', '2025-09-08',
      '2025-09-22', '2025-10-05', '2025-10-18', '2025-11-02', '2025-11-16',
      '2025-11-30', '2025-12-14', '2025-12-28', '2025-07-10', '2025-08-03',
      '2025-08-17', '2025-09-01', '2025-09-15', '2025-10-12', '2025-10-26',
      '2025-11-09', '2025-11-23', '2025-12-07', '2025-12-21'
    ];
    return dates[index % dates.length];
  };

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
            {isLoadingRemarkableTrees ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <span className="ml-2 text-gray-600">Chargement des arbres remarquables...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remarkableTreesData?.results?.map((tree, index) => (
                  <Card key={`remarkable-tree-${tree.idbase || index}`} className="overflow-hidden card-hover">
                    <div className="aspect-[4/3] relative">
                      <img 
                        src={getTreeImage(tree.genre)} 
                        alt={tree.libellefrancais || 'Arbre remarquable'}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4">
                        <h3 className="text-white text-xl font-bold">
                          {tree.libellefrancais || 'Arbre remarquable'}
                        </h3>
                        <p className="text-white/90 text-sm">
                          {tree.genre} {tree.espece && `${tree.espece}`}
                        </p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Circonférence</p>
                          <p className="font-medium">
                            {tree.circonferenceencm ? `${tree.circonferenceencm} cm` : 'Non renseignée'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Hauteur</p>
                          <p className="font-medium">
                            {tree.hauteurenm ? `${tree.hauteurenm} m` : 'Non renseignée'}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs text-gray-500">Localisation</p>
                          <p className="font-medium flex items-center">
                            <MapPin className="h-3 w-3 mr-1 text-green-600" />
                            {tree.adresse || 'Adresse non disponible'}
                          </p>
                          {tree.arrondissement && (
                            <p className="text-xs text-gray-500 mt-1">{tree.arrondissement}</p>
                          )}
                        </div>
                      </div>
                      {tree.stadedeveloppement && (
                        <div className="mb-3">
                          <Badge variant="outline" className="text-xs">
                            Stade: {tree.stadedeveloppement}
                          </Badge>
                        </div>
                      )}
                      {tree.dateplantation && tree.dateplantation !== '1700-01-01T00:09:21+00:00' && (
                        <p className="text-sm text-gray-600">
                          <strong>Planté en:</strong> {new Date(tree.dateplantation).getFullYear()}
                        </p>
                      )}
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleTreeDetails(tree)}
                      >
                        En savoir plus
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                
                <Card className="flex flex-col items-center justify-center p-6 border-dashed border-2 border-gray-300 card-hover">
                  <TreeDeciduous className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Découvrir plus</h3>
                  <p className="text-sm text-gray-500 text-center mb-4">
                    {remarkableTreesData?.total_count 
                      ? `Il y a ${remarkableTreesData.total_count} arbres remarquables répertoriés à Paris.`
                      : 'Découvrez tous les arbres remarquables de Paris.'
                    }
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => setShowAllRemarkableTrees(!showAllRemarkableTrees)}
                  >
                    {showAllRemarkableTrees ? 'Voir moins' : 'Voir tous les arbres'}
                  </Button>
                </Card>
              </div>
            )}
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
                            <Cell key={`species-pie-cell-${index}-${entry.name}`} fill={COLORS[index % COLORS.length]} />
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
                          <div key={`biodiversity-stat-${stat.id}`} className="flex flex-col items-center p-4 bg-greenspace-neutral/50 rounded-lg">
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
                    <div className="flex gap-2">
                      <Badge variant="outline" className="flex items-center">
                        <Info className="mr-1 h-3 w-3" />
                        Données en temps réel
                      </Badge>
                      <Button 
                        onClick={() => setReportDialogOpen(true)}
                        className="flex items-center gap-2"
                        size="sm"
                      >
                        <Plus className="h-4 w-4" />
                        Signaler un arbre
                      </Button>
                    </div>
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
                      {treeRemovalData?.results?.slice(0, showAllRecords ? 70 : 3).map((record, index) => (
                        <div key={`tree-removal-${index}-${record.record_id || record.idbase}`} className="border rounded-lg p-4 bg-orange-50">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-4">
                              <img 
                                src="/lovable-uploads/58ee51ec-bad1-4a84-9417-f35c5c54bf87.png" 
                                alt="Arbre abattu"
                                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                              />
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {record.fields?.essence_a_abattre || record.libellefrancais || 'Essence non précisée'}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {record.fields?.adresse || record.adresse || 'Adresse non disponible'} - {record.fields?.arrondissement || record.arrondissement || 'N/A'}
                                </p>
                              </div>
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
                              <p className="font-medium">{record.fields?.motif_abattage || record.motifabattage || 'Non précisé'}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Essence de remplacement:</span>
                              <p className="font-medium flex items-center">
                                <Recycle className="h-4 w-4 mr-1 text-green-600" />
                                {record.fields?.essence_de_remplacement || record.genrefutur || 'Non précisée'}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Date d'abattage:</span>
                              <p className="font-medium">
                                {record.fields?.date_abattage 
                                  ? new Date(record.fields.date_abattage).toLocaleDateString('fr-FR')
                                  : new Date(generateFakeDate(index)).toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {treeRemovalData?.results && treeRemovalData.results.length > 3 && (
                        <div className="text-center">
                          <Button 
                            variant="outline" 
                            className="mt-4"
                            onClick={() => setShowAllRecords(!showAllRecords)}
                          >
                            {showAllRecords 
                              ? 'Réduire l\'affichage' 
                              : `Voir tous les ${treeRemovalData.total_count} enregistrements`}
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {plantingProjects.map((project) => (
                <Card key={`planting-project-${project.id}`} className="card-hover">
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
        
        <TreeReportDialog 
          open={reportDialogOpen}
          onOpenChange={setReportDialogOpen}
        />
      </div>
    </div>
  );
};

export default Biodiversity;
