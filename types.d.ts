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

export interface InitialStatePost {
  posts: POST | [];
  filteredPosts: POST | [];
  loading: boolean;
  error: SerializedError | null;
}
export interface InitialStateAdmin {
  response: { message: string; admin: USER | []; success: boolean };
  admin: USER | [];
  loading: boolean;
  error: SerializedError | null;
  posts: POST[] | [];
  bookmarks: string[] | [];
}
export interface AdminUpdateData {
  userName?: string | undefined;
  password?: string;
  isPrivate?: boolean;
  avatar?: string;
  isDisabled?:boolean;
  gender?: "male" | "female" | "";
  dateOfBirth?: Date;
  bio?: string;
  token: string | null;
}
export interface InitialStateUpdatedAdmin {
  response: { message: string; success: boolean };
  loading: boolean;
  updatedData: {
    userName?: string;
    password?: string;
    isPrivate?: boolean;
    avatar:string;
    gender?: "male" | "female" | "";
    dateOfBirth?: string;
    bio?: string;
  };
  error: SerializedError | null;
}
export interface POST {
  _id: string;
  admin: USER;
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
export interface USER {
  _id: string;
  userName: string;
  userId: string;
  avatar: string;
  posts: string[];
  followers: USER[];
  following: USER[];
  bookmarks: POST[];
  reportStatus: [];
  bio:string;
  dateOfBirth: Date;
  isDisabled: boolean;
  isPrivate: boolean;
  premiumUser: boolean;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface AdminResponse {
  message: string;
  admin: USER | [];
  success: boolean;
}
