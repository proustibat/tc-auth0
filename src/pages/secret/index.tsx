import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "@tanstack/react-router";
import { useAuthClaims } from "../../hooks/useAuthClaims.ts";
import { useProtectedRoute } from "../../hooks/useProtectedRoute.ts";

const SecretPage = () => {
    const params = useParams({ from: "/confidential/$secretId" });
    const { isAuthenticated, isLoading } = useAuth0();

    // redirect to login page if the user is not authenticated and auth is not loading
    useProtectedRoute();

    const { claims, error } = useAuthClaims();

    // don't display the page until we know if the user is authenticated or not
    if (isLoading || !isAuthenticated) {
        return <div>...</div>;
    }
    return (
        <div>
            <h1>Secret Page</h1>
            <p>Secret id {params.secretId}</p>
            <section>
                <h2>Claims</h2>
                {error ? (
                    <p>Error when extracting claims : {error.message}</p>
                ) : (
                    <>
                        <h3>Extracts :</h3>
                        <pre>{JSON.stringify(claims, null, 2)}</pre>
                    </>
                )}
            </section>
        </div>
    );
};

export default SecretPage;
