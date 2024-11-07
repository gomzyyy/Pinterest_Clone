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

export interface getPostByIdType {
  loading: boolean;
  error: SerializedError | null;
  response: {
    message: string;
    requestedPost: POST | undefined;
    success: boolean;
    comments: commentType[] | undefined;
  };
}
export interface updatePostByIdType {
  loading: boolean;
  error: SerializedError | null;
  response: {
    message: string;
    success: boolean;
  };
}
export interface InitialStateAdmin {
  response: { message: string; admin: USER | undefined; success: boolean };
  admin: USER | undefined;
  loading: boolean;
  error: SerializedError | null;
  posts: POST[] | [];
  bookmarks: string[] | [];
}
export interface GetPostType {
  postId?: string;
  token: string;
}
export interface postActionsType {
  postId?: string;
  getComment?: string;
  token: string;
  // likes, getcomment, reportPost, dislikes
}
export interface AdminUpdateData {
  userName?: string | undefined;
  password?: string;
  isPrivate?: boolean;
  avatar?: string;
  isDisabled?: boolean;
  gender?: "male" | "female" | "";
  dateOfBirth?: string;
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
    avatar: string;
    gender?: "male" | "female" | "";
    dateOfBirth?: string;
    bio?: string;
  };
  error: SerializedError | null;
}
export interface POST {
  _id: string;
  admin: USER;
  comments: commentType[];
  createdAt: string;
  description: string;
  dislikes: [];
  downloadable: boolean;
  image: string;
  likes: [];
  visits: USER[];
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
  bio: string;
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
export interface commentType {
  _id?:string;
  text?: string;
  admin?: USER | undefined;
  likes?: USER[] | string[] | undefined;
  dislikes?: USER[] | string[] | undefined;
  replies?: {
    text?: string;
    likes?: USER[] | string[] | undefined;
    dislikes?: USER[] | string[] | undefined;
    admin?: USER | undefined;
    visible?: boolean;
    hidden?: boolean;
    reportStatus?: {
      reportType?: string;
      others?: string;
    };
    replies: {
      text?: string;
      likes?: USER[] | string[] | undefined;
      dislikes?: USER[] | string[] | undefined;
      admin?: USER | undefined;
      visible?: boolean;
      hidden?: boolean;
      reportStatus?: {
        reportType?: string;
        others?: string;
      };
    };
  };
  reportStatus?: {
    reportType?: string;
    others?: string;
  };
  visible?: boolean;
  hidden?: boolean;
}
