import {UserGet} from "./User";

export interface RootState {
  authorizedUser: {
    authorizedUser: UserGet | null;
  };
  rooms: any;
}
