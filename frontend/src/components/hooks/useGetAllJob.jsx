import axios from 'axios'
import React, { useEffect } from 'react'
import { JOBS_API_END_POINT, USER_API_END_POINT } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setalljob } from '@/redux/jobSlice'

const useGetAllJob=() =>{
    const dispatch = useDispatch()
    const {searchInhome}=useSelector(store=>store.job);
    
  useEffect(() => {
    const fetchAllJobs = async () => {
        try {
            const res = await axios.get(`${JOBS_API_END_POINT}/get?keyword=${searchInhome}`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setalljob(res.data.jobs))
            }
        } catch (error) {
            console.log(error)
        }
    }
    fetchAllJobs()
}, [searchInhome])
}

export default useGetAllJob
