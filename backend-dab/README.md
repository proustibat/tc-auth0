# Azure Data API Builder configuration

This project configures Azure Data API Builder (DAB) to expose a secure GraphQL endpoint for a `secrets` table in an Azure SQL Database.

## Configuration

- **Database**: Azure SQL (see `.env`)
- **Auth**: Auth0 JWT validation
- **GraphQL endpoint**: `/graphql`
- **Authorization**: Each user only sees rows with a matching `organization_id` from their token

## Deployment steps

1. Configure your Azure SQL database and update `.env` with the proper connection string.
2. Deploy this folder to Azure App Service as a Node.js app.
3. Ensure CORS and authentication settings match your frontend domain and Auth0 issuer.
4. From your frontend (e.g. deployed via Vercel), you can now call the GraphQL endpoint using Apollo Client.

## Security

- This configuration restricts `read` access to secrets matching the user's `org_id` claim from Auth0.
- Only authenticated users can access data.