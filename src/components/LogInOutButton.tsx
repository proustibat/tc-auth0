import { useAuth0 } from "@auth0/auth0-react";
import type { RedirectLoginWithOrg } from "../types.ts";

export const LogInOutButton = () => {
    const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();

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
        <button
            type="button"
            onClick={handleClick}
            disabled={isLoading}
            className="text-slate-100 rounded-md px-3 py-2 text-sm font-medium outline cursor-pointer hover:bg-slate-100 hover:text-slate-900"
        >
            {isAuthenticated ? "Logout" : "Login"}
        </button>
    );
};
