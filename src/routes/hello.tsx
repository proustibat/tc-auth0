import { createFileRoute } from "@tanstack/react-router";
import HelloPage from "../pages/hello";

export const Route = createFileRoute("/hello")({
    component: HelloPage,
});
