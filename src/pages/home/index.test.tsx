import { useAuth0 } from "@auth0/auth0-react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { auth0Authenticated, auth0NotAuthenticated, userProfileWithOrg } from "../../__mocks__/auth0.ts";
import HomePage from "./index";

vi.mock("@auth0/auth0-react", () => ({
    useAuth0: vi.fn(),
}));

describe("Home Page", () => {
    it("should render properly when user is logged", () => {
        // GIVEN
        vi.mocked(useAuth0).mockImplementation(() => auth0Authenticated);

        // WHEN
        render(<HomePage />);

        // THEN
        expect(screen.getByText("Home page")).toBeInTheDocument();
        expect(
            screen.getByText("Here is a public page with restricted content about your profile!")
        ).toBeInTheDocument();
        expect(screen.getByRole("img").getAttribute("src")).toBe(userProfileWithOrg.picture);
        expect(
            screen.getByText(new RegExp(`HI ${userProfileWithOrg.given_name.toUpperCase()}!`, "i"))
        ).toBeInTheDocument();
        expect(screen.getByText("Here is your profile information:")).toBeInTheDocument();
        expect(screen.getByTestId("user-profile").textContent).toContain(JSON.stringify(userProfileWithOrg, null, 2));
    });

    it("should render properly when user is not logged in", async () => {
        // GIVEN
        vi.mocked(useAuth0).mockImplementation(() => auth0NotAuthenticated);

        // WHEN
        render(<HomePage />);

        // THEN
        expect(screen.getByText("Home page")).toBeInTheDocument();
        expect(
            screen.getByText("Here is a public page with restricted content about your profile!")
        ).toBeInTheDocument();
        // specific to this case
        expect(screen.getByText("Please login to your account to see your profile information")).toBeInTheDocument();
        // not supposed to be here (should be only for logged in user)
        expect(screen.queryByRole("img")).not.toBeInTheDocument();
        expect(
            screen.queryByText(new RegExp(`HI ${userProfileWithOrg.given_name.toUpperCase()}!`, "i"))
        ).not.toBeInTheDocument();
        expect(screen.queryByText("Here is your profile information:")).not.toBeInTheDocument();
        expect(screen.queryByText("user-profile")).not.toBeInTheDocument();
    });
});
