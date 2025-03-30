
import React from 'react';
import { Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type AirQualityLevel = 'Bon' | 'Moyen' | 'Dégradé' | 'Mauvais' | 'Très mauvais';

interface AirQualityCardProps {
  level: AirQualityLevel;
  index: number;
  pollutant: string;
  description: string;
  compact?: boolean;
}

const AirQualityCard: React.FC<AirQualityCardProps> = ({ 
  level, 
  index, 
  pollutant, 
  description,
  compact = false 
}) => {
  const getColorByLevel = (level: AirQualityLevel) => {
    switch (level) {
      case 'Bon':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Moyen':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Dégradé':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Mauvais':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Très mauvais':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const colorClass = getColorByLevel(level);

  return (
    <Card className={`overflow-hidden card-hover border-2 ${colorClass}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Wind className="mr-2 h-5 w-5" />
            <span>Qualité de l'air</span>
          </div>
          {!compact && (
            <span className={`px-2 py-1 rounded text-sm font-bold`}>
              {level}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <div className="text-3xl font-bold mr-4">{index}</div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold">{level}</span>
            <span className="text-sm text-gray-600">{pollutant}</span>
          </div>
        </div>
        {!compact && <p className="text-sm text-gray-700">{description}</p>}
      </CardContent>
    </Card>
  );
};

export default AirQualityCard;
