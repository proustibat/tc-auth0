import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import { MockedProvider } from "@apollo/client/testing";
import { useAuth0 } from "@auth0/auth0-react";
import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { auth0Authenticated, auth0NotAuthenticated } from "../../__mocks__/auth0.ts";
import { claimsWithNoOrg, claimsWithRightOrg } from "../../__mocks__/claims.ts";
import { apolloMocks, apolloMocksWithError } from "../../__mocks__/graphql.ts";
import { useAuthClaims } from "../../hooks/auth/useAuthClaims.ts";
import SecretPage from "./index.tsx";

vi.mock("@tanstack/react-router", () => ({
    useParams: () => ({ secretId: "123" }),
}));
vi.mock("@auth0/auth0-react", () => ({
    useAuth0: vi.fn(),
}));
vi.mock("../../hooks/auth/useAuthClaims.ts", () => ({
    useAuthClaims: vi.fn(),
}));

describe("SecretPage", () => {
    beforeAll(() => {
        // Load dev messages for Apollo Client
        loadDevMessages();
        // Load error messages for Apollo Client
        loadErrorMessages();
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should display claims and secrets", async () => {
        // GIVEN
        vi.mocked(useAuth0).mockImplementation(() => auth0Authenticated);
        vi.mocked(useAuthClaims).mockImplementation(() => ({
            claims: claimsWithRightOrg,
            error: null,
        }));

        // WHEN
        render(
            <MockedProvider mocks={apolloMocks} addTypename={false}>
                <SecretPage />
            </MockedProvider>
        );

        // THEN
        expect(await screen.findByRole("heading", { name: /Secret page/i })).toBeInTheDocument();
        expect(screen.getByText(/Here is the url param: 123/)).toBeInTheDocument();
        expect(screen.getByText("Mocked secret 1")).toBeInTheDocument();
        expect(screen.getByText("Mocked secret 2")).toBeInTheDocument();
        expect(screen.getByTestId("claims").textContent).toContain(JSON.stringify(claimsWithRightOrg, null, 2));
    });

    it("should not display anything if the user is not authenticated", async () => {
        // GIVEN
        vi.mocked(useAuth0).mockImplementation(() => auth0NotAuthenticated);
        vi.mocked(useAuthClaims).mockImplementation(() => ({
            claims: claimsWithRightOrg,
            error: null,
        }));

        // WHEN
        const { container } = render(
            <MockedProvider mocks={apolloMocks} addTypename={false}>
                <SecretPage />
            </MockedProvider>
        );
        expect(container).toBeEmptyDOMElement();
    });

    it("should display a message instead of secrets if the user is not authorized", async () => {
        // GIVEN
        vi.mocked(useAuth0).mockImplementation(() => auth0Authenticated);
        vi.mocked(useAuthClaims).mockImplementation(() => ({
            claims: claimsWithNoOrg,
            error: null,
        }));

        // WHEN
        render(
            <MockedProvider mocks={apolloMocks} addTypename={false}>
                <SecretPage />
            </MockedProvider>
        );

        // THEN
        expect(await screen.findByRole("heading", { name: /Secret page/i })).toBeInTheDocument();
        expect(screen.getByText("Non authorized")).toBeInTheDocument();
        expect(
            screen.getByText("You should belong to the right organization to see secrets projects from the database")
        ).toBeInTheDocument();
    });

    it("should display an error message if extracting claims fails", async () => {
        // GIVEN
        vi.mocked(useAuth0).mockImplementation(() => auth0Authenticated);
        vi.mocked(useAuthClaims).mockImplementation(() => ({
            claims: claimsWithRightOrg,
            error: new Error("Oopsie"),
        }));
        // WHEN
        render(
            <MockedProvider mocks={apolloMocks} addTypename={false}>
                <SecretPage />
            </MockedProvider>
        );
        // THEN
        expect(await screen.findByRole("heading", { name: /Secret page/i })).toBeInTheDocument();
        expect(screen.getByText("Error")).toBeInTheDocument();
        expect(screen.getByText("❌ Something went wrong when extracting your claims: Oopsie")).toBeInTheDocument();
    });

    it("should display an error message when requesting the database fails", async () => {
        // GIVEN
        vi.mocked(useAuth0).mockImplementation(() => auth0Authenticated);
        vi.mocked(useAuthClaims).mockImplementation(() => ({
            claims: claimsWithRightOrg,
            error: null,
        }));

        // WHEN
        render(
            <MockedProvider mocks={apolloMocksWithError} addTypename={false}>
                <SecretPage />
            </MockedProvider>
        );

        // THEN
        expect(await screen.findByRole("heading", { name: /Secret page/i })).toBeInTheDocument();
        expect(screen.getByText("Something went wrong when requesting secrets from database")).toBeInTheDocument();
        expect(screen.getByText("Oopsie it's a mock error")).toBeInTheDocument();
    });
});
