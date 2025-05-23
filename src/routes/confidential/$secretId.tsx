import { createFileRoute } from "@tanstack/react-router";
import SecretPage from "../../pages/secret";

export const Route = createFileRoute("/confidential/$secretId")({
    component: SecretPage,
});
