import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";
import type { PropsWithChildren } from "react";
import { createErrorLink } from "./apolloErrorLink.ts";

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
    const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } = useAuth0();

    const httpLink = createHttpLink({
        uri: "https://dab-thundercode-dotnet-h0dkcfgncrgaexh9.canadacentral-01.azurewebsites.net/graphql",
    });

    const authLink = setContext(async (_, { headers }) => {
        const token = isAuthenticated ? await getAccessTokenSilently().catch(() => null) : null;

        return {
            headers: {
                ...headers,
                Authorization: token ? `Bearer ${token}` : "",
            },
        };
    });

    const client = new ApolloClient({
        link: from([
            // biome-ignore lint/suspicious/noExplicitAny: dirty but simpler for an interview test
            createErrorLink({ loginWithRedirect } as any),
            authLink,
            httpLink,
        ]),
        cache: new InMemoryCache(),
    });

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
