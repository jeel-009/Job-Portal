import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../utils/constant';
import { toast } from 'sonner';

const ApplicantsTable = () => {
    const { applicants = [] } = useSelector((store) => store.application);
    console.log("Applicants:", applicants);
console.log("Length:", applicants.length);

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.put(
                `${APPLICATION_API_END_POINT}/status/${id}/update`,
                { status },
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {applicants.length > 0 ? (
                    applicants.map((a) => (
                        <TableRow key={a._id}>
                            <TableCell>
                                {a?.applicant?.fullname || "NA"}
                            </TableCell>

                            <TableCell>
                                {a?.applicant?.email || "NA"}
                            </TableCell>

                            <TableCell>
                                {a?.applicant?.phoneNumber || "NA"}
                            </TableCell>

                            <TableCell>
                                {a?.applicant?.profile?.resume ? (
                                    <a
                                        href={a.applicant.profile.resume}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        View Resume
                                    </a>
                                ) : (
                                    "NA"
                                )}
                            </TableCell>

                            <TableCell>
                                {a?.createdAt
                                    ? a.createdAt.split("T")[0]
                                    : "NA"}
                            </TableCell>

                            <TableCell>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button>
                                            <MoreHorizontal className="cursor-pointer" />
                                        </button>
                                    </PopoverTrigger>

                                    <PopoverContent className="w-36 p-2">
                                        <div className="flex flex-col gap-1">
                                            <div
                                                onClick={() =>
                                                    statusHandler(
                                                        "accepted",
                                                        a._id
                                                    )
                                                }
                                                className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                                            >
                                                <span className="text-green-600 font-medium">
                                                    ✓ Accept
                                                </span>
                                            </div>

                                            <div
                                                onClick={() =>
                                                    statusHandler(
                                                        "rejected",
                                                        a._id
                                                    )
                                                }
                                                className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                                            >
                                                <span className="text-red-600 font-medium">
                                                    ✗ Reject
                                                </span>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={6}
                            className="text-center py-6 text-gray-500"
                        >
                            No Applicants Found
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default ApplicantsTable;