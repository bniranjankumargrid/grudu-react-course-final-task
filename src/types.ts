import { ReactNode } from "react";

export interface Errors {
  email?: string;
  password?: string;
  userName?: string;
  fullName?: string;
  userNotFound?:string;
  userNameFound?:string;
  emailFound?:string;
  textInputLimit?:string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  userName: string;
  password: string;
}

export interface AuthContextType {
  loggedInUser: User | null;
  setLoggedInUser: (user: User | null) => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface TweetProps{
  icon:string,
  name:string,
  description:string
}

export interface Tweets{
  id:string
  author_id:string,
  text:string
}