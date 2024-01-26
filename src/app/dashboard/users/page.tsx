import { buttonVariants } from "@/components/ui/button";
import UserTable from "@/components/user-table";
import Link from "next/link";

const page = async () => {
    return (
        <div className=" h-full w-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight">Users</h2>
                </div>
                <div>
                    <Link
                        href={"/dashboard/users/add"}
                        className={buttonVariants()}
                    >
                        Add User
                    </Link>
                </div>
            </div>
            <UserTable />
        </div>
    );
};

export default page;
