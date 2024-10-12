type DiscoveryFilter = {
  name: string;
  id: number;
  searchOptions: string[];
}[];
type imageObj = {
  image: string;
  category: string;
  tags: string[];
};

type collectionData = {
  collection: string;
  images: imageObj[];
};

export interface InitialState{
    discoveryFilter:DiscoveryFilter | [];
    collectionData:collectionData | [];
    loading:boolean;
    error:string | null;
}
