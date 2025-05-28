import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SecretsList from "../SecretsList";

describe("SecretsList", () => {
    it("should display secrets properly", () => {
        // GIVEN
        const secrets = [
            { id: "1", name: "Secret 1", description: "Description 1", organization_id: "org1" },
            { id: "2", name: "Secret 2", description: "Description 2", organization_id: "org2" },
        ];

        // WHEN
        render(<SecretsList secrets={secrets} />);

        // THEN
        for (const secret of secrets) {
            expect(screen.getByText(secret.name)).toBeInTheDocument();
            expect(screen.getByText(`(${secret.description})`)).toBeInTheDocument();
        }
    });
});
