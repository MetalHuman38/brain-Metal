export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
  };
  
  export type IUpdateUser = {
    userId: string;
    name: string;
    bio: string;
    imageId: string;
    imageUrl: URL | string;
    file: File[];
  };

  export type INewPost = {
    CreatorID: number | null;
    Caption: string;
    File: File[];
    Location?: string;
    Tags?: string;
  };
  
  export type IUpdatePost = {
    postId: string;
    caption: string;
    imageId: string;
    imageUrl: URL;
    file: File[];
    location?: string;
    tags?: string;
  };
  
  export type IUser = {
    UserID: string;
    MemberName: string;
    Username: string;
    Email: string;
    ImageUrl: string;
    AvatarUrl: string;
    Bio: string;
  };
  
  export type INewUser = {
    UserID: string;
    name: string;
    email: string;
    username: string;
    password: string;
  };