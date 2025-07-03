
import { useQuery } from '@tanstack/react-query';

interface RemarkableTreeRecord {
  idbase?: string;
  genre?: string;
  espece?: string;
  varieteoucultivar?: string;
  libellefrancais?: string;
  circonferenceencm?: number;
  hauteurenm?: number;
  stadedeveloppement?: string;
  remarquable?: string;
  adresse?: string;
  arrondissement?: string;
  complementadresse?: string;
  numero?: string;
  typeemplacement?: string;
  domanialite?: string;
  dateplantation?: string;
  geo_point_2d?: {
    lon: number;
    lat: number;
  };
}

interface ApiResponse {
  total_count: number;
  results: RemarkableTreeRecord[];
}

const fetchRemarkableTreesData = async (limit: number = 20): Promise<ApiResponse> => {
  console.log(`Récupération des données des arbres remarquables (limite: ${limit})...`);
  
  const response = await fetch(
    `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/arbresremarquablesparis/records?limit=${limit}`
  );
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des données des arbres remarquables');
  }
  
  return response.json();
};

export const useRemarkableTreesData = (limit?: number) => {
  return useQuery({
    queryKey: ['remarkable-trees-data', limit],
    queryFn: () => fetchRemarkableTreesData(limit),
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
  });
};
