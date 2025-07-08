
import { useQuery } from '@tanstack/react-query';

interface GreenSpaceFields {
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
}

interface GreenSpaceRecord {
  record_id: string;
  fields: GreenSpaceFields;
}

interface ApiResponse {
  total_count: number;
  results: GreenSpaceRecord[];
}

const fetchParisGreenSpaces = async (limit: number = 100): Promise<ApiResponse> => {
  console.log(`Récupération des données des espaces verts (limite: ${limit})...`);
  
  const response = await fetch(
    `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/espaces_verts/records?limit=${limit}`
  );
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des données des espaces verts');
  }
  
  return response.json();
};

export const useParisGreenSpaces = (limit?: number) => {
  return useQuery({
    queryKey: ['paris-green-spaces', limit],
    queryFn: () => fetchParisGreenSpaces(limit),
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
  });
};
