import { GET_SECRETS } from "../graphql/queries/secrets.ts";
import { organization_id } from "./claims.ts";

const resultQuerySecretsWithRightOrg = {
    data: {
        secrets: {
            items: [
                {
                    id: 1,
                    name: "Mocked secret 1",
                    description: "bla bli blou",
                    organization_id,
                },
                {
                    id: 2,
                    name: "Mocked secret 2",
                    description: "bla bli blou",
                    organization_id,
                },
            ],
        },
    },
};

export const apolloMocks = [
    {
        request: {
            query: GET_SECRETS,
            variables: { orgId: organization_id },
        },
        result: resultQuerySecretsWithRightOrg,
    },
];

export const apolloMocksWithError = [
    {
        request: {
            query: GET_SECRETS,
            variables: { orgId: organization_id },
        },
        error: new Error("Oopsie it's a mock error"),
    },
];
