import { useAuth0 } from "@auth0/auth0-react";
import Box from "./Box.tsx";

export const UserProfile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) return <div>Loading...</div>;
    if (!isAuthenticated || !user) return null;

    return (
        <Box>
            <div className="flex items-center gap-3">
                {user.picture && (
                    <img
                        alt={user.name}
                        src={user.picture}
                        className="inline-block size-10 rounded-full ring-2 ring-white"
                        referrerPolicy="no-referrer"
                    />
                )}
                <h2 className="uppercase text-xl sm:text-4xl">Hi {user.given_name || user.nickname || user.name}!</h2>
            </div>
            <p className="mt-4 mb-1 text-sm sm:text-lg">Here is your profile information:</p>

            <pre className="whitespace-pre-wrap overflow-auto text-xs sm:text-sm">{JSON.stringify(user, null, 2)}</pre>
        </Box>
    );
};
