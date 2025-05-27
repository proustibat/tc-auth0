import { useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "@tanstack/react-router";
import SecretsList from "../../components/SecretsList.tsx";
import { GET_SECRETS } from "../../graphql/queries/secrets.ts";
import { useAuthClaims } from "../../hooks/auth/useAuthClaims.ts";
import { useOrgGuard } from "../../hooks/auth/useOrgGuard.tsx";
import { useProtectedRoute } from "../../hooks/auth/useProtectedRoute.ts";

const AUTHORIZED_ORG_ID = "org_L8aaj0QmOnS3r7G6";

const SecretPage = () => {
    const params = useParams({ from: "/confidential/$secretId" });
    const { isAuthenticated, isLoading } = useAuth0();

    // redirect to login page if the user is not authenticated and auth is not loading
    useProtectedRoute();

    const { claims, error: errorAuth } = useAuthClaims();

    const { isAuthorized } = useOrgGuard(AUTHORIZED_ORG_ID);

    const {
        data,
        loading,
        error: errorQuery,
    } = useQuery(GET_SECRETS, {
        variables: { orgId: claims?.org_id },
        skip: !claims?.org_id, // pour éviter de lancer la requête si l’ID n’est pas encore dispo
    });

    // don't display the page until we know if the user is authenticated or not
    if (isLoading || !isAuthenticated) {
        return <div>Loading authentication information...</div>;
    }

    if (loading) return <p>Loading secrets...</p>;
    if (errorQuery) return <p>Erreur GraphQL: {errorQuery.message}</p>;

    return (
        <div>
            <h1>Secret Page</h1>
            <p>Secret id {params.secretId}</p>
            <section>
                <h2>Claims</h2>
                {errorAuth ? (
                    <p>Error when extracting claims : {errorAuth.message}</p>
                ) : (
                    <>
                        <h3>Claims extracts :</h3>
                        <pre>{JSON.stringify(claims, null, 2)}</pre>
                    </>
                )}
                {!isAuthorized && <p>❌ Non authorized organisation</p>}
            </section>

            {data?.secrets.items && <SecretsList secrets={data.secrets.items} />}
        </div>
    );
};

export default SecretPage;
