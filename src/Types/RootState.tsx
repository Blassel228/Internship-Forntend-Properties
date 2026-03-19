import { User } from "./User";

export interface RootState {
  authorizedUser: {
    authorizedUser: User | null;
  };
  rooms: any;
}
