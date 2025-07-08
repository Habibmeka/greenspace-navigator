
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin, TreeDeciduous, Leaf, Droplets, Wind } from 'lucide-react';

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  ecoTip: string;
  icon: React.ReactNode;
}

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: CarouselSlide[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&h=600&q=80",
      title: "Explorez Paris, Naturellement",
      subtitle: "Découvrez la beauté des espaces verts parisiens",
      description: "Plus de 400 parcs et jardins vous attendent dans la capitale",
      ecoTip: "💡 Privilégiez la marche ou le vélo pour explorer les parcs",
      icon: <TreeDeciduous className="h-6 w-6" />
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&h=600&q=80",
      title: "Respirez l'Air Pur",
      subtitle: "Les arbres, nos poumons verts urbains",
      description: "Chaque arbre produit l'oxygène pour 2 personnes par jour",
      ecoTip: "🌱 Plantez des espèces locales adaptées au climat parisien",
      icon: <Leaf className="h-6 w-6" />
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&h=600&q=80",
      title: "Préservons Notre Biodiversité",
      subtitle: "Chaque espèce compte dans l'écosystème urbain",
      description: "Paris abrite plus de 2000 espèces végétales différentes",
      ecoTip: "🦋 Créez des espaces favorables aux pollinisateurs",
      icon: <Wind className="h-6 w-6" />
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1200&h=600&q=80",
      title: "Cultivons Ensemble",
      subtitle: "Jardins partagés et initiatives citoyennes",
      description: "Rejoignez les 100+ jardins partagés de Paris",
      ecoTip: "💧 Récupérez l'eau de pluie pour arroser vos plantes",
      icon: <Droplets className="h-6 w-6" />
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change de slide toutes les 5 secondes

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative overflow-hidden">
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[70vh] min-h-[500px]">
                {/* Image de fond */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>
                
                {/* Contenu */}
                <div className="relative z-10 h-full flex items-center">
                  <div className="section-container w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      <div className="text-white">
                        <div className="flex items-center mb-4">
                          {slide.icon}
                          <span className="ml-2 text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                            Écogeste du jour
                          </span>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                          {slide.title}
                        </h1>
                        
                        <h2 className="text-xl md:text-2xl text-white/90 mb-4 animate-fade-in">
                          {slide.subtitle}
                        </h2>
                        
                        <p className="text-lg text-white/80 mb-6 animate-fade-in">
                          {slide.description}
                        </p>
                        
                        {/* Écogeste */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6 border border-white/20">
                          <p className="text-white font-medium">{slide.ecoTip}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 animate-fade-in">
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
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
      
      {/* Indicateurs de slide */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
      
      {/* Dégradé vers le bas */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroCarousel;
