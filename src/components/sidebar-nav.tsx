"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string;
        title: string;
    }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <nav
            className={cn(
                "flex justify-between md:h-full md:flex-col",
                className,
            )}
            {...props}
        >
            <div className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 ">
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            pathname === item.href
                                ? "bg-muted hover:bg-muted"
                                : "hover:cursor-pointer hover:bg-muted hover:underline",
                            "justify-start",
                        )}
                    >
                        {item.title}
                    </Link>
                ))}
            </div>
            <div className="w-full">
                <Button
                    className="flex w-full justify-start"
                    variant={"ghost"}
                    onClick={() => {
                        signOut({ redirect: false });
                        router.push("/login");
                    }}
                >
                    Logout
                </Button>
            </div>
        </nav>
    );
}
