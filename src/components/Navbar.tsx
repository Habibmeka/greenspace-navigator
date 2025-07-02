import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Leaf, MapPin, Wind, TreeDeciduous, CloudSun, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Carte', href: '/map', icon: <MapPin className="w-5 h-5 mr-1" /> },
    { name: 'Qualité de l\'air', href: '/air-quality', icon: <Wind className="w-5 h-5 mr-1" /> },
    { name: 'Biodiversité', href: '/biodiversity', icon: <TreeDeciduous className="w-5 h-5 mr-1" /> },
    { name: 'Écogestes', href: '/eco-tips', icon: <CloudSun className="w-5 h-5 mr-1" /> },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Leaf className="h-8 w-8 text-greenspace-primary" />
              <span className="ml-2 text-xl font-bold text-greenspace-primary">GreenSpace</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-greenspace-primary text-white'
                        : 'text-gray-700 hover:bg-greenspace-light/20 hover:text-greenspace-primary'
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link to="/sign-in">
                <Button variant="outline" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Connexion
                </Button>
              </Link>
              <Link to="/sign-up" className="ml-2">
                <Button className="bg-greenspace-primary hover:bg-greenspace-primary/90">
                  Inscription
                </Button>
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-greenspace-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-greenspace-primary"
            >
              <span className="sr-only">Ouvrir le menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 px-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.href)
                    ? 'bg-greenspace-primary text-white'
                    : 'text-gray-700 hover:bg-greenspace-light/20 hover:text-greenspace-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <User className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-3 space-y-2">
                <Link 
                  to="/sign-in" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-greenspace-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link 
                  to="/sign-up" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-greenspace-primary hover:bg-greenspace-primary/90"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inscription
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
