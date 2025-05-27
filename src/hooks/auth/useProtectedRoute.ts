import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import type { RedirectLoginWithOrg } from "../../types.ts";

export const useProtectedRoute = () => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect({
                appState: {
                    returnTo: window.location.pathname,
                },
                organization: "thundercode",
            } as RedirectLoginWithOrg);
        }
    }, [isAuthenticated, isLoading, loginWithRedirect]);
};
