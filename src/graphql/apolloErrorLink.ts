import { onError } from "@apollo/client/link/error";
import type { Auth0Client } from "@auth0/auth0-spa-js";

export const createErrorLink = (auth0: Auth0Client) =>
    onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            for (const err of graphQLErrors) {
                console.log(err.extensions?.code);
                if (err.extensions?.code === "AUTH_NOT_AUTHENTICATED") {
                    console.warn("User not authenticated, redirecting...");
                    // can use auth0
                    console.log(auth0);
                    // Could be this since it's comes from ApolloWrapper
                    // auth0.loginWithRedirect({
                    //     appState: {
                    //         returnTo: window.location.pathname,
                    //     },
                    // });
                }
            }
        }

        if (networkError) {
            console.warn("[Network error]:", networkError);
        }
    });
