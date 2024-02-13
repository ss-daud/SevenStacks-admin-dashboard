"use client";

import React from "react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontalIcon, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const TemplateTableOptions = ({ id }: { id: number }) => {
    const { toast } = useToast();
    const { data } = useSession();
    const router = useRouter();
    // @ts-ignore
    const apiToken = data.apiToken;

    const deleteTemplateHandler = async () => {
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_SERVER}/template/${id}`,
                {
                    headers: {
                        authorization: `Bearer ${apiToken}`,
                    },
                },
            );
            toast({ title: "Template Deleted" });
            router.refresh();
        } catch (error) {
            toast({
                title: "Unable to delete template",
                variant: "destructive",
            });
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto flex h-8 items-center justify-center text-center"
                >
                    <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="space-x-3 text-destructive"
                    onClick={deleteTemplateHandler}
                >
                    <Trash2 className="h-5 w-5 text-destructive" />

                    <span>Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default TemplateTableOptions;
