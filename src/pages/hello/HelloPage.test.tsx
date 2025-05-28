import { render, screen } from "@testing-library/react";
import HelloPage from "./index.tsx";

describe("HelloPage", () => {
    it("should render properly", () => {
        // GIVEN / WHEN
        render(<HelloPage />);

        // THEN
        expect(screen.getByText("Hello page")).toBeInTheDocument();
        expect(screen.getByText("This is a public page without any restricted content")).toBeInTheDocument();
    });
});
