"use client";

import React, { useState } from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
    name: z.string().min(4, {
        message: "Name must be at least 4 characters.",
    }),
    username: z.string().refine((s) => !s.includes(" "), "No Spaces!"),
    email: z.string().email({ message: "Email is required" }),
});

type FormSchema = z.infer<typeof formSchema>;

const AddUserForm = () => {
    const { data } = useSession();
    const [tempPassword, setTempPassword] = useState("");
    const { toast } = useToast();

    // @ts-ignore
    const apiToken = data.apiToken;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async ({ email, name, username }: FormSchema) => {
        const res = await fetch(
            `${process.env.INTERNAL_API_URL}/user/createUser`,
            {
                cache: "no-store",
                method: "POST",
                headers: {
                    authorization: `Bearer ${apiToken}`,
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    username,
                }),
            },
        );

        if (!res.ok) {
            const { message } = await res.json();
            toast({
                variant: "destructive",
                title: message,
            });

            return;
        }

        const data = await res.json();

        console.log(data);

        setTempPassword(data.userPassword);
    };

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="name" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This will be user display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="username" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter a unique username
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is user email.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="" type="submit">
                        Add User
                    </Button>
                </form>
            </Form>
            {tempPassword !== "" && (
                <div className="mt-10 flex space-x-8">
                    <h2 className="font-semibold">Password of User: </h2>
                    <p>{tempPassword}</p>
                </div>
            )}
        </>
    );
};

export default AddUserForm;
