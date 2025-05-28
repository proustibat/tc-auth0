import { render, screen } from "@testing-library/react";
import ErrorBanner from "../ErrorBanner";

describe("ErrorBanner", () => {
    it("renders properly", () => {
        // GIVEN
        const title = "Error Title";
        const message = "This is an error message.";

        // WHEN
        render(<ErrorBanner title={title} message={message} />);

        // THEN
        expect(screen.getByRole("alert")).toBeInTheDocument();
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(message)).toBeInTheDocument();
    });
});
