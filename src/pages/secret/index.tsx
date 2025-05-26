import { gql, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "@tanstack/react-router";
import { useAuthClaims } from "../../hooks/useAuthClaims.ts";
import { useOrgGuard } from "../../hooks/useOrgGuard.tsx";
import { useProtectedRoute } from "../../hooks/useProtectedRoute.ts";

const AUTHORIZED_ORG_ID = "org_L8aaj0QmOnS3r7G6";

const GET_SECRETS = gql`
  query GetSecrets {
    secrets {
      items {
        id
        name
      }
    }
  }
`;

const SecretPage = () => {
    const params = useParams({ from: "/confidential/$secretId" });
    const { isAuthenticated, isLoading } = useAuth0();

    // redirect to login page if the user is not authenticated and auth is not loading
    useProtectedRoute();

    const { claims, error: errorAuth } = useAuthClaims();

    const { isAuthorized } = useOrgGuard(AUTHORIZED_ORG_ID);

    const { data, loading, error: errorQuery } = useQuery(GET_SECRETS);

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

            <section>
                <h2>Secrets</h2>
                <ul>
                    {data?.secrets.items.map((secret: any) => (
                        <li key={secret.id}>
                            <strong>{secret.name}</strong>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default SecretPage;
