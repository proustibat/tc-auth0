import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Loading from "../Loading";

describe("Loading Component", () => {
    it("should render properly with a message", () => {
        // GIVEN
        const message = "Loading data...";

        // WHEN
        render(<Loading message={message} />);

        // THEN
        expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
        expect(screen.getByTestId("message").textContent).toBe(message);
    });

    it("should render properly without a message", async () => {
        // GIVEN / WHEN
        render(<Loading />);

        //THEN
        expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
        expect(screen.queryByTestId("message")).not.toBeInTheDocument();
    });
});
