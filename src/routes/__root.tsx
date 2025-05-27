import { Outlet, createRootRoute } from "@tanstack/react-router";
import { lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AuthProviderWithNavigate } from "../auth/AuthProvider.tsx";
import ErrorFallback from "../components/ErrorFallback.tsx";
import Menu from "../components/Menu.tsx";
import { ApolloWrapper } from "../graphql/ApolloWrapper.tsx";

const TanStackRouterDevtools = import.meta.env.PROD
    ? () => null
    : lazy(() =>
          import("@tanstack/react-router-devtools").then((res) => ({
              default: res.TanStackRouterDevtools,
          }))
      );

export const Route = createRootRoute({
    component: () => (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
                window.location.reload();
            }}
        >
            <AuthProviderWithNavigate>
                <ApolloWrapper>
                    <Menu />
                    <Outlet />
                    <TanStackRouterDevtools />
                </ApolloWrapper>
            </AuthProviderWithNavigate>
        </ErrorBoundary>
    ),
});
