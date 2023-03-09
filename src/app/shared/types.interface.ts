import { AuthStateInterface } from "../auth/types.interface";
import { ApiStateInterface } from "../home/types.interface";

export interface AppStateInterface {
    api: ApiStateInterface;
    auth: AuthStateInterface;
}

