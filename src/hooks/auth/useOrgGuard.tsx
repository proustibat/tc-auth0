import { useEffect, useState } from "react";
import { useAuthClaims } from "./useAuthClaims.ts";

export const useOrgGuard = (allowedOrgId: string) => {
    const { claims } = useAuthClaims();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        if (!claims) return;

        if (claims.org_id === allowedOrgId) {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    }, [claims, allowedOrgId]);

    return {
        isAuthorized,
        isLoading: claims === null,
    };
};
