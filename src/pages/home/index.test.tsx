import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./index";

describe("Home Page", () => {
    it("should render Hi text", () => {
        render(<HomePage />);
        const hiText = screen.getByText(/Home Page/i);
        expect(hiText).toBeInTheDocument();
    });
});
