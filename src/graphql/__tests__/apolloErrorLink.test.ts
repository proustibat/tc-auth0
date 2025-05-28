import { onError } from "@apollo/client/link/error";
import type { Auth0Client } from "@auth0/auth0-spa-js";
import { type Mock, describe, expect, it, vi } from "vitest";
import { auth0Authenticated } from "../../__mocks__/auth0.ts";
import { createErrorLink } from "../apolloErrorLink.ts";

vi.mock("@apollo/client/link/error", () => {
    const actual = vi.importActual("@apollo/client/link/error");
    return {
        ...actual,
        onError: vi.fn((handler) => handler),
    };
});

describe("createErrorLink", () => {
    it("should call console.warn with the correct message for AUTH_NOT_AUTHENTICATED", () => {
        // GIVEN
        createErrorLink(auth0Authenticated as unknown as Auth0Client);
        const handler = (onError as Mock).mock.calls[0][0];
        const consoleWarnSpy = vi.spyOn(console, "warn");

        // WHEN
        // Simulate a GraphQL error
        const graphQLErrors = [{ extensions: { code: "AUTH_NOT_AUTHENTICATED" } }];
        handler({ graphQLErrors, networkError: null });

        // THEN
        expect(consoleWarnSpy).toHaveBeenCalledWith("User not authenticated, redirecting...");
    });

    it("should log network errors", () => {
        // GIVEN
        createErrorLink(auth0Authenticated as unknown as Auth0Client);
        const handler = (onError as Mock).mock.calls[0][0];
        const consoleWarnSpy = vi.spyOn(console, "warn");

        // WHEN
        // Simulate a network error
        const networkError = new Error("Network error");
        handler({ graphQLErrors: null, networkError });

        // THEN
        expect(consoleWarnSpy).toHaveBeenCalledWith("[Network error]:", networkError);
    });

    it("should not call warn for other GraphQL errors", () => {
        // GIVEN
        createErrorLink(auth0Authenticated as unknown as Auth0Client);
        const handler = (onError as Mock).mock.calls[0][0];
        const consoleWarnSpy = vi.spyOn(console, "warn");

        // WHEN
        // Simulate a different GraphQL error
        const graphQLErrors = [{ extensions: { code: "SOME_OTHER_ERROR" } }];
        handler({ graphQLErrors, networkError: null });

        // THEN
        expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
});
