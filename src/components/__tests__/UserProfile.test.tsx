import { useAuth0 } from "@auth0/auth0-react";
import type { Auth0ContextInterface } from "@auth0/auth0-react/src/auth0-context.tsx";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UserProfile } from "../UserProfile";

vi.mock("@auth0/auth0-react");

describe("UserProfile", () => {
    it("should display loading state when isLoading is true", () => {
        // GIVEN
        vi.mocked(useAuth0).mockReturnValue({
            isLoading: true,
            isAuthenticated: false,
        } as Auth0ContextInterface);

        // WHEN
        render(<UserProfile />);

        // THEN
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should render nothing when user is not authenticated", () => {
        // GIVEN
        vi.mocked(useAuth0).mockReturnValue({
            isLoading: false,
            isAuthenticated: false,
        } as Auth0ContextInterface);

        // WHEN
        const { container } = render(<UserProfile />);

        // THEN
        expect(container).toBeEmptyDOMElement();
    });

    it("should display user profile when suer is authenticated", () => {
        // GIVEN
        const mockUser = {
            name: "Jane Doe",
            given_name: "Jane",
            nickname: "Jiji",
            picture: "url/to/picture.jpg",
        };
        vi.mocked(useAuth0).mockReturnValue({
            isLoading: false,
            isAuthenticated: true,
            user: mockUser,
        } as Auth0ContextInterface);

        // WHEN
        render(<UserProfile />);

        // THEN
        expect(screen.getByAltText(mockUser.name)).toHaveAttribute("src", mockUser.picture);
        expect(screen.getByText(`Hi ${mockUser.given_name}!`)).toBeInTheDocument();
        expect(screen.getByTestId("user-profile").textContent).toContain(JSON.stringify(mockUser, null, 2));
    });
});
