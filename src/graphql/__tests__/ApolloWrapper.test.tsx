import { useAuth0 } from "@auth0/auth0-react";
import { render } from "@testing-library/react";
import { type Mock, vi } from "vitest";
import { ApolloWrapper } from "../ApolloWrapper.tsx";

vi.mock("@auth0/auth0-react", () => ({
    useAuth0: vi.fn(),
}));

describe("ApolloWrapper", () => {
    it("renders children correctly", () => {
        (useAuth0 as Mock).mockReturnValue({
            getAccessTokenSilently: vi.fn(),
            isAuthenticated: true,
            loginWithRedirect: vi.fn(),
        });

        const { getByText } = render(
            <ApolloWrapper>
                <div>Test Child</div>
            </ApolloWrapper>
        );

        expect(getByText("Test Child")).toBeInTheDocument();
    });
});
