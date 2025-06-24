
import { useQuery } from '@tanstack/react-query';

interface GreenSpaceRecord {
  record_id: string;
  fields: {
    nom_ev: string;
    type_ev: string;
    adresse_complete: string;
    arrondissement: string;
    surface: number;
    geo_point_2d: {
      lon: number;
      lat: number;
    };
    equipement: string[];
    horaire: string;
  };
}

interface ApiResponse {
  total_count: number;
  results: GreenSpaceRecord[];
}

const fetchParisGreenSpaces = async (): Promise<ApiResponse> => {
  const response = await fetch(
    'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/espaces_verts/records?limit=100&select=nom_ev,type_ev,adresse_complete,arrondissement,surface,geo_point_2d,equipement,horaire'
  );
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des données');
  }
  
  return response.json();
};

export const useParisGreenSpaces = () => {
  return useQuery({
    queryKey: ['paris-green-spaces'],
    queryFn: fetchParisGreenSpaces,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};
