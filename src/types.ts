import type { AppState } from "@auth0/auth0-react";

export type RedirectLoginWithOrg = {
    organization?: string;
    appState?: AppState;
};
