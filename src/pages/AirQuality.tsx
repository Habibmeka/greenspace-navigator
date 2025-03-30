
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Wind, Info, AlertTriangle, CloudRain, Bell } from 'lucide-react';
import AirQualityCard from '@/components/AirQualityCard';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const AirQuality = () => {
  // Données simulées pour le graphique
  const gasEmissionsData = [
    { year: '2017', CO2: 250, NOx: 150, PM10: 80 },
    { year: '2018', CO2: 230, NOx: 140, PM10: 70 },
    { year: '2019', CO2: 220, NOx: 130, PM10: 60 },
    { year: '2020', CO2: 180, NOx: 100, PM10: 45 },
    { year: '2021', CO2: 200, NOx: 110, PM10: 50 },
    { year: '2022', CO2: 190, NOx: 105, PM10: 48 },
    { year: '2023', CO2: 185, NOx: 100, PM10: 45 },
  ];

  // Données pour les prévisions
  const forecastData = [
    { day: 'Aujourd\'hui', index: 3, level: 'Bon', pollutant: 'NO₂' },
    { day: 'Demain', index: 4, level: 'Bon', pollutant: 'O₃' },
    { day: 'Après-demain', index: 5, level: 'Moyen', pollutant: 'PM2.5' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="section-container py-8">
        <h1 className="text-3xl font-bold mb-2">Qualité de l'air à Paris</h1>
        <p className="text-gray-600 mb-6">
          Suivez l'indice ATMO et les principaux polluants en temps réel
        </p>
        
        {/* Alerte pollution (conditionnelle, je l'ajoute pour la démo) */}
        <Alert className="mb-6 border-yellow-300 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-600">Information pollution</AlertTitle>
          <AlertDescription>
            Épisode de pollution à l'ozone prévu demain en raison des températures élevées. 
            Il est recommandé de limiter les activités physiques intenses en extérieur.
          </AlertDescription>
        </Alert>
        
        {/* Indice ATMO du jour */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <AirQualityCard 
              level="Bon" 
              index={3} 
              pollutant="Principalement NO₂"
              description="La qualité de l'air est bonne aujourd'hui à Paris. Les niveaux de pollution sont faibles et ne présentent pas de risque particulier pour la santé. C'est un bon jour pour les activités en extérieur."
            />
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                <div className="flex items-center">
                  <CloudRain className="mr-2 h-5 w-5 text-greenspace-primary" />
                  <span>Conditions météo</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Température</span>
                  <span className="font-medium">21°C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Humidité</span>
                  <span className="font-medium">65%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Vent</span>
                  <span className="font-medium">10 km/h Nord-Est</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pression</span>
                  <span className="font-medium">1014 hPa</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Conditions favorables à la dispersion des polluants.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Prévisions */}
        <h2 className="text-2xl font-semibold mb-4">Prévisions qualité de l'air</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {forecastData.map((item, index) => (
            <AirQualityCard
              key={index}
              level={item.level as any}
              index={item.index}
              pollutant={item.pollutant}
              description=""
              compact={true}
            />
          ))}
        </div>
        
        {/* Graphiques et données */}
        <Tabs defaultValue="emissions">
          <TabsList className="mb-4">
            <TabsTrigger value="emissions">Émissions de GES</TabsTrigger>
            <TabsTrigger value="pollutants">Polluants</TabsTrigger>
            <TabsTrigger value="data">Données brutes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="emissions">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Évolution des émissions</CardTitle>
                  <Badge variant="outline" className="flex items-center">
                    <Info className="mr-1 h-3 w-3" />
                    Données 2017-2023
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={gasEmissionsData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="CO2" stroke="#2E7D32" name="CO₂ (kt)" strokeWidth={2} />
                      <Line type="monotone" dataKey="NOx" stroke="#F57C00" name="NOx (t)" strokeWidth={2} />
                      <Line type="monotone" dataKey="PM10" stroke="#D32F2F" name="PM10 (t)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    On observe une tendance générale à la baisse des émissions de gaz à effet de serre
                    sur la période 2017-2023, avec une diminution notable en 2020 liée aux restrictions
                    de déplacement.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pollutants">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dioxyde d'azote (NO₂)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <span className="text-2xl font-bold text-green-600">25</span>
                    </div>
                    <div>
                      <p className="font-medium">25 µg/m³</p>
                      <p className="text-xs text-gray-500">Valeur moyenne journalière</p>
                      <p className="text-xs text-green-600 mt-1">Inférieur au seuil réglementaire</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Le NO₂ est principalement émis par les véhicules (surtout diesel)
                    et les installations de combustion.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Particules fines (PM10)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <span className="text-2xl font-bold text-green-600">18</span>
                    </div>
                    <div>
                      <p className="font-medium">18 µg/m³</p>
                      <p className="text-xs text-gray-500">Valeur moyenne journalière</p>
                      <p className="text-xs text-green-600 mt-1">Inférieur au seuil réglementaire</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Les PM10 sont des particules en suspension d'un diamètre inférieur
                    à 10 micromètres, issues principalement du trafic routier et du chauffage.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ozone (O₃)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                      <span className="text-2xl font-bold text-yellow-600">110</span>
                    </div>
                    <div>
                      <p className="font-medium">110 µg/m³</p>
                      <p className="text-xs text-gray-500">Valeur maximale horaire</p>
                      <p className="text-xs text-yellow-600 mt-1">Proche du seuil d'information</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    L'ozone est un polluant secondaire qui se forme sous l'effet du rayonnement
                    solaire à partir d'autres polluants.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Particules fines (PM2.5)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <span className="text-2xl font-bold text-green-600">9</span>
                    </div>
                    <div>
                      <p className="font-medium">9 µg/m³</p>
                      <p className="text-xs text-gray-500">Valeur moyenne journalière</p>
                      <p className="text-xs text-green-600 mt-1">Inférieur au seuil réglementaire</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Les PM2.5 sont des particules très fines, particulièrement dangereuses
                    car elles pénètrent profondément dans les poumons.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="data">
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Station
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          NO₂ (µg/m³)
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          PM10 (µg/m³)
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          PM2.5 (µg/m³)
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          O₃ (µg/m³)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Paris Centre
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">28</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">21</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">98</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Paris Est
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">25</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">19</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">9</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">104</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Paris Ouest
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">22</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">17</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">110</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Paris Sud
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">24</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">9</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">106</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Paris Nord
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">27</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">102</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Dernière mise à jour: {new Date().toLocaleString('fr-FR')}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Section informative */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-greenspace-primary" />
                S'informer et agir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Comprendre l'indice ATMO</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    L'indice ATMO est un indicateur journalier de la qualité de l'air, 
                    calculé à partir des concentrations de 4 polluants : NO₂, O₃, PM10 et SO₂.
                    Il est exprimé sur une échelle de 1 (très bon) à 6 (très mauvais).
                  </p>
                  <div className="flex items-center space-x-1 mb-1">
                    <span className="w-8 h-4 bg-green-500 rounded-l-full"></span>
                    <span className="w-8 h-4 bg-green-300"></span>
                    <span className="w-8 h-4 bg-yellow-300"></span>
                    <span className="w-8 h-4 bg-orange-400"></span>
                    <span className="w-8 h-4 bg-red-500"></span>
                    <span className="w-8 h-4 bg-purple-600 rounded-r-full"></span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Bon</span>
                    <span>Très mauvais</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">En cas de pic de pollution</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-greenspace-primary mt-1.5 mr-2"></span>
                      Limitez les sorties durant l'après-midi
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-greenspace-primary mt-1.5 mr-2"></span>
                      Réduisez les activités physiques et sportives intenses
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-greenspace-primary mt-1.5 mr-2"></span>
                      Privilégiez les transports en commun
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-greenspace-primary mt-1.5 mr-2"></span>
                      En cas de gêne respiratoire, prenez conseil auprès d'un médecin
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AirQuality;
