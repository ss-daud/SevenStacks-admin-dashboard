import TemplateTable from "@/components/template-table";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
    return (
        <div className="h-full w-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight">
                        Templates
                    </h2>
                </div>
                <div>
                    <Link
                        href={"/dashboard/templates/add"}
                        className={buttonVariants()}
                    >
                        Add Template
                    </Link>
                </div>
            </div>
            <TemplateTable />
        </div>
    );
};

export default page;
