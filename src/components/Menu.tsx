import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "@tanstack/react-router";
import classNames from "classnames";
import { LogInOutButton } from "./LogInOutButton.tsx";

const navigation = [
    { name: "Home (public)", to: "/" },
    { name: "Hello (public)", to: "/hello" },
    { name: "Org secrets (protected)", to: "/confidential/$secretId", params: { secretId: "123" } },
];

const linksClassNames = {
    base: classNames(
        "text-slate-100 hover:bg-slate-100 hover:text-slate-800",
        "rounded-md px-3 py-2 text-sm font-medium"
    ),
    active: classNames("bg-slate-800 text-slate-100", "rounded-md px-3 py-2 text-sm font-medium"),
};

const linksClassNamesMobile = {
    base: classNames(
        "text-slate-100 hover:bg-slate-100 hover:text-slate-800",
        "block rounded-md px-3 py-2 text-base font-medium"
    ),
    active: classNames("bg-slate-800 text-slate-100", "block rounded-md px-3 py-2 text-base font-medium"),
};

const Menu = () => {
    return (
        <Disclosure as="nav" className="bg-[#0047BB]">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white hover:text-slate-900 ring-1 ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <img
                                alt="Thundercode Auth0"
                                src="https://media.licdn.com/dms/image/v2/D4E0BAQG0zNopiygxNA/company-logo_200_200/B4EZVwcOOcHcAI-/0/1741348201751/thundercodeai_logo?e=2147483647&v=beta&t=EMtJUzeXZpk7Czf4dQXTJAb7M-HZe_X4hBgYL5An1Do"
                                className="h-8 w-auto"
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.to}
                                        params={item.params}
                                        className={linksClassNames.base}
                                        activeProps={{
                                            className: linksClassNames.active,
                                        }}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <LogInOutButton />
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.to}
                            params={item.params}
                            className={linksClassNamesMobile.base}
                            activeProps={{
                                className: linksClassNamesMobile.active,
                            }}
                        >
                            <DisclosureButton>{item.name}</DisclosureButton>
                        </Link>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
};

export default Menu;
