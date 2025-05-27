import PageTitle from "../../components/PageTitle.tsx";

const HelloPage = () => {
    return (
        <div className="p-5">
            <PageTitle title="Hello page" subtitle="This is a public page without any restricted content" />
        </div>
    );
};

export default HelloPage;
