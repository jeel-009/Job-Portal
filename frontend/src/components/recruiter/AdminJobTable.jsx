import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Eye, Pen, MoreHorizontal } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AdminJobTable() {
    const navigate = useNavigate();
    const { allAdminJob, searchJobtext } = useSelector(store => store.job);
    const [filterJob, setFilterJob] = useState(allAdminJob);

    useEffect(() => {
        const filtered = allAdminJob.filter((j) => {
            if (!searchJobtext) return true;
            return j?.title?.toLowerCase().includes(searchJobtext.toLowerCase());
        });
        setFilterJob(filtered);
    }, [allAdminJob, searchJobtext]);

    return (
        <div className="rounded-lg border w-full">
            <Table className="w-full table-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filterJob.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                                No Job Found
                            </TableCell>
                        </TableRow>
                    ):(
                        filterJob.map((j) => (
                            <TableRow key={j._id}>
                                <TableCell className="font-medium">{j.companyId?.name}</TableCell>
                                <TableCell>{j.title}</TableCell>
                                <TableCell>{j.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="cursor-pointer" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-36 p-2">
                                            
                                            <div
                                                onClick={() => navigate(`/admin/jobs/${j._id}/applicants`)}
                                                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1.5 rounded mt-1"
                                            >
                                                <Eye className="h-4 w-4" />
                                                <span className="text-sm">Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}