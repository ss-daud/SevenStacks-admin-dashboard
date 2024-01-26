import AddUserForm from "@/components/add-user-form";
import { Separator } from "@/components/ui/separator";

const page = () => {
    return (
        <div className="space-y-6 p-10">
            <div>
                <h3 className="text-4xl font-medium">User</h3>
                <p className="text-xl text-muted-foreground">Add A New User</p>
            </div>
            <Separator />
            <div className="max-w-screen-md">
                <AddUserForm />
            </div>
        </div>
    );
};

export default page;
