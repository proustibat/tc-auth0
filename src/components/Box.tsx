import type { PropsWithChildren } from "react";

const Box = ({ children }: PropsWithChildren) => {
    return (
        <section className="dark:shadow-slate-950 shadow-slate-300 container mx-auto bg-slate-200 dark:bg-slate-800 rounded-xl px-5 py-5 mt-5 dark:text-slate-300 text-slate-950 shadow-sm">
            {children}
        </section>
    );
};
export default Box;
