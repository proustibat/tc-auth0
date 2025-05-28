import { useAuth0 } from "@auth0/auth0-react";
import { renderHook } from "@testing-library/react";
import { type Mock, vi } from "vitest";
import { useProtectedRoute } from "../useProtectedRoute.ts";

vi.mock("@auth0/auth0-react");

describe("useProtectedRoute", () => {
    const mockLoginWithRedirect = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useAuth0 as Mock).mockReturnValue({
            isAuthenticated: false,
            isLoading: false,
            loginWithRedirect: mockLoginWithRedirect,
        });
    });

    it("should call loginWithRedirect when not authenticated and not loading", () => {
        renderHook(() => useProtectedRoute());

        expect(mockLoginWithRedirect).toHaveBeenCalledWith({
            appState: { returnTo: window.location.pathname },
            organization: "thundercode",
        });
    });

    it("should not call loginWithRedirect when loading", () => {
        (useAuth0 as Mock).mockReturnValue({
            isAuthenticated: false,
            isLoading: true,
            loginWithRedirect: mockLoginWithRedirect,
        });

        renderHook(() => useProtectedRoute());

        expect(mockLoginWithRedirect).not.toHaveBeenCalled();
    });

    it("should not call loginWithRedirect when authenticated", () => {
        (useAuth0 as Mock).mockReturnValue({
            isAuthenticated: true,
            isLoading: false,
            loginWithRedirect: mockLoginWithRedirect,
        });

        renderHook(() => useProtectedRoute());

        expect(mockLoginWithRedirect).not.toHaveBeenCalled();
    });
});
