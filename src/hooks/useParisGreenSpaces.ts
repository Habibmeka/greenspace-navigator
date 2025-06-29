
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
    const response = await fetch(
      'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/espaces_verts/records?limit=100'
    );
    
    if (!response.ok) {
      console.log('API Paris non disponible, utilisation des données mock');
      return mockParisGreenSpacesData;
    }
    
    const apiData = await response.json();
    console.log('Données brutes de l\'API:', apiData);
    
    // Transformer les données de l'API pour qu'elles correspondent à notre interface
    const transformedData: ApiResponse = {
      total_count: apiData.total_count || apiData.results?.length || 0,
      results: (apiData.results || []).map((item: any, index: number) => ({
        record_id: item.record_id || `record_${index}`,
        fields: {
          nom_ev: item.nom_ev || item.fields?.nom_ev || item.name || `Espace vert ${index + 1}`,
          type_ev: item.type_ev || item.fields?.type_ev || item.type || 'Espace vert',
          adresse_ev: item.adresse_ev || item.fields?.adresse_ev || item.address,
          arrondissement: item.arrondissement || item.fields?.arrondissement || item.district || '1',
          surface_totale_reelle: item.surface_totale_reelle || item.fields?.surface_totale_reelle || item.surface,
          geo_point_2d: item.geo_point_2d || item.fields?.geo_point_2d || {
            lon: 2.3522 + (Math.random() - 0.5) * 0.1,
            lat: 48.8566 + (Math.random() - 0.5) * 0.1
          },
          equipement: item.equipement || item.fields?.equipement || [],
          horaire_ouverture: item.horaire_ouverture || item.fields?.horaire_ouverture
        }
      }))
    };
    
    console.log('Données transformées:', transformedData);
    return transformedData;
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
