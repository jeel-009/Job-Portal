import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobTable from "./AdminJobTable";
import { JOBS_API_END_POINT } from "../utils/constant";
import { toast } from "sonner";
import { setAllAdminJob, setsearchJobtext } from "@/redux/jobSlice.js";
import axios from "axios";

const AdminJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setinput] = useState("");

  useEffect(() => {
    dispatch(setsearchJobtext(input));
  }, [input]);

  const GetAllJobs = async () => {
    try {
      const res = await axios.get(`${JOBS_API_END_POINT}/getadminjobs`, {
        withCredentials: true
      });
      if (res?.data?.success) {
        dispatch(setAllAdminJob(res.data.jobs));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    GetAllJobs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto my-6 sm:my-10 px-4">

        {/* Search + Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-0 sm:justify-between mb-5">
          <Input
            className="w-full sm:max-w-sm"
            placeholder="Search By Role..."
            value={input}
            onChange={(e) => setinput(e.target.value)}
          />
          <Button
            className="bg-black hover:bg-black w-full sm:w-auto"
            onClick={() => navigate('/admin/job/create')}
          >
            New Job
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <AdminJobTable />
        </div>

      </div>
    </>
  );
};

export default AdminJob;