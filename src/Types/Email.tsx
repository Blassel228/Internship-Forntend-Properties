import {User} from "./User.tsx";

export interface VerifyEmailChangeResponse {
  message: string;
  user: User;
}

export interface ChangeEmailRequest{


  new_email: string;
  password: string;
}

export interface ChangeEmailResponse {
  message: string
}