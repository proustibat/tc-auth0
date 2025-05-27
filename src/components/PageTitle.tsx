import type { PropsWithChildren } from "react";

interface PageTitleProps extends PropsWithChildren {
    title: string;
    subtitle?: string;
}

const PageTitle = ({ title, subtitle, children = null }: PageTitleProps) => {
    return (
        <div className="container mx-auto bg-slate-200 dark:bg-slate-800 rounded-xl px-5 py-10 sm:mt-3 shadow-sm dark:shadow-slate-950 shadow-slate-300">
            <div className="text-center">
                <h1 className="text-3xl font-semibold sm:text-5xl">{title}</h1>
                {subtitle && <p className="mt-8 font-medium text-pretty text-lg sm:text-xl">{subtitle}</p>}
                {children}
            </div>
        </div>
    );
};
export default PageTitle;
