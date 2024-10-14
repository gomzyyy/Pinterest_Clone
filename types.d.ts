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

export interface InitialState {
  discoveryFilter: DiscoveryFilter | [];
  collectionData: collectionData | [];
  loading: boolean;
  error: string | null;
}
export interface POST {
  _id: string;
  admin: string;
  comments: string[] | [];
  createdAt: string;
  description: string;
  dislikes: [];
  downloadable: boolean;
  image: string;
  likes: [];
  reportStatus: [];
  tags: string[];
  title: string;
  updatedAt: string;
  visible: boolean;
}
export interface USER{
  _id :string;
  userName :string;
  userId :string;
  password :string;
  avatar :string;
  posts :POST[];
  followers :USER[];
  following :USER[];
  bookmarks :POST[];
  reportStatus :[];
  isDisabled :boolean;
  isPrivate :boolean;
  premiumUser :boolean;
  verified :boolean;
  createdAt :Date
  updatedAt :Date
  __v :number
}

