import { renderHook } from "@testing-library/react";
import { type Mock, vi } from "vitest";
import { useAuthClaims } from "../useAuthClaims.ts";
import { useOrgGuard } from "../useOrgGuard.tsx";

vi.mock("../useAuthClaims", () => ({
    useAuthClaims: vi.fn(),
}));

describe("useOrgGuard", () => {
    it("should return authorized state if org id matches", () => {
        // GIVEN
        (useAuthClaims as Mock).mockReturnValue({
            claims: { org_id: "123" },
        });

        // WHEN
        const { result } = renderHook(() => useOrgGuard("123"));

        // THEN
        expect(result.current.isAuthorized).toBe(true);
        expect(result.current.isLoading).toBe(false);
    });

    it("should return not authorized state if org id doesn't match", () => {
        // GIVEN
        (useAuthClaims as Mock).mockReturnValue({
            claims: { org_id: "456" },
        });

        // WHEN
        const { result } = renderHook(() => useOrgGuard("123"));

        // THEN
        expect(result.current.isAuthorized).toBe(false);
        expect(result.current.isLoading).toBe(false);
    });

    it("should return loading state when claims are null", () => {
        // GIVEN
        (useAuthClaims as Mock).mockReturnValue({
            claims: null,
        });

        // WHEN
        const { result } = renderHook(() => useOrgGuard("123"));

        // THEN
        expect(result.current.isAuthorized).toBe(null);
        expect(result.current.isLoading).toBe(true);
    });
});
