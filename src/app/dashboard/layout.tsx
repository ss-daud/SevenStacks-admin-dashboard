import { SidebarNav } from "@/components/sidebar-nav";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import { title } from "process";

const sidebarNavItems = [
    {
        title: "Users",
        href: "/dashboard/users",
    },
    {
        title: "Templates",
        href: "/dashboard/templates",
    },
    {
        title : "Buttons",
        href : "/dashboard/buttons"
    }
];

interface LayoutProps {
    children: React.ReactNode;
}

const layout = async ({ children }: LayoutProps) => {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    const token = session?.apiToken;

    if (!token) {
        redirect("/login");
    }

    return (
        <>
            <div className="min-h-screen">
                <div className="flex h-screen flex-col space-y-8 overflow-hidden lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 border-r border-primary p-10 md:h-screen lg:w-1/5">
                        <SidebarNav items={sidebarNavItems} />
                    </aside>
                    <div className="h-screen w-full flex-1 overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default layout;
