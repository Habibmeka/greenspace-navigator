import { useQuery } from '@tanstack/react-query';

interface GreenSpaceRecord {
  record_id: string;
  fields: {
    nom_ev: string;
    type_ev: string;
    adresse_complete?: string;
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
  console.log("Tentative de récupération des données depuis l'API Paris...");

  const response = await fetch(
    'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/espaces_verts/records?limit=100&fields=recordid,fields.nom_ev,fields.type_ev,fields.adresse_complete,fields.arrondissement,fields.surface_totale_reelle,fields.geo_point_2d,fields.equipement,fields.horaire_ouverture'
  );

  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  console.log("Données reçues de l'API Paris:", data);
  return data;
};

export const useParisGreenSpaces = () => {
  return useQuery({
    queryKey: ['paris-green-spaces'],
    queryFn: fetchParisGreenSpaces,
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: 1,
  });
};
