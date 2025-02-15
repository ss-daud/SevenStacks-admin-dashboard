"use client";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import ButtonTableEdit from "./button-table-edit";
import { FaAlignLeft } from "react-icons/fa";
import axios from "axios";
import { useToast } from "./ui/use-toast";

async function getData() {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER}/buttons/list`,
            { cache: "no-store" } // Prevent caching for fresh data
        );

        if (!response.ok) {
            throw new Error("Failed to fetch button data");
        }

        const data = await response.json();
        return data.buttons || []; // Ensure it always returns an array
    } catch (error) {
        console.error("Error fetching button data:", error);
        return [];
    }
}

const ButtonTable = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [selectedButton, setSelectedButton] = useState<{ name: string; text: string } | null>(null);
    const toast = useToast();
    const handleOpenDrawer = (button: any) => {
        setSelectedButton(button);
        setDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setDrawerOpen(false);
        setSelectedButton(null);
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        getData().then(setData);
    }, []);

    const handleSubmit = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/buttons/edit`, { name: selectedButton?.name, text: selectedButton?.text });
            if (res.data.success) {
                toast.toast(res.data.message);
                handleCloseDrawer();
                window.location.reload();
            }
        } catch (error) {

        }
    }

    return (
        <div className="relative">
            {/* Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="">Description</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length > 0 ? (
                        data.map((button: any, index: number) => (
                            <TableRow key={button._id || index}>
                                <TableCell>{button.name}</TableCell>
                                <TableCell className="w-4/6">
                                    <p className="line-clamp-5">{button.text}</p>
                                </TableCell>
                                <TableCell className="flex items-center justify-start">
                                    <button
                                        onClick={() => handleOpenDrawer(button)}
                                        className="bg-black text-white px-3 py-1 rounded-md"
                                    >
                                        Edit
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center">
                                No buttons found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Drawer */}
            {/* {isDrawerOpen && ( */}
            <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-end duration-200 ${isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <div
                    className={`bg-white h-full w-[40%] shadow-lg p-6 relative rounded-tl-2xl rounded-bl-2xl transform transition-transform duration-500 ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
                >
                    <h2 className="text-2xl font-bold flex gap-8 items-center"><FaAlignLeft onClick={handleCloseDrawer} className="cursor-pointer" />Edit Button</h2>
                    <p className="mt-4 text-gray-700 mt-8">
                        <span className="font-bold text-[1.2rem]">Button Name:</span>  {selectedButton?.name}
                    </p>
                    <textarea
                        className="w-full border rounded-md p-2 mt-6"
                        value={selectedButton?.text || ""}
                        onChange={(e) =>
                            setSelectedButton((prev) => prev ? { ...prev, text: e.target.value } : null)
                        }
                    />

                    <button className="mt-4 bg-black text-white px-4 py-2 rounded-md" onClick={handleSubmit}>
                        Save Changes
                    </button>
                </div>
            </div>
            {/* )} */}
        </div>
    );
};

export default ButtonTable;
