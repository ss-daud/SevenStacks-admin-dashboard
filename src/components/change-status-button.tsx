"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useToast } from "./ui/use-toast";

import { Loader2 } from "lucide-react";

type ButttonProps = {
    originalStatus: boolean;
    adminApiToken: string;
    userId: string;
};

const ChangeStatusButton = ({
    originalStatus,
    adminApiToken,
    userId,
}: ButttonProps) => {
    const [buttonStatus, setButtonStatus] = useState<boolean>(originalStatus);
    const [isPending, setIsPending] = useState<boolean>(false);
    const { toast } = useToast();

    const activateUserHandler = async () => {
        setIsPending(true);
        try {
            const response = await axios.patch(
                `${process.env.INTERNAL_API_URL}/user/status`,
                {
                    status: !buttonStatus,
                    userId,
                },
                {
                    headers: {
                        authorization: `Bearer ${adminApiToken}`,
                    },
                },
            );
            toast({ title: "User Status Changed" });
            setButtonStatus(!buttonStatus);
        } catch (error) {
            toast({
                title: "Unable to delete user",
                variant: "destructive",
            });
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Button
            variant={buttonStatus && !isPending ? "default" : "outline"}
            onClick={activateUserHandler}
            disabled={isPending}
        >
            {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
            ) : buttonStatus ? (
                "Active"
            ) : (
                "Deactive"
            )}
        </Button>
    );
};

export default ChangeStatusButton;
