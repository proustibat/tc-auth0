import { Link } from "@tanstack/react-router";
import { LogInOutButton } from "./LogInOutButton.tsx";

const Menu = () => {
    return (
        <header>
            <LogInOutButton />
            <ul>
                <li>
                    <Link
                        // disabled
                        activeProps={{
                            style: { color: "gray" },
                        }}
                        to="/"
                    >
                        Home page (public)
                    </Link>
                </li>
                <li>
                    <Link to="/hello">Hello page (public)</Link>
                </li>
                <li>
                    <Link to="/confidential/$secretId" params={{ secretId: "123" }}>
                        Secret page (protected)
                    </Link>
                </li>
            </ul>
            <hr />
        </header>
    );
};

export default Menu;
