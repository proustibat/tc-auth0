import { Link, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const appRouter = createRouter({
    routeTree,
    defaultNotFoundComponent: () => {
        return (
            <div>
                <p>Not found Page!</p>
                <Link to="/">Go home</Link>
            </div>
        );
    },
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof appRouter;
    }
}
