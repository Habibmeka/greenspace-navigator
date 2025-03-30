
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Leaf, TreeDeciduous, CloudSun } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import AirQualityCard from '@/components/AirQualityCard';
import EcoTipsCard from '@/components/EcoTipsCard';
import MapPreview from '@/components/MapPreview';

const Index = () => {
  // Données simulées pour les écogestes
  const ecoTips = [
    {
      title: "Économiser l'eau",
      description: "Fermez le robinet pendant le brossage des dents et privilégiez les douches courtes.",
      icon: <CloudSun className="h-6 w-6" />,
      moreLink: "/eco-tips#water"
    },
    {
      title: "Composter",
      description: "Transformez vos déchets organiques en ressource pour vos plantes.",
      icon: <Leaf className="h-6 w-6" />,
      moreLink: "/eco-tips#compost"
    },
    {
      title: "Planter local",
      description: "Choisissez des espèces adaptées au climat parisien pour votre balcon ou jardin.",
      icon: <TreeDeciduous className="h-6 w-6" />,
      moreLink: "/eco-tips#plants"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-greenspace-primary to-greenspace-light text-white py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Explorez Paris, <br />Naturellement
              </h1>
              <p className="text-lg text-white/90 mb-6">
                Découvrez les espaces verts parisiens, suivez la qualité de l'air
                et adoptez des gestes écologiques pour une ville plus durable.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/map">
                  <Button size="lg" className="bg-white text-greenspace-primary hover:bg-white/90">
                    <MapPin className="mr-2 h-5 w-5" />
                    Explorer la carte
                  </Button>
                </Link>
                <Link to="/biodiversity">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                    <TreeDeciduous className="mr-2 h-5 w-5" />
                    Découvrir la biodiversité
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&h=600&q=80" 
                alt="Parc à Paris" 
                className="rounded-lg shadow-lg max-w-full"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Map Preview Section */}
      <section className="py-12 bg-white">
        <div className="section-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Trouvez votre espace vert idéal
          </h2>
          <MapPreview />
        </div>
      </section>

      {/* Air Quality Section */}
      <section className="py-12 bg-greenspace-neutral">
        <div className="section-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Aujourd'hui à Paris
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <AirQualityCard 
                level="Bon" 
                index={3} 
                pollutant="Principalement NO₂"
                description="La qualité de l'air est bonne aujourd'hui à Paris. Idéal pour les activités extérieures."
              />
            </div>
            <Card className="overflow-hidden card-hover">
              <CardContent className="p-0">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Météo</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CloudSun className="h-10 w-10 text-greenspace-primary mr-3" />
                      <div>
                        <p className="text-2xl font-bold">21°C</p>
                        <p className="text-sm text-gray-600">Partiellement nuageux</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">Humidité: 65%</p>
                      <p className="text-sm">Vent: 10 km/h</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 p-4 bg-greenspace-neutral">
                  <p className="text-sm">Conditions idéales pour visiter les parcs et jardins.</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 text-center">
            <Link to="/air-quality">
              <Button variant="outline" className="bg-white">
                Consulter les données complètes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Eco Tips Section */}
      <section className="py-12 bg-white">
        <div className="section-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Découvrez nos écogestes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ecoTips.map((tip, index) => (
              <EcoTipsCard
                key={index}
                title={tip.title}
                description={tip.description}
                icon={tip.icon}
                moreLink={tip.moreLink}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/eco-tips">
              <Button className="bg-greenspace-primary hover:bg-greenspace-primary/90">
                Tous les écogestes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-12 bg-greenspace-accent/20">
        <div className="section-container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Rejoignez la communauté GreenSpace
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Créez un compte pour contribuer à nos données, partager vos découvertes
            et participer à des initiatives vertes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/sign-up">
              <Button size="lg" className="bg-greenspace-primary hover:bg-greenspace-primary/90">
                S'inscrire gratuitement
              </Button>
            </Link>
            <Link to="/sign-in">
              <Button size="lg" variant="outline">
                Se connecter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-greenspace-primary text-white py-8">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">GreenSpace</h3>
              <div className="flex items-center">
                <Leaf className="h-6 w-6 mr-2" />
                <span className="font-bold">GreenSpace</span>
              </div>
              <p className="mt-2 text-sm text-white/80">
                Votre guide des espaces verts à Paris.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:underline">Accueil</Link></li>
                <li><Link to="/map" className="hover:underline">Carte</Link></li>
                <li><Link to="/air-quality" className="hover:underline">Qualité de l'air</Link></li>
                <li><Link to="/biodiversity" className="hover:underline">Biodiversité</Link></li>
                <li><Link to="/eco-tips" className="hover:underline">Écogestes</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Compte</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/sign-in" className="hover:underline">Connexion</Link></li>
                <li><Link to="/sign-up" className="hover:underline">Inscription</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Légal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Conditions d'utilisation</a></li>
                <li><a href="#" className="hover:underline">Politique de confidentialité</a></li>
                <li><a href="#" className="hover:underline">Mentions légales</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm text-white/70">
            <p>© {new Date().getFullYear()} GreenSpace. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
