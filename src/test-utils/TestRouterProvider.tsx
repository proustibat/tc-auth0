import { createRouter } from "@tanstack/react-router";
import { createMemoryHistory } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";

export const createTestRouter = () =>
    createRouter({
        routeTree,
        history: createMemoryHistory(),
        defaultPreload: "intent",
        context: {}, // ou avec auth si tu veux tester les routes beforeLoad plus tard
    });
