import axios from "axios";
import TemplateTableOptions from "./template-table-options";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

async function getData() {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER}/template/all`,
        );
        return response.data;
    } catch (error) {
        return [];
    }
}

const TemplateTable = async () => {
    const data = await getData();
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="">Description</TableHead>
                        <TableHead className="text-center"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.templates.length > 0 &&
                        data?.templates.map((template: any) => {
                            return (
                                <TableRow>
                                    <TableCell>{template.name}</TableCell>
                                    <TableCell className="w-4/6">
                                        <p className="line-clamp-5">
                                            {template.template}
                                        </p>
                                    </TableCell>
                                    <TableCell className="flex items-center justify-start">
                                        <TemplateTableOptions
                                            id={template._id}
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </div>
    );
};

export default TemplateTable;
