import React from "react";
import { Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Job({ job }) {
  const navigate = useNavigate();

  const postedDate = (createdAt) => {
    const createdtime = new Date(createdAt);
    const cuurenttime = new Date();
    const timedifferent = cuurenttime - createdtime;
    return Math.floor(timedifferent / (1000 * 24 * 60 * 60));
  }

  return (
    <div className="border rounded-xl shadow-sm p-4 sm:p-5 bg-white hover:shadow-md transition  flex flex-col">

      {/* TOP */}
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {postedDate(job?.createdAt) === 0 ? "Today" : `${postedDate(job?.createdAt)} Days ago`}
        </span>
        <Bookmark className="w-5 h-5 text-gray-500 cursor-pointer hover:text-black" />
      </div>

      {/* COMPANY SECTION */}
      <div className="flex items-center gap-3 mt-3">
        <img
          src={job?.companyId?.logo}
          alt="company"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-md border object-contain flex-shrink-0"
        />
        <h3 className="text-sm font-semibold text-gray-700 truncate">
          {job?.companyId?.name}
        </h3>
      </div>

      {/* TITLE */}
      <h2 className="mt-3 text-lg sm:text-xl font-bold line-clamp-1">
        {job?.title}
      </h2>

      {/* DESCRIPTION */}
      {/* DESCRIPTION */}
<p className="text-sm text-gray-600 mt-2 line-clamp-2">
  {job?.description}
</p>

      {/* BADGES */}
      <div className="flex gap-2 mt-4 flex-wrap">
        <Badge variant="secondary">{job?.jobType}</Badge>
        <Badge variant="outline">{job?.position} position</Badge>
        <Badge className="bg-purple-100 text-purple-700">{job?.salary}LPA</Badge>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3 mt-5">
        <Button
          className="flex-1 sm:flex-none"
          onClick={() => navigate(`/jobdescription/${job?._id}`)}
        >
          Details
        </Button>
        <Button variant="outline" className="flex-1 sm:flex-none">
          Save Later
        </Button>
      </div>

    </div>
  );
}