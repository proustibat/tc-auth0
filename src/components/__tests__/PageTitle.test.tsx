import { render, screen } from "@testing-library/react";
import PageTitle from "../PageTitle";

describe("PageTitle", () => {
    it("should render properly", () => {
        // GIVEN
        const title = "Test Title";
        const subtitle = "Test Subtitle";
        const children = <div>Test Children</div>;

        // WHEN
        render(
            <PageTitle title={title} subtitle={subtitle}>
                {children}
            </PageTitle>
        );

        // THEN
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(subtitle)).toBeInTheDocument();
        expect(screen.getByText("Test Children")).toBeInTheDocument();
    });
});
