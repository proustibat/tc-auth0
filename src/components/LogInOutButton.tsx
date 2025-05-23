import { useAuth0 } from "@auth0/auth0-react";

export const LogInOutButton = () => {
    const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();

    const handleClick = () => {
        isAuthenticated
            ? logout({ logoutParams: { returnTo: window.location.origin } })
            : loginWithRedirect({
                  appState: {
                      returnTo: window.location.pathname,
                  },
              });
    };
    return (
        <button type="button" onClick={handleClick} disabled={isLoading}>
            {isAuthenticated ? "Logout" : "Login"}
        </button>
    );
};
