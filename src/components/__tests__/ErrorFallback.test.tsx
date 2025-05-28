import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ErrorFallback from "../ErrorFallback";

describe("ErrorFallback", () => {
    it("renders properly", () => {
        // GIVEN
        const error = new Error("This is the error message");
        const resetErrorBoundary = vi.fn();

        // WHEN
        render(<ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />);

        // THEN
        expect(screen.getByText("Something bad happened !")).toBeInTheDocument();
        expect(screen.getByText("This is the error message")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /reload/i })).toBeInTheDocument();
    });

    it("should call the reset function when clicking on reload", async () => {
        // GIVEN
        const error = new Error("This is the error message");
        const resetErrorBoundary = vi.fn();
        const user = userEvent.setup();
        render(<ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />);

        // WHEN
        const button = screen.getByRole("button", { name: /reload/i });
        await user.click(button);

        // THEN
        expect(resetErrorBoundary).toHaveBeenCalledTimes(1);
    });
});
