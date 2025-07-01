
import { useQuery } from '@tanstack/react-query';

interface TreeRemovalRecord {
  record_id: string;
  fields: {
    arrondissement?: string;
    adresse?: string;
    essence_a_abattre?: string;
    essence_de_remplacement?: string;
    motif_abattage?: string;
    date_abattage?: string;
    nombre_arbres_abattus?: number;
    nombre_arbres_replantes?: number;
    geo_point_2d?: {
      lon: number;
      lat: number;
    };
  };
}

interface ApiResponse {
  total_count: number;
  results: TreeRemovalRecord[];
}

const fetchTreeRemovalData = async (): Promise<ApiResponse> => {
  console.log('Récupération des données des arbres à abattre...');
  
  const response = await fetch(
    'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/arbres-a-abattre-pour-raison-sanitaires-et-essence-de-remplacement/records?limit=20'
  );
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des données');
  }
  
  return response.json();
};

export const useTreeRemovalData = () => {
  return useQuery({
    queryKey: ['tree-removal-data'],
    queryFn: fetchTreeRemovalData,
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
  });
};
