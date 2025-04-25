"use client";

import { useState } from "react";
import axios from "axios";
import { useToast } from "./ui/use-toast";

type AdminStatusProps = {
    originalStatus: boolean;
    adminApiToken: string;
    userId: string;
};

const Adminstatus = ({ originalStatus, adminApiToken, userId }: AdminStatusProps) => {
    const [buttonStatus, setButtonStatus] = useState<boolean>(originalStatus);
    const [isPending, setIsPending] = useState<boolean>(false);
    const { toast } = useToast();

    const activateUserHandler = async () => {
        setIsPending(true);
        try {
            await axios.patch(
                `${process.env.INTERNAL_API_URL}/user/adminstatus`,
                { status: !buttonStatus, userId },
                { headers: { authorization: `Bearer ${adminApiToken}` } }
            );
            toast({ title: "Admin Status Changed" });
            setButtonStatus((prevStatus) => !prevStatus);
        } catch (error) {
            toast({ title: "Unable to update admin status", variant: "destructive" });
        } finally {
            setIsPending(false);
        }
    };

    return (
        <input
            type="checkbox"
            checked={buttonStatus}
            onChange={activateUserHandler}
            disabled={isPending}
        />
    );
};

export default Adminstatus;
