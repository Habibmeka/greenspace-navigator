
import { useQuery } from '@tanstack/react-query';
import { mockParisGreenSpacesData } from '@/data/mockParisGreenSpaces';

interface GreenSpaceRecord {
  record_id: string;
  fields: {
    nom_ev: string;
    type_ev: string;
    adresse_ev?: string;
    arrondissement: string;
    surface?: number;
    geo_point_2d: {
      lon: number;
      lat: number;
    };
    equipement?: string[];
    horaire?: string;
  };
}

interface ApiResponse {
  total_count: number;
  results: GreenSpaceRecord[];
}

const fetchParisGreenSpaces = async (): Promise<ApiResponse> => {
  console.log('Tentative de récupération des données depuis l\'API Paris...');
  
  try {
    const response = await fetch(
      'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/espaces_verts/records?limit=100&select=nom_ev,type_ev,adresse_ev,arrondissement,surface,geo_point_2d,equipement,horaire'
    );
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Données reçues de l\'API Paris:', data);
    return data;
  } catch (error) {
    console.warn('Impossible de récupérer les données de l\'API Paris, utilisation des données mock:', error);
    // En cas d'erreur CORS ou de réseau, on utilise les données mock
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockParisGreenSpacesData);
      }, 500); // Simulation d'un délai réseau
    });
  }
};

export const useParisGreenSpaces = () => {
  return useQuery({
    queryKey: ['paris-green-spaces'],
    queryFn: fetchParisGreenSpaces,
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: false, // Ne pas réessayer en cas d'erreur CORS
  });
};
