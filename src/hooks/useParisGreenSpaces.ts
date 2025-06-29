
import { useQuery } from '@tanstack/react-query';
import { mockParisGreenSpacesData } from '@/data/mockParisGreenSpaces';

interface GreenSpaceRecord {
  record_id: string;
  fields: {
    nom_ev: string;
    type_ev: string;
    adresse_ev?: string;
    arrondissement: string;
    surface_totale_reelle?: number;
    geo_point_2d: {
      lon: number;
      lat: number;
    };
    equipement?: string[];
    horaire_ouverture?: string;
  };
}

interface ApiResponse {
  total_count: number;
  results: GreenSpaceRecord[];
}

const fetchParisGreenSpaces = async (): Promise<ApiResponse> => {
  console.log('Tentative de récupération des données depuis l\'API Paris...');
  
  try {
    // Essai avec les champs de base les plus simples
    const response = await fetch(
      'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/espaces_verts/records?limit=100'
    );
    
    if (!response.ok) {
      console.log('API Paris non disponible, utilisation des données mock');
      return mockParisGreenSpacesData;
    }
    
    const data = await response.json();
    console.log('Données reçues de l\'API Paris:', data);
    return data;
  } catch (error) {
    console.log('Erreur lors de l\'appel API, utilisation des données mock:', error);
    return mockParisGreenSpacesData;
  }
};

export const useParisGreenSpaces = () => {
  return useQuery({
    queryKey: ['paris-green-spaces'],
    queryFn: fetchParisGreenSpaces,
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: 0, // Pas de retry, fallback direct vers mock
  });
};
