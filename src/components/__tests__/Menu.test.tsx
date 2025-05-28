import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { PropsWithChildren } from "react";
import { describe, it, vi } from "vitest";
import Menu from "../Menu";

const onClickSpy = vi.fn();

vi.mock("@tanstack/react-router", () => ({
    Link: ({ children, to }: { to: string } & PropsWithChildren) => (
        <button type="button" onClick={() => onClickSpy(to)}>
            {children}
        </button>
    ),
}));

describe("Menu Component", () => {
    it("should render properly", () => {
        // GIVEN / WHEN
        render(<Menu />);

        // THEN
        expect(screen.getByText(/Home \(public\)/i)).toBeInTheDocument();
        expect(screen.getByText(/Hello \(public\)/i)).toBeInTheDocument();
        expect(screen.getByText(/Org secrets \(protected\)/i)).toBeInTheDocument();

        expect(screen.getByText("Open main menu")).toBeInTheDocument();

        const logo = screen.getByAltText("Thundercode Auth0");
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute("src", expect.stringContaining("thundercodeai_logo"));

        expect(screen.getByText("Login")).toBeInTheDocument();
    });

    it("should navigate to the correct route when a link is clicked", async () => {
        // GIVEN
        const user = userEvent.setup();
        render(<Menu />);

        // WHEN
        await user.click(screen.getByText(/Home \(public\)/i));
        await user.click(screen.getByText(/Hello \(public\)/i));
        await user.click(screen.getByText(/Org secrets \(protected\)/i));

        // THEN
        expect(onClickSpy).toHaveBeenCalledTimes(3);
        expect(onClickSpy).toHaveBeenCalledWith("/");
        expect(onClickSpy).toHaveBeenCalledWith("/hello");
        expect(onClickSpy).toHaveBeenCalledWith("/confidential/$secretId");
    });
});
