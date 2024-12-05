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
export interface GetUserType {
  userId: string | undefined;
  token: string;
}
export interface GetAllUserType {
  token: string;
}
export interface GetSuggestionsType {
  token: string;
}
export interface followUnfollowDataType {
  token: string;
  isFollowedId?: string;
  isUnfollowedId?: string;
}
export interface removeFollowerDataType {
  token: string;
  followerId: string;
}
export interface removeFollowerResponseType {
  loading: boolean;
  error: SerializedError | null;
  response: {
    message: string;
    success: boolean;
  };
}
export interface followUnfollowResponseType {
  loading: boolean;
  error: SerializedError | null;
  response: {
    message: string;
    success: boolean;
  };
}
export interface getPostByIdType {
  loading: boolean;
  error: SerializedError | null;
  response: {
    message: string;
    requestedPost: POST | undefined;
    success: boolean;
    comments: commentType[] | undefined;
    peopleLiked: string[] | undefined;
    peopleDisliked: string[] | USER[] | undefined;
  };
}
export interface updatePostByIdType {
  loading: boolean;
  error: SerializedError | null;
  response: {
    message: string;
    success: boolean;
    comments: commentType[] | string[] | undefined;
    peopleLiked: string[] | undefined;
    peopleDisliked: string[] | undefined;
  };
}

export interface getAllPostType {
  loading: boolean;
  error: SerializedError | null;
  response: {
    message: string;
    success: boolean;
    posts: string[] | POST[] | undefined;
  };
}
export interface InitialStateAdmin {
  response: { message: string; admin: USER | undefined; success: boolean };
  admin: USER | undefined;
  loading: boolean;
  error: SerializedError | null;
  posts: POST[] | [];
  bookmarks: string[] | POST[];
}
export interface InitialStateUser {
  response: {
    message: string;
    data: {
      user: USER | undefined;
    };
    success: boolean;
  };
  loading: boolean;
  error: SerializedError | null;
}
export interface GetPostType {
  postId?: string;
  token: string;
}
export interface GetAllPostType {
  token: string;
}
export interface postActionsType {
  postId?: string;
  getComment?: string;
  token: string;
  postLiked?: string;
  postUnLiked?: string;
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
export interface InitialStateAllUsers {
  response: {
    message: string;
    success: boolean;
    data: {
      AllUsersWithoudAdmin: USER[] | undefined;
      AllUsersIncludingAdmin: USER[] | undefined;
    };
  };
  loading: boolean;
  error: SerializedError | null;
}
export interface InitialStateSuggestions {
  response: {
    message: string;
    success: boolean;
    data: {
      suggestedUsers: USER[] | undefined;
    };
  };
  loading: boolean;
  error: SerializedError | null;
}
export interface getSearchResultDataType {
  token: string;
  query?: string;
}
export interface getSearchResultResponseType {
  response: {
    message: string;
    success: boolean;
    data: {
      result: USER[] | POSt[] | undefined;
      type: string;
    };
  };
  loading: boolean;
  error: SerializedError | null;
}

export interface POST {
  _id: string;
  admin: USER;
  comments: commentType[] | undefined;
  createdAt: string;
  description: string;
  dislikes: USER[];
  downloadable: boolean;
  image: string;
  likes: USER[];
  visits: USER[];
  reportStatus: string[];
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
  posts: string[] | POST[];
  followers: USER[] | string[];
  following: USER[] | string[];
  bookmarks: POST[] | string[];
  reportStatus: [];
  bio: string;
  dateOfBirth: Date | string;
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
  _id?: string;
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
export interface initialGlobalStateType {
  post: {
    postsAvailable: boolean;
    feedPosts: POST[];
    postById: POST | undefined;
  };
  user: {
    suggestedUsers: USER[];
  };
  admin: USER | undefined;
  token: string | null;
}
