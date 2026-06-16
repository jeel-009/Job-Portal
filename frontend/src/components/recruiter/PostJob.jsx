import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Navbar } from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { JOBS_API_END_POINT } from '../utils/constant'
import { setAllAdminJob } from '@/redux/jobSlice'
import axios from 'axios'
import { toast } from 'sonner'

const JobPost = () => {
    const { companies } = useSelector(store => store.company);
    const { allAdminJob } = useSelector(store => store.job); 
    const [loading,setLoading]=useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [input, setInput] = useState({
        title:"",
        description:"",
        requirements: "",
        salary:"",
        experienceLevel: "",
        location: "",
        jobType: "",
        position: "",
        companyId: "",
    });

    const inputHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    
    const selectChangeHandler=(value)=>{
        const selectCompany = companies.find((c)=>c?.name?.toLowerCase() === value)
        setInput({...input,companyId:selectCompany._id})
    }

    const submitHandler = async(e) => {
        e.preventDefault();
     
       
        try {
            setLoading(true)
            const res = await axios.post(`${JOBS_API_END_POINT}/post/`, input, {
                headers: {
                    "Content-Type": 'application/json'
                },
                withCredentials: true
            })
            if (res?.data?.success) {
                dispatch(setAllAdminJob([...allAdminJob,res.data.jobs]))
                toast.success(res?.data?.message)
                    setTimeout(() => navigate('/admin/jobs'), 1000) //dely for 1 sec

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
                    <Button variant='outline' onClick={() => navigate('/admin/jobs')}>
                        ← Back
                    </Button>
                    <h1 className='font-bold text-2xl'>Post a New Job</h1>
                </div>

                <div className='border border-gray-200 rounded-xl p-8'>
                    <form onSubmit={submitHandler}>
                        <div className='grid grid-cols-2 gap-5 mb-5'>
                            <div>
                                <label className='text-sm font-medium block mb-1'>Job Title</label>
                                <Input
                                    name='title'
                                    value={input.title}
                                    onChange={inputHandler}
                                    placeholder='e.g. Software Engineer'
                                />
                            </div>
                            <div>
                                <label className='text-sm font-medium block mb-1'>Location</label>
                                <Input
                                    name='location'
                                    value={input.location}
                                    onChange={inputHandler}
                                    placeholder='e.g. Mumbai, India'
                                />
                            </div>
                        </div>

                        <div className='mb-5'>
                            <label className='text-sm font-medium block mb-1'>Description</label>
                            <Input
                                name='description'
                                value={input.description}
                                onChange={inputHandler}
                                placeholder='Job description...'
                            />
                        </div>

                        <div className='mb-5'>
                            <label className='text-sm font-medium block mb-1'>Requirements</label>
                            <Input
                                name='requirements'
                                value={input.requirements}
                                onChange={inputHandler}
                                placeholder='e.g. React, Node.js, MongoDB'
                            />
                        </div>

                        <div className='grid grid-cols-2 gap-5 mb-5'>
                            <div>
                                <label className='text-sm font-medium block mb-1'>Salary (LPA)</label>
                                <Input
                                    name='salary'
                                    value={input.salary}
                                    onChange={inputHandler}
                                    placeholder='e.g. 12'
                                />
                            </div>
                            <div>
                                <label className='text-sm font-medium block mb-1'>Experience Level (Years)</label>
                                <Input
                                    name='experienceLevel'
                                    value={input.experienceLevel}
                                    onChange={inputHandler}
                                    placeholder='e.g. 2'
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-5 mb-5'>
                            <div>
                                <label className='text-sm font-medium block mb-1'>Job Type</label>
                                <Input
                                    name='jobType'
                                    value={input.jobType}
                                    onChange={inputHandler}
                                    placeholder='e.g. Full Time'
                                />
                            </div>
                            <div>
                                <label className='text-sm font-medium block mb-1'>No. of Positions</label>
                                <Input
                                    name='position'
                                    value={input.position}
                                    onChange={inputHandler}
                                    placeholder='e.g. 3'
                                />
                            </div>
                        </div>
                        {
                            companies.length>0 &&(
                        
                        <div className='mb-6 text-align'>
                            <label className='text-sm font-medium block mb-1'>Company</label>
                            <Select onValueChange={selectChangeHandler}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a company" />
                                </SelectTrigger>
                                <SelectContent>
                                    {companies.map((company) => (
                                        <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                                            {company.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        )}

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
                                    Post Job
                                </Button>
                        }
                        {
                            companies.length === 0 && <p className='text-red-500'>*Please Register Company</p>
                        }
                    </form>
                </div>
            </div>
        </>
    )
}

export default JobPost