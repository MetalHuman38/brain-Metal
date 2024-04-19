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
    PostID: number | null;
    Caption?: string;
    ImageURL?: string;
    Location?: string;
    Tags?: string;
  };
  
  export type IUpdatePost = {
    PostID: number;
    Likes: number;
    Caption: string;
    Tags: string;
    ImageURL: string;
    Location: string;
    CreatedAt: Date;
    UpdatedAt: Date;
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