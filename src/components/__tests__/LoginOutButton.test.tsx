import { useAuth0 } from "@auth0/auth0-react";
import { render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
import { auth0Authenticated, auth0NotAuthenticated } from "../../__mocks__/auth0.ts";
import { LogInOutButton } from "../LogInOutButton.tsx";

vi.mock("@auth0/auth0-react", () => ({
    useAuth0: vi.fn(),
}));

describe("LoginOutButton", () => {
    it("should render properly when user is logged out", () => {
        // GIVEN
        vi.mocked(useAuth0).mockImplementation(() => auth0NotAuthenticated);

        // WHEN
        render(<LogInOutButton />);

        // THEN
        expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    });

    it("should render properly when user is logged in", () => {
        // GIVEN
        vi.mocked(useAuth0).mockImplementation(() => auth0Authenticated);

        // WHEN
        render(<LogInOutButton />);

        // THEN
        expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
    });
});
