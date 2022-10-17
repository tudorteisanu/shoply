import {UserInterface} from "@/ts/interfaces/user";

export interface LoginInterface {
  email: string;
  password: string;
}

export interface CredentialsInterface {
  user: UserInterface;
  token: string;
}
