import { useAuth0 } from "@auth0/auth0-react";
import PageTitle from "../../components/PageTitle.tsx";
import { UserProfile } from "../../components/UserProfile.tsx";

const HomePage = () => {
    const { isAuthenticated } = useAuth0();
    return (
        <div className="p-5">
            <PageTitle title="Home page" subtitle="Here is a public page with restricted content about your profile!">
                {!isAuthenticated && (
                    <div className="text-xs mt-5">Please login to your account to see your profile information</div>
                )}
            </PageTitle>
            <UserProfile />
        </div>
    );
};

export default HomePage;
