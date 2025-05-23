import { Outlet, createRootRoute } from "@tanstack/react-router";
import { lazy } from "react";
import { AuthProviderWithNavigate } from "../auth/AuthProvider.tsx";
import { LogInOutButton } from "../auth/LogInOutButton.tsx";

const TanStackRouterDevtools = import.meta.env.PROD
    ? () => null
    : lazy(() =>
          import("@tanstack/react-router-devtools").then((res) => ({
              default: res.TanStackRouterDevtools,
          }))
      );

export const Route = createRootRoute({
    component: () => (
        <AuthProviderWithNavigate>
            <LogInOutButton />
            <Outlet />
            <TanStackRouterDevtools />
        </AuthProviderWithNavigate>
    ),
});
