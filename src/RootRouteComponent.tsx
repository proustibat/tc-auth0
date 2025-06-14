import { type AppState, Auth0Provider } from "@auth0/auth0-react";
import { Outlet } from "@tanstack/react-router";
import { lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback.tsx";
import Menu from "./components/Menu.tsx";
import { ApolloWrapper } from "./graphql/ApolloWrapper.tsx";
import { appRouter } from "./router.tsx";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

export const AUTHORIZED_ORG_ID = "org_L8aaj0QmOnS3r7G6";

const TanStackRouterDevtools = import.meta.env.PROD
    ? () => null
    : lazy(() =>
          import("@tanstack/react-router-devtools").then((res) => ({
              default: res.TanStackRouterDevtools,
          }))
      );

const RootRouteComponent = () => (
    <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
            window.location.reload();
        }}
        onError={(error) => {
            console.log("ERROR BOUNDARY CAUGHT AN ERROR", error);
        }}
    >
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience,
                organization: AUTHORIZED_ORG_ID,
            }}
            onRedirectCallback={(appState: AppState | undefined) => {
                appRouter.history.push(appState?.returnTo || window.location.pathname);
            }}
        >
            <ApolloWrapper>
                <Menu />
                <Outlet />
                <TanStackRouterDevtools />
            </ApolloWrapper>
        </Auth0Provider>
    </ErrorBoundary>
);

export default RootRouteComponent;
