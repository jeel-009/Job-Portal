import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate, useParams } from 'react-router-dom'
import { Navbar } from '../shared/Navbar'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../utils/constant'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import useGetSingleCompnies from '../hooks/useGetSingleCompnies'


const CompanySetup = () => {
    const navigate = useNavigate();
    const { singleCompany } = useSelector(store => store.company)
    const [loading, setLoading] = useState(false);
    //for company Id
    const params = useParams();
    useGetSingleCompnies(params.id);

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null,
    });
    useEffect(() => {
        setInput({
            name: singleCompany?.name || "",
            description: singleCompany?.description || "",
            website: singleCompany?.website || "",
            location: singleCompany?.location || "",
            file: null,
        });
    }, [singleCompany])
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("name", input.name)
        formdata.append("description", input.description)
        formdata.append("website", input.website)
        formdata.append("location", input.location)
        if (input.file) {
            formdata.append("file", input.file)
        }
        try {
            setLoading(true)
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formdata, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                },
                withCredentials: true
            })
            if (res?.data?.success) {
                toast.success(res?.data?.message)
                setTimeout(() => navigate('/admin/companies'), 1000) //dely for 1 sec
                
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)

        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            <Navbar />
            <div className='max-w-4xl mx-auto my-10'>
                <div className='flex items-center gap-4 mb-8'>
                    <Button
                        variant='outline'
                        onClick={() => navigate('/admin/companies')}
                        className='flex items-center gap-2'
                    >
                        ← Back
                    </Button>
                    <h1 className='font-bold text-2xl'>Company Setup</h1>
                </div>

                <div className='border border-gray-200 rounded-xl p-8'>
                    <form onSubmit={submitHandler}>
                        <div className='grid grid-cols-2 gap-5 mb-5'>
                            <div>
                                <label className='text-sm font-medium block mb-1'>Company Name</label>
                                <Input
                                    name='name'
                                    placeholder='e.g. JobHunt, Google'
                                    value={input.name}
                                    onChange={changeEventHandler}
                                />
                            </div>
                            <div>
                                <label className='text-sm font-medium block mb-1'>Description</label>
                                <Input
                                    name='description'
                                    placeholder='Short company description'
                                    value={input.description}
                                    onChange={changeEventHandler}
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-5 mb-5'>
                            <div>
                                <label className='text-sm font-medium block mb-1'>Website</label>
                                <Input
                                    name='website'
                                    placeholder='https://yourcompany.com'
                                    value={input.website}
                                    onChange={changeEventHandler}
                                />
                            </div>
                            <div>
                                <label className='text-sm font-medium block mb-1'>Location</label>
                                <Input
                                    name='location'
                                    placeholder='e.g. Mumbai, India'
                                    value={input.location}
                                    onChange={changeEventHandler}
                                />
                            </div>
                        </div>

                        <div className='mb-6'>
                            <label className='text-sm font-medium block mb-1'>Company Logo</label>
                            <Input
                                type='file'
                                accept='image/*'
                                onChange={fileChangeHandler}
                                className='cursor-pointer'
                            />
                        </div>

                        {
                            loading ? <Button
                                disabled
                                className="w-full mt-4"
                            >
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Please Wait...
                            </Button> :

                                <Button
                                    type="submit"
                                    className="w-full mt-4"
                                >
                                    Update
                                </Button>
                        }
                    </form>
                </div>
            </div>
        </>
    )
}

export default CompanySetup