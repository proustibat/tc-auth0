import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "@tanstack/react-router";

export const AuthProviderWithNavigate = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const onRedirectCallback = (appState: any) => {
        navigate(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience,
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};
