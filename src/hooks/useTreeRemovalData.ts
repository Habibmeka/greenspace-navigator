
import { useQuery } from '@tanstack/react-query';

interface TreeRemovalRecord {
  record_id?: string;
  idbase?: string;
  fields?: {
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
  // Propriétés directes de l'API
  domanialite?: string;
  arrondissement?: string;
  adresse?: string;
  libellefrancais?: string;
  genre?: string;
  remarquable?: string;
  genrefutur?: string;
  motifabattage?: string;
  geo_point_2d?: {
    lon: number;
    lat: number;
  };
}

interface ApiResponse {
  total_count: number;
  results: TreeRemovalRecord[];
}

const fetchTreeRemovalData = async (limit: number = 20): Promise<ApiResponse> => {
  console.log(`Récupération des données des arbres à abattre (limite: ${limit})...`);
  
  const response = await fetch(
    `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/arbres-a-abattre-pour-raison-sanitaires-et-essence-de-remplacement/records?limit=${limit}`
  );
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des données');
  }
  
  return response.json();
};

export const useTreeRemovalData = (limit?: number) => {
  return useQuery({
    queryKey: ['tree-removal-data', limit],
    queryFn: () => fetchTreeRemovalData(limit),
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
  });
};
