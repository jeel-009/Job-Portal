import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";
import { Navbar } from "./shared/Navbar";
import { APPLICATION_API_END_POINT, JOBS_API_END_POINT } from "./utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { store } from "@/redux/store";
import { setsinglejob } from "@/redux/jobSlice";
import axios from "axios";
import { toast } from "sonner";

const JobDescription = () => {
    const dispatch = useDispatch();
    const param = useParams();
    const jobId = param.id;
    const { singlejob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);

    const isApplied =
        singlejob?.application?.some(
            (a) => a?.applicant?._id === user?._id
        ) || false;

    const fetchSingleJob = async () => {
        try {
            const res = await axios.get(`${JOBS_API_END_POINT}/get/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setsinglejob(res.data.jobs));
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSingleJob();
    }, [jobId, dispatch]);

    const applyJobHandler = async () => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, null, {
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res?.data?.message);
                await fetchSingleJob();
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto border rounded-xl p-4 sm:p-6 my-6 sm:my-10 mx-4 sm:mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h1 className="text-xl sm:text-2xl font-bold">{singlejob?.title}</h1>
                    <Button
                        onClick={applyJobHandler}
                        disabled={isApplied}
                        className="w-full sm:w-auto"
                    >
                        {isApplied ? "Already Applied" : "Apply Now"}
                    </Button>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 sm:gap-3 items-center mt-4 sm:mt-5">
                    <Badge className='text-purple-900 bg-gray-200'>{singlejob?.jobType}</Badge>
                    <Badge variant="destructive">{singlejob?.position} position</Badge>
                    <Badge className='text-purple-900 bg-gray-300'>{singlejob?.salary}LPA</Badge>
                </div>

                <h2 className="mt-4 sm:mt-5 font-bold text-sm sm:text-base">{singlejob?.description}</h2>
                <hr className="mt-3" />

                {/* Job Details */}
                <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                    <p className="text-sm sm:text-base">
                        <span className="font-semibold">Role: </span>{singlejob?.title}
                    </p>
                    <p className="text-sm sm:text-base">
                        <span className="font-semibold">Location: </span>{singlejob?.location}
                    </p>
                    <p className="text-sm sm:text-base">
                        <span className="font-semibold">Description: </span>{singlejob?.description}
                    </p>
                    <p className="text-sm sm:text-base">
                        <span className="font-semibold">Experience: </span>{singlejob?.experienceLevel}
                    </p>
                    <p className="text-sm sm:text-base">
                        <span className="font-semibold">Salary: </span>{singlejob?.salary}LPA
                    </p>
                    <p className="text-sm sm:text-base">
                        <span className="font-semibold">Total Applicants: </span>{singlejob?.application?.length}
                    </p>
                    <p className="text-sm sm:text-base">
                        <span className="font-semibold">Posted Date: </span>{singlejob?.createdAt?.split('T')[0]}
                    </p>
                </div>
            </div>
        </>
    );
};

export default JobDescription;