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
import { Textarea } from "./ui/textarea";
import { useSession } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const formSchema = z.object({
    name: z.string().min(4, {
        message: "Name must be at least 4 characters.",
    }),
    template: z.string({
        required_error: "template is required",
    }),
});

type FormSchema = z.infer<typeof formSchema>;

const AddTemplateForm = () => {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const { data } = useSession();
    const { toast } = useToast();
    const router = useRouter();

    // @ts-ignore
    const apiToken = data.apiToken;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            template: "",
        },
    });

    const onSubmit = async ({ name, template }: FormSchema) => {
        console.log(name, value);
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/template`, {
            cache: "no-store",
            method: "POST",
            headers: {
                authorization: `Bearer ${apiToken}`,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                name,
                template: value,
            }),
        });

        if (!res.ok) {
            console.log("Some Error");
            console.log(res);
            toast({
                variant: "destructive",
                title: "Template name already exists",
            });
            return;
        }

        const data = await res.json();

        toast({ title: "New template created" });
        setLoading(false);
        router.push("/dashboard/templates");
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex h-full flex-col gap-8 space-y-4"
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

                <ReactQuill
                    placeholder="Enter Template"
                    className="h-[290px] "
                    theme="snow"
                    value={value}
                    onChange={setValue}
                />

                {/* <FormField
                    control={form.control}
                    name="template"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Template</FormLabel>
                            <FormControl>
                                <Textarea {...field} rows={10} />
                            </FormControl>
                            <FormDescription>
                                Enter your template here.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
                <div>
                    <Button className="" type="submit" disabled={loading}>
                        Add Template
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default AddTemplateForm;
