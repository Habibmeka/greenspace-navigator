
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface EcoTipsCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  moreLink?: string;
}

const EcoTipsCard: React.FC<EcoTipsCardProps> = ({ 
  title, 
  description, 
  icon,
  moreLink 
}) => {
  return (
    <Card className="card-hover h-full border-t-4 border-t-greenspace-light">
      <CardHeader className="pb-2">
        <div className="mb-2 flex justify-center">
          <div className="p-2 rounded-full bg-greenspace-light/20 text-greenspace-primary">
            {icon}
          </div>
        </div>
        <CardTitle className="text-center text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center text-sm text-gray-600">
          {description}
        </CardDescription>
      </CardContent>
      {moreLink && (
        <CardFooter className="pt-0 justify-center">
          <Button variant="link" className="text-greenspace-primary p-0" asChild>
            <a href={moreLink} className="flex items-center gap-1">
              En savoir plus <ArrowRight className="h-4 w-4 ml-1" />
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default EcoTipsCard;
