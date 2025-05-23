import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "@tanstack/react-router";
import { useProtectedRoute } from "../../hooks/useProtectedRoute.ts";

const SecretPage = () => {
    const params = useParams({ from: "/confidential/$secretId" });
    const { isAuthenticated, isLoading } = useAuth0();

    // redirect to login page if the user is not authenticated and auth is not loading
    useProtectedRoute();

    // don't display the page until we know if the user is authenticated or not
    if (isLoading || !isAuthenticated) {
        return <div>...</div>;
    }
    return (
        <div>
            <h1>Secret Page</h1>
            <p>Secret id {params.secretId}</p>
        </div>
    );
};

export default SecretPage;
