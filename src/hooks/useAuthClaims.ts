// src/auth/useAuthClaims.ts
import { useAuth0 } from "@auth0/auth0-react";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

type TokenClaims = {
    org_id?: string;
    email?: string;
    scope?: string;
    exp?: number;
    [key: string]: unknown;
};

export const useAuthClaims = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [claims, setClaims] = useState<TokenClaims | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const extractClaims = async () => {
            try {
                const token = await getAccessTokenSilently();
                const decoded = jwtDecode<TokenClaims>(token);
                setClaims(decoded);
            } catch (err) {
                setError(err as Error);
            }
        };

        extractClaims();
    }, [getAccessTokenSilently]);

    return { claims, error };
};
