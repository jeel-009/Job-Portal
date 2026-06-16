import React, { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Pen } from "lucide-react";
import { Navbar } from "./shared/Navbar";
import AppliedJobsTable from "./AppliedJobsTable ";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import { store } from "@/redux/store";
import GetAllAppliedJobs from "./hooks/GetAllAppliedJobs";

const Profile = () => {
  GetAllAppliedJobs();
  const { user } = useSelector(store => store.auth);
  const [open, setopen] = useState(false);

  return (
    <>
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto border rounded-xl p-4 sm:p-8 my-6 sm:my-10 mx-4 sm:mx-auto">

        {/* Edit Icon */}
        <div className="flex justify-end">
          <Pen className="w-5 h-5 cursor-pointer" onClick={() => setopen(true)} />
        </div>

        {/* Profile Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mt-2">
          <Avatar className="h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0">
            <AvatarImage src={user?.profile?.profilePhoto} />
          </Avatar>

          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-bold">{user?.fullname}</h1>
            <p className="text-gray-500 text-sm sm:text-base mt-1">
              {user?.profile?.bio}
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-6 sm:mt-8 space-y-2">
          <p className="text-sm sm:text-base">
            <span className="font-semibold">Email: </span>
            <span className="break-all">{user?.email}</span>
          </p>
          <p className="text-sm sm:text-base">
            <span className="font-semibold">Phone: </span>{user?.phoneNumber}
          </p>
        </div>

        {/* Skills */}
        <div className="mt-6 sm:mt-8">
          <h2 className="font-semibold mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.map((skill, index) => (
              <Badge key={index}>{skill}</Badge>
            ))}
          </div>
        </div>

        {/* Resume */}
        <div className="mt-5">
          <h2 className="font-semibold mb-1">Resume</h2>
          {user?.profile?.resume ? (
            <a
              href={user.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline text-sm sm:text-base break-all"
            >
              {user.profile.resumeOriginalName || "View Resume"}
            </a>
          ) : (
            <span className="text-gray-400 text-sm">NA</span>
          )}
        </div>

        <hr className="mt-5" />

        {/* Applied Jobs */}
        <h3 className="mt-5 font-semibold text-base sm:text-lg">Applied Jobs</h3>
        <div className="mt-5 overflow-x-auto">
          <AppliedJobsTable />
          <UpdateProfile open={open} setopen={setopen} />
        </div>

      </div>
      </div>
      </>
    )
}

export default Profile;