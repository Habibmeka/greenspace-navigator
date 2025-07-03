
import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Calendar, Ruler, TreeDeciduous, Info } from 'lucide-react';
import Navbar from '@/components/Navbar';

const TreeDetails = () => {
  const { treeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const tree = location.state?.tree;

  if (!tree) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="section-container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Arbre non trouvé</h1>
            <p className="text-gray-600 mb-6">Impossible de trouver les détails de cet arbre.</p>
            <Button onClick={() => navigate('/biodiversity')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux arbres remarquables
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getTreeImage = (genre?: string) => {
    const treeImages = {
      'Platanus': 'photo-1509316975850-ff9c5deb0cd9',
      'Tilia': 'photo-1513836279014-a89f7a76ae86',
      'Aesculus': 'photo-1518495973542-4542c06a5843',
      'Quercus': 'photo-1472396961693-142e6e269027',
      'Corylus': 'photo-1509316975850-ff9c5deb0cd9',
      'Liriodendron': 'photo-1513836279014-a89f7a76ae86',
      'Celtis': 'photo-1518495973542-4542c06a5843',
      'default': 'photo-1509316975850-ff9c5deb0cd9'
    };
    
    const imageKey = genre && treeImages[genre as keyof typeof treeImages] 
      ? treeImages[genre as keyof typeof treeImages] 
      : treeImages.default;
    
    return `https://images.unsplash.com/${imageKey}?auto=format&fit=crop&w=800&h=600&q=80`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="section-container py-8">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/biodiversity')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux arbres remarquables
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">
            {tree.libellefrancais || 'Arbre remarquable'}
          </h1>
          <p className="text-xl text-gray-600">
            {tree.genre} {tree.espece && `${tree.espece}`}
            {tree.varieteoucultivar && ` - ${tree.varieteoucultivar}`}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image de l'arbre */}
          <div>
            <Card className="overflow-hidden">
              <div className="aspect-[4/3] relative">
                <img 
                  src={getTreeImage(tree.genre)} 
                  alt={tree.libellefrancais || 'Arbre remarquable'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center text-white">
                    <TreeDeciduous className="h-6 w-6 mr-2" />
                    <span className="text-lg font-medium">Arbre remarquable de Paris</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Informations détaillées */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Informations générales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Genre</p>
                    <p className="font-medium">{tree.genre || 'Non précisé'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Espèce</p>
                    <p className="font-medium">{tree.espece || 'Non précisée'}</p>
                  </div>
                </div>
                
                {tree.varieteoucultivar && (
                  <div>
                    <p className="text-sm text-gray-500">Variété ou cultivar</p>
                    <p className="font-medium">{tree.varieteoucultivar}</p>
                  </div>
                )}

                {tree.stadedeveloppement && (
                  <div>
                    <p className="text-sm text-gray-500">Stade de développement</p>
                    <Badge variant="outline" className="mt-1">
                      {tree.stadedeveloppement}
                    </Badge>
                  </div>
                )}

                {tree.remarquable && (
                  <div>
                    <p className="text-sm text-gray-500">Caractère remarquable</p>
                    <p className="font-medium">{tree.remarquable}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Ruler className="h-5 w-5 mr-2" />
                  Dimensions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Circonférence</p>
                    <p className="text-2xl font-bold text-green-600">
                      {tree.circonferenceencm ? `${tree.circonferenceencm} cm` : 'N/A'}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Hauteur</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {tree.hauteurenm ? `${tree.hauteurenm} m` : 'N/A'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Localisation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Adresse</p>
                  <p className="font-medium">{tree.adresse || 'Non disponible'}</p>
                </div>
                
                {tree.arrondissement && (
                  <div>
                    <p className="text-sm text-gray-500">Arrondissement</p>
                    <p className="font-medium">{tree.arrondissement}</p>
                  </div>
                )}

                {tree.complementadresse && (
                  <div>
                    <p className="text-sm text-gray-500">Complément d'adresse</p>
                    <p className="font-medium">{tree.complementadresse}</p>
                  </div>
                )}

                {tree.numero && (
                  <div>
                    <p className="text-sm text-gray-500">Numéro</p>
                    <p className="font-medium">{tree.numero}</p>
                  </div>
                )}

                {tree.typeemplacement && (
                  <div>
                    <p className="text-sm text-gray-500">Type d'emplacement</p>
                    <Badge variant="secondary">{tree.typeemplacement}</Badge>
                  </div>
                )}

                {tree.domanialite && (
                  <div>
                    <p className="text-sm text-gray-500">Domanialité</p>
                    <p className="font-medium">{tree.domanialite}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {tree.dateplantation && tree.dateplantation !== '1700-01-01T00:09:21+00:00' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Historique
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-sm text-gray-500">Date de plantation</p>
                    <p className="font-medium">
                      {new Date(tree.dateplantation).toLocaleDateString('fr-FR')}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Âge approximatif: {new Date().getFullYear() - new Date(tree.dateplantation).getFullYear()} ans
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Coordonnées GPS si disponibles */}
        {tree.geo_point_2d && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Coordonnées GPS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Latitude</p>
                    <p className="font-medium font-mono">{tree.geo_point_2d.lat}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Longitude</p>
                    <p className="font-medium font-mono">{tree.geo_point_2d.lon}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => window.open(`https://www.google.com/maps?q=${tree.geo_point_2d.lat},${tree.geo_point_2d.lon}`, '_blank')}
                >
                  Voir sur Google Maps
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeDetails;
