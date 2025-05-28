import { render, screen } from "@testing-library/react";
import Box from "../Box";

describe("Box", () => {
    it("renders properly", () => {
        // GIVEN/WHEN
        const childrenEl = "Hello world!";
        render(<Box>{childrenEl}</Box>);

        // THEN
        expect(screen.getByText(childrenEl)).toBeInTheDocument();
    });
});
