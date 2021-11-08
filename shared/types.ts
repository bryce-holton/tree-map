export interface Fields {
    Accession: string;
    'Taxon Name': string;
    Genus: string;
    Species: string;
    'Infraspecific Type 1': string;
    'Infraspecific Name 1': string;
    Cultivar: string;
    'Common Name': string;
    Origin: string;
    Family: string;
    Latitude: number;
    Longitude: number;
    'Photo 1 URL': string;
  }
  
  export interface Record {
    id: string;
    fields: Fields;
  }