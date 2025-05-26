import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const httpLink = createHttpLink({
    // uri: "https://dab-thundercode-app.azurewebsites.net/graphql",
    uri: "https://dab-thundercode-dotnet-h0dkcfgncrgaexh9.canadacentral-01.azurewebsites.net/graphql",
});

export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
    const { getAccessTokenSilently, isLoading } = useAuth0();
    const [client, setClient] = useState<ApolloClient<unknown> | null>(null);

    useEffect(() => {
        const setup = async () => {
            const authLink = setContext(async (_, { headers }) => {
                const token = await getAccessTokenSilently();
                return {
                    headers: {
                        ...headers,
                        Authorization: `Bearer ${token}`,
                    },
                };
            });

            const client = new ApolloClient({
                link: authLink.concat(httpLink),
                cache: new InMemoryCache(),
            });

            setClient(client);
        };
        setup();
    }, [getAccessTokenSilently]);

    if (isLoading || !client) return <div>Chargement Apollo...</div>;

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
