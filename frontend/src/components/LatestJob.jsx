import React, { useEffect, useState } from 'react'
import JobCard from './JobCard'
import { useSelector } from 'react-redux';
import { store } from '@/redux/store';

export default function LatestJob() {
  const { alljob } = useSelector(store => store.job);
  const { searchInhome } = useSelector(store => store.job);
  const [filterJob, setfilterJob] = useState(alljob);

  useEffect(() => {
    const filtred = alljob.filter((j) => {
      if (!searchInhome) return true;
      return j?.title?.toLowerCase().includes(searchInhome.toLowerCase());
    });
    setfilterJob(filtred);
  }, [searchInhome, alljob]);

  return (
    <>
      <h1 className='mt-10 px-4 sm:mx-10 text-2xl sm:text-3xl md:text-4xl'>
        Latest & Top
        <span className='text-purple-700'> Job Openings: </span>
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-7xl mx-auto px-4 mt-8'>
        {filterJob.length <= 0
          ? <span className='text-gray-500 col-span-full text-center mt-4'>No Job Available</span>
          : filterJob?.slice(0, 6).map((job) => (
              <JobCard key={job?._id} job={job} />
            ))
        }
      </div>
    </>
  )
}