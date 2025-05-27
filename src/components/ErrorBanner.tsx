interface ErrorBannerProps {
    title: string;
    message: string;
}

const ErrorBanner = ({ title, message }: ErrorBannerProps) => {
    return (
        <div className="container mx-auto bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
            <p className="font-bold">{title}</p>
            <p>{message}</p>
        </div>
    );
};
export default ErrorBanner;
