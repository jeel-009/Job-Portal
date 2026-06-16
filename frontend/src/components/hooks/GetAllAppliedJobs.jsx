import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { APPLICATION_API_END_POINT } from "../utils/constant";
import { setAllappliedJobs } from "@/redux/jobSlice";
import { toast } from "sonner";

const GetAllAppliedJobs=()=>{
    const dispatch = useDispatch();

    useEffect(()=>{
        const allappliedJobs=async()=>{
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`,{
                    withCredentials:true
                })
                if(res.data.success){
                    dispatch(setAllappliedJobs(res.data.applications));
                }
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message)
            }
        }
        allappliedJobs()
    },[])
}
export default GetAllAppliedJobs