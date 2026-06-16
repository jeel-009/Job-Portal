import React, { useEffect } from 'react'
import { Navbar } from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../utils/constant'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setApplicants } from '@/redux/applicantsSlice'

function Applicants() {
    const param = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${param.id}/applicants`, {
                    withCredentials: true
                });
                
                    dispatch(setApplicants(res.data.applications))
                
            } catch (error) {
                console.log(error);

            }

        }
        fetchAllApplicants()
    }, [])
    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto my-10">
                Applicants(3)
                <div className="max-w-4xl mx-auto my-10">
                    <ApplicantsTable />
                </div>
            </div>

        </>
    )
}

export default Applicants