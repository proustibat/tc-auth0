import { useAuth0 } from "@auth0/auth0-react";
import type { RedirectLoginWithOrg } from "../types.ts";

export const LogInOutButton = () => {
    const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();
    console.log("Login triggered with organization");

    const handleClick = () => {
        isAuthenticated
            ? logout({ logoutParams: { returnTo: window.location.origin } })
            : loginWithRedirect({
                  appState: {
                      returnTo: window.location.pathname,
                  },
                  organization: "thundercode",
              } as RedirectLoginWithOrg);
    };
    return (
        <button type="button" onClick={handleClick} disabled={isLoading}>
            {isAuthenticated ? "Logout" : "Login"}
        </button>
    );
};
