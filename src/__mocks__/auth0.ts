import type { Auth0ContextInterface } from "@auth0/auth0-react";
import { vi } from "vitest";
import { organization_id } from "./claims.ts";

export const userProfileWithOrg = {
    given_name: "Jennifer",
    family_name: "Proust",
    nickname: "jennifer.proust",
    name: "Jennifer Proust",
    picture: "https://lh3.googleusercontent.com/a/ACg8ocJqKjULtGlHcn1xg0jsfR7kXcA9XkM9pvud3dMd8lBJWc3qLcnQ=s96-c",
    updated_at: "2025-05-27T16:56:00.011Z",
    email: "jennifer.proust@gmail.com",
    email_verified: true,
    sub: "google-oauth2|101617240911533138982",
    org_id: organization_id,
};

export const auth0Authenticated = {
    isAuthenticated: true,
    user: userProfileWithOrg,
    loginWithRedirect: vi.fn(),
} as unknown as Auth0ContextInterface;

export const auth0NotAuthenticated = {
    isAuthenticated: false,
    user: null,
    loginWithRedirect: vi.fn(),
} as unknown as Auth0ContextInterface;
