import { useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "@tanstack/react-router";
import Box from "../../components/Box.tsx";
import ErrorBanner from "../../components/ErrorBanner.tsx";
import PageTitle from "../../components/PageTitle.tsx";
import SecretsList from "../../components/SecretsList.tsx";
import { GET_SECRETS } from "../../graphql/queries/secrets.ts";
import { useAuthClaims } from "../../hooks/auth/useAuthClaims.ts";
import { useOrgGuard } from "../../hooks/auth/useOrgGuard.tsx";
import { useProtectedRoute } from "../../hooks/auth/useProtectedRoute.ts";

const AUTHORIZED_ORG_ID = "org_L8aaj0QmOnS3r7G6";

const SecretPage = () => {
    const params = useParams({ from: "/confidential/$secretId" });
    const { isAuthenticated } = useAuth0();

    // redirect to login page if the user is not authenticated and auth is not loading
    // could be done in the context of tansatck router to redirect in beforeLoad if we have more routes
    useProtectedRoute();

    const { claims, error: errorClaims } = useAuthClaims();

    const { isAuthorized, isLoading: isLoadingOrgAuthorization } = useOrgGuard(AUTHORIZED_ORG_ID);

    const {
        data,
        loading: loadingQuery,
        error: errorQuery,
    } = useQuery(GET_SECRETS, {
        variables: { orgId: claims?.org_id },
        skip: !claims?.org_id, // don't run the request if id not available yet
    });

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="p-5">
            <PageTitle
                title="Secret page"
                subtitle="This is a protected page that displays secrets for a specific organisation."
            >
                <p className="text-xs mt-2 dark:text-slate-400 text-slate-600">
                    Here is the url param: {params.secretId} (it can be used to query the database)
                </p>
            </PageTitle>

            <Box>
                {!isAuthorized && !isLoadingOrgAuthorization && (
                    <ErrorBanner
                        title="Non authorized"
                        message="You should belong to the right organization to see secrets projects from the database"
                    />
                )}

                {isAuthorized && (
                    <>
                        <h2 className="uppercase text-lg sm:text-3xl">
                            Here are the saved secrets for your organization:
                        </h2>
                        {loadingQuery && <p>Loading secrets from database...</p>}
                        {data?.secrets.items && <SecretsList secrets={data.secrets.items} />}
                        {errorQuery && (
                            <div className="mt-3">
                                <ErrorBanner
                                    title={"Something went wrong when requesting secrets from database"}
                                    message={errorQuery.message}
                                />
                            </div>
                        )}
                    </>
                )}
            </Box>

            <Box>
                {errorClaims ? (
                    <ErrorBanner
                        title="Error"
                        message={`❌ Something went wrong when extracting your claims: ${errorClaims.message}`}
                    />
                ) : (
                    <>
                        <h2 className="uppercase text-lg sm:text-3xl">Here are your claims:</h2>
                        <p className="text-xs sm:text-sm mb-5">
                            (including org id if you are logged as a member of an organization)
                        </p>

                        <pre data-testid="claims" className="whitespace-pre-wrap overflow-auto text-xs sm:text-sm">
                            {JSON.stringify(claims, null, 2)}
                        </pre>
                    </>
                )}
            </Box>
        </div>
    );
};

export default SecretPage;
