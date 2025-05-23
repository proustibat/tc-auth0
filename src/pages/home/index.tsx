import { useAuth0 } from "@auth0/auth0-react";
import { UserProfile } from "../../components/UserProfile.tsx";

const HomePage = () => {
    const { isAuthenticated } = useAuth0();
    return (
        <>
            <h1>Home Page</h1>
            {!isAuthenticated && <p>Please login to your account to see your profile information</p>}
            <UserProfile />
        </>
    );
};

export default HomePage;
