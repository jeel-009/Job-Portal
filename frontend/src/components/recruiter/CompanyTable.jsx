import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pen } from "lucide-react";

import { MoreHorizontal } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useSelector } from 'react-redux';
import { store } from '@/redux/store';
import { useNavigate } from 'react-router-dom';
import { compile } from 'tailwindcss';



export default function CompanyTable() {
    const navigate = useNavigate();
    const { companies,searchText } = useSelector(store => store.company);
    const[filterCompnay,setFilterCompany]=useState(companies);
   useEffect(() => {
    const filtered = companies.filter((c) => {
        if (!searchText) return true;
        return c?.name?.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilterCompany(filtered); 
}, [companies, searchText]);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {
                    filterCompnay.length <= 0 ? (<span>You Hav'nt Registered any Company Yet</span>) : (
                        filterCompnay?.map((company) => (
                            <TableRow key={company._id}>
                                <TableCell >
                                    <img
                                        src={company.logo || "https://via.placeholder.com/40"}
                                        alt={company.name}
                                        className="h-8 w-8 rounded-full object-cover"
                                    />
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="cursor-pointer" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 p-2">
                                            <div
                                                onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                className="flex items-center gap-2 cursor-pointer">
                                                <Pen className="h-4 w-4" />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        )
                        ))}
            </TableBody>
        </Table>
    );
}