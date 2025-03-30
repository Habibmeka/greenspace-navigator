
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, Droplet, Wind, TreeDeciduous, CloudSun, TrashIcon, Recycle, Home, ShoppingBag } from 'lucide-react';

const EcoTips = () => {
  const ecoTipsCategories = [
    {
      id: 'home',
      name: 'À la maison',
      icon: <Home className="h-5 w-5" />,
      tips: [
        {
          title: "Économiser l'eau",
          description: "Fermez le robinet pendant le brossage des dents. Préférez les douches courtes aux bains. Installez des mousseurs sur vos robinets pour réduire la consommation d'eau.",
          icon: <Droplet className="h-6 w-6" />,
          color: "bg-blue-100 text-blue-700"
        },
        {
          title: "Réduire sa consommation d'énergie",
          description: "Éteignez les lumières en quittant une pièce. Débranchez les appareils en veille. Réglez votre chauffage à 19°C dans les pièces de vie et 17°C dans les chambres.",
          icon: <CloudSun className="h-6 w-6" />,
          color: "bg-yellow-100 text-yellow-700"
        },
        {
          title: "Trier ses déchets",
          description: "Respectez les consignes de tri de votre commune. Compostez vos déchets organiques si vous en avez la possibilité. Limitez les emballages à usage unique.",
          icon: <TrashIcon className="h-6 w-6" />,
          color: "bg-gray-100 text-gray-700"
        }
      ]
    },
    {
      id: 'garden',
      name: 'Jardinage',
      icon: <Leaf className="h-5 w-5" />,
      tips: [
        {
          title: "Composter",
          description: "Transformez vos déchets organiques en compost pour fertiliser naturellement vos plantes. Vous pouvez utiliser un composteur de balcon même en appartement.",
          icon: <Recycle className="h-6 w-6" />,
          color: "bg-green-100 text-green-700"
        },
        {
          title: "Planter des espèces locales",
          description: "Privilégiez des plantes adaptées au climat parisien qui nécessitent moins d'eau et résistent mieux aux conditions locales. Favorisez les plantes mellifères pour attirer les pollinisateurs.",
          icon: <TreeDeciduous className="h-6 w-6" />,
          color: "bg-green-100 text-green-700"
        },
        {
          title: "Économiser l'eau au jardin",
          description: "Récupérez l'eau de pluie pour arroser vos plantes. Arrosez le soir pour limiter l'évaporation. Utilisez du paillage pour maintenir l'humidité du sol.",
          icon: <Droplet className="h-6 w-6" />,
          color: "bg-blue-100 text-blue-700"
        }
      ]
    },
    {
      id: 'mobility',
      name: 'Mobilité',
      icon: <Wind className="h-5 w-5" />,
      tips: [
        {
          title: "Privilégier les mobilités douces",
          description: "Pour les courts trajets, préférez la marche ou le vélo. Paris dispose de nombreuses pistes cyclables et de services de vélos en libre-service.",
          icon: <Wind className="h-6 w-6" />,
          color: "bg-purple-100 text-purple-700"
        },
        {
          title: "Utiliser les transports en commun",
          description: "Le réseau parisien est l'un des plus denses au monde. Métro, bus, tramway, RER sont des alternatives écologiques à la voiture individuelle.",
          icon: <Wind className="h-6 w-6" />,
          color: "bg-purple-100 text-purple-700"
        },
        {
          title: "Pratiquer le covoiturage",
          description: "Pour les trajets qui ne peuvent être réalisés en transport en commun, pensez au covoiturage pour réduire votre empreinte carbone.",
          icon: <Wind className="h-6 w-6" />,
          color: "bg-purple-100 text-purple-700"
        }
      ]
    },
    {
      id: 'consumption',
      name: 'Consommation',
      icon: <ShoppingBag className="h-5 w-5" />,
      tips: [
        {
          title: "Acheter local et de saison",
          description: "Fréquentez les marchés parisiens pour vous approvisionner en produits frais, locaux et de saison. Cela réduit les émissions liées au transport et soutient l'économie locale.",
          icon: <ShoppingBag className="h-6 w-6" />,
          color: "bg-orange-100 text-orange-700"
        },
        {
          title: "Réduire les emballages",
          description: "Utilisez des sacs réutilisables pour vos courses. Privilégiez les produits en vrac et évitez les emballages plastiques à usage unique.",
          icon: <TrashIcon className="h-6 w-6" />,
          color: "bg-gray-100 text-gray-700"
        },
        {
          title: "Donner une seconde vie aux objets",
          description: "Réparez, donnez ou vendez vos objets inutilisés plutôt que de les jeter. De nombreuses ressourceries et ateliers de réparation existent à Paris.",
          icon: <Recycle className="h-6 w-6" />,
          color: "bg-green-100 text-green-700"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="section-container py-8">
        <h1 className="text-3xl font-bold mb-2">Écogestes quotidiens</h1>
        <p className="text-gray-600 mb-8">
          Découvrez comment contribuer à une ville plus verte et durable à travers des gestes simples
        </p>
        
        <Tabs defaultValue="home">
          <TabsList className="mb-8 flex flex-wrap">
            {ecoTipsCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center">
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {ecoTipsCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {category.tips.map((tip, index) => (
                  <Card key={index} className="card-hover overflow-hidden">
                    <div className={`p-4 ${tip.color}`}>
                      <div className="flex items-center mb-2">
                        {tip.icon}
                        <h3 className="ml-2 text-lg font-semibold">{tip.title}</h3>
                      </div>
                      <p className="text-sm">{tip.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Section conseils avancés */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Pour une ville plus verte
          </h2>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Impliquez-vous dans votre quartier</CardTitle>
              <CardDescription>
                Plusieurs initiatives locales permettent de participer à la végétalisation de Paris
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-greenspace-neutral/30 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2 flex items-center">
                    <Leaf className="h-5 w-5 mr-2 text-greenspace-primary" />
                    Permis de végétaliser
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    La Ville de Paris autorise les habitants à jardiner l'espace public 
                    (pieds d'arbres, jardinières, etc.) via un permis gratuit.
                  </p>
                  <a 
                    href="#" 
                    className="text-sm text-greenspace-primary hover:underline"
                  >
                    Comment obtenir un permis de végétaliser ?
                  </a>
                </div>
                
                <div className="bg-greenspace-neutral/30 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2 flex items-center">
                    <TreeDeciduous className="h-5 w-5 mr-2 text-greenspace-primary" />
                    Jardins partagés
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Rejoignez l'un des nombreux jardins partagés de Paris pour cultiver
                    collectivement fruits, légumes et plantes ornementales.
                  </p>
                  <a 
                    href="#" 
                    className="text-sm text-greenspace-primary hover:underline"
                  >
                    Trouver un jardin partagé près de chez vous
                  </a>
                </div>
                
                <div className="bg-greenspace-neutral/30 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2 flex items-center">
                    <Recycle className="h-5 w-5 mr-2 text-greenspace-primary" />
                    Compostage collectif
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Des composteurs collectifs sont installés dans plusieurs quartiers.
                    Vous pouvez y déposer vos déchets organiques.
                  </p>
                  <a 
                    href="#" 
                    className="text-sm text-greenspace-primary hover:underline"
                  >
                    Localiser les points de compostage
                  </a>
                </div>
                
                <div className="bg-greenspace-neutral/30 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2 flex items-center">
                    <CloudSun className="h-5 w-5 mr-2 text-greenspace-primary" />
                    Ateliers et formations
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    La Maison du Jardinage et les associations environnementales
                    proposent régulièrement des ateliers sur le jardinage urbain.
                  </p>
                  <a 
                    href="#" 
                    className="text-sm text-greenspace-primary hover:underline"
                  >
                    Consulter le calendrier des ateliers
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Challenge écologique */}
          <Card className="bg-green-gradient text-white">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Relevez le défi des écogestes !
                  </h2>
                  <p className="mb-6">
                    Participez à notre challenge mensuel et adoptez de nouvelles habitudes
                    écologiques. Chaque mois, un nouveau défi vous est proposé pour réduire
                    votre empreinte environnementale.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-white text-greenspace-primary px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors">
                      Participer au défi
                    </button>
                    <button className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
                      En savoir plus
                    </button>
                  </div>
                </div>
                <div className="hidden md:flex justify-center">
                  <div className="w-64 h-64 bg-white/20 rounded-full flex items-center justify-center animate-float">
                    <Leaf className="w-32 h-32" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EcoTips;
