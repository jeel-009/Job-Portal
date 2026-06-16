import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CreateCompany = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState("");

    const registerCompany = async () => {
        try {

            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data))
                toast.success(res?.data?.message);
                const companyId = res?.data?.company?._id;
                setTimeout(() => navigate(`/admin/companies/${companyId}`), 1000) //dely for 1 sec
               
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className='max-w-4xl mx-auto my-10'>
            <div className='my-10'>
                <h1 className='font-bold text-2xl'>Your Company Name</h1>
                <p className='text-gray-500 text-sm'>What would you like to name your company? You can change this later.</p>
            </div>

            <label className='text-sm font-medium'>Company Name</label>
            <Input
                className='my-2'
                placeholder='JobHunt, Microsoft etc.'
                defaultValue='Google'
                onChange={(e) => setCompanyName(e.target.value)}
            />

            <div className='flex items-center gap-2 my-10'>
                <Button
                    variant='outline'
                    onClick={() => navigate('/admin/companies')}
                >
                    Cancel
                </Button>
                <Button className='bg-black hover:bg-gray-800' onClick={registerCompany}>
                    Continue
                </Button>
            </div>
        </div>
    )
}

export default CreateCompany