import { useAuth0 } from "@auth0/auth0-react";
import { renderHook, waitFor } from "@testing-library/react";
import { jwtDecode } from "jwt-decode";
import { type Mock, vi } from "vitest";
import { useAuthClaims } from "../useAuthClaims.ts";

vi.mock("@auth0/auth0-react");
vi.mock("jwt-decode");

describe("useAuthClaims", () => {
    const mockGetAccessTokenSilently = vi.fn();
    const mockJwtDecode = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useAuth0 as Mock).mockReturnValue({
            getAccessTokenSilently: mockGetAccessTokenSilently,
        });
        (jwtDecode as Mock).mockImplementation(mockJwtDecode);
    });

    it("should return claims when token is successfully decoded", async () => {
        // GIVEN
        const mockToken = "mockToken";
        const mockClaims = { email: "test@example.com" };

        mockGetAccessTokenSilently.mockResolvedValue(mockToken);
        mockJwtDecode.mockReturnValue(mockClaims);

        // WHEN
        const { result } = renderHook(() => useAuthClaims());

        // THEN
        await waitFor(() => {
            expect(result.current.claims).toEqual(mockClaims);
            expect(result.current.error).toBeNull();
        });
    });

    it("should return an error when token retrieval fails", async () => {
        // GIVEN
        const mockError = new Error("Token retrieval failed");

        mockGetAccessTokenSilently.mockRejectedValue(mockError);

        // WHEN
        const { result } = renderHook(() => useAuthClaims());

        // THEN
        await waitFor(() => {
            expect(result.current.claims).toBeNull();
            expect(result.current.error).toEqual(mockError);
        });
    });
});
