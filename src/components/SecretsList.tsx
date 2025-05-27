interface Secret {
    id: string;
    name: string;
    description: string;
    organization_id: string;
}

interface SecretListProps {
    secrets: Secret[];
}

const SecretsList = ({ secrets }: SecretListProps) => {
    return (
        <ul className="list-disc list-inside mt-3 sm:mt-5">
            {secrets.map((secret) => (
                <li key={secret.id}>
                    <span className="font-bold">{secret.name}</span> ({secret.description})
                </li>
            ))}
        </ul>
    );
};

export default SecretsList;
