import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { getServerSession } from "next-auth";
import axios from "axios";
import ChangeStatusButton from "./change-status-button";
import { authOptions } from "@/lib/authOptions";
import UserTableOptions from "./user-table-options";
import Adminstatus from "./Adminstatus";

async function getData(token: string) {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER}/user/all`,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        return [];
    }
}

const UserTable = async () => {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    const apiToken = session.apiToken;

    const data = await getData(apiToken);

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center">Admin</TableHead>
                        <TableHead className="text-center"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.users?.length > 0 &&
                        data.users.map((user: any) => {
                            return (
                                <TableRow>
                                    <TableCell className="font-medium">
                                        {user._id}
                                    </TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell className="text-center">
                                        <ChangeStatusButton
                                            originalStatus={user.isActive}
                                            adminApiToken={apiToken}
                                            userId={user._id}
                                        />
                                    </TableCell>
                                    <TableCell className="text-center">
                                       <Adminstatus
                                            originalStatus={user.isAdmin}
                                            adminApiToken={apiToken}
                                            userId={user._id}
                                        />
                                    </TableCell>
                                    <TableCell className="flex items-center justify-start">
                                        <UserTableOptions id={user._id} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </div>
    );
};

export default UserTable;
