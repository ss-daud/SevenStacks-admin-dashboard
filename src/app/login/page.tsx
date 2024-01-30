"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

const page = () => {
    const { register, handleSubmit } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
    });
    const { toast } = useToast();
    const router = useRouter();

    const onSubmit: SubmitHandler<LoginSchemaType> = async ({
        email,
        password,
    }) => {
        const response = await signIn("credentials", {
            redirect: false,
            email: email,
            password: password,
            callbackUrl: "http://localhost:3000/dashboard",
        });

        if (response?.error) {
            toast({
                variant: "destructive",
                title: "Invalid credentials",
            });
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="w-[400px]">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-2xl">
                            Admin Sign in
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...register("email")}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password")}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit">
                            Login
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default page;
