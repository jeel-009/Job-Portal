
import { Badge } from "@/components/ui/badge"
import React from 'react'
import { useNavigate } from 'react-router-dom';


export default function JobCard({job}) {
    const navigate = useNavigate();

  return (
    <div className='shadow-xl rounded min-h-[220px] p-6 ' onClick={()=>navigate(`/jobdescription/${job._id}`)}>
        <div >

        <h1 className="font-medium text-lg">{job?.companyId?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
        <div>
        <h1 className="font-bold">{job.title}</h1>
        <p className="text-sm text-gray-500">{job.description}</p>
        </div>
        </div>
        <div className="flex gap-3 items-center mt-5">
<Badge className='text-purple-900 bg-gray-200'>{job.jobType}</Badge>
<Badge variant="destructive">{job.position} position</Badge>
<Badge className='text-purple-900 bg-gray-300'>{job.salary}LPA</Badge>
        </div>
    </div>
  )
}
