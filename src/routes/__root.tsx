import { createRootRoute } from "@tanstack/react-router";
import RootRouteComponent from "../RootRouteComponent.tsx";

export const Route = createRootRoute({
    component: RootRouteComponent,
});
