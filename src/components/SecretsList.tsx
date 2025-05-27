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
        <section>
            <h2>Secrets</h2>
            <ul>
                {secrets.map((secret) => (
                    <li key={secret.id}>
                        <p>
                            <strong>{secret.name}</strong> ({secret.description})
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default SecretsList;
