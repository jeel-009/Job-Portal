import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Navbar } from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import CompanyTable from "./CompanyTable";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { setCompanies, setSearchText } from "@/redux/companySlice";
import { toast } from "sonner";

const Company = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setinput] = useState("");
    useEffect(() => {
        dispatch(setSearchText(input))
    }, [input])
    const GetallCompnies = async () => {
        try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                withCredentials: true
            })
            if (res?.data?.success) {
                dispatch(setCompanies(res.data.company));
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
    useEffect(() => {
        GetallCompnies()
    }, [])
    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto my-10">
                {/* Search + Button */}
                <div className="flex items-center justify-between mb-5">
                    <Input
                        className="max-w-sm"
                        placeholder="Search company..."
                        value={input}
                        onChange={(e) => setinput(e.target.value)}
                    />
                    <Button className="bg-black hover:bg-black" onClick={() => navigate('/admin/companies/create')}>
                        New Company
                    </Button>
                </div>
                <CompanyTable />

            </div>
        </>
    );
};

export default Company;