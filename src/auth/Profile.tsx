import { useAuth0 } from "@auth0/auth0-react";

export const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) return <div>Loading...</div>;
    if (!isAuthenticated || !user) return null;

    return (
        <div>
            <h1>Hi {user.nickname || user.name}!</h1>
            {user.picture && <img alt={user.name} src={user.picture} referrerPolicy="no-referrer" />}
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    );
};
