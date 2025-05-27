import { gql } from "@apollo/client";

export const GET_SECRETS = gql`
  query GetSecrets($orgId: String!) {
    secrets(filter: { organization_id: { eq: $orgId } }) {
      items {
        id
        name
        organization_id
        description
      }
    }
  }
`;
