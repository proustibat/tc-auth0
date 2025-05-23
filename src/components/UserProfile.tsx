import { useAuth0 } from "@auth0/auth0-react";

export const UserProfile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) return <div>Loading...</div>;
    if (!isAuthenticated || !user) return null;

    return (
        <section>
            <h2>Hi {user.given_name || user.nickname || user.name}!</h2>
            {user.picture && <img alt={user.name} src={user.picture} referrerPolicy="no-referrer" />}
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </section>
    );
};
