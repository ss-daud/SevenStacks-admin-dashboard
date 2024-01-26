import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const Home = () => {
    redirect("/dashboard");
    return (
        <div className="flex h-screen items-center justify-center">
            <Button>Click Me</Button>
        </div>
    );
};

export default Home;
