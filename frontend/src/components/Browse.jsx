import React, { useEffect } from 'react'
import { Navbar } from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux';
import useGetAllJob from './hooks/useGetAllJob';
import { setsearchInhome } from '@/redux/jobSlice';
import { motion } from 'framer-motion'

export default function Browse() {
  useGetAllJob();
  const { alljob, searchInhome } = useSelector(store => store.job);
  const dispatch = useDispatch();

  const filteredJobs = alljob.filter((job) => {
    if (!searchInhome) return true;
    return (
      job?.title?.toLowerCase().includes(searchInhome.toLowerCase()) ||
      job?.description?.toLowerCase().includes(searchInhome.toLowerCase()) ||
      job?.companyId?.name?.toLowerCase().includes(searchInhome.toLowerCase())
    );
  });

  useEffect(() => {
    return () => {
      dispatch(setsearchInhome(""))
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className='max-w-7xl mx-auto px-4'>
        <h1 className='mt-5 text-base sm:text-lg font-medium'>
          Search Result ({filteredJobs.length})
        </h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-5'>
          {filteredJobs.length <= 0
            ? <p className='text-gray-500 col-span-full text-center mt-10'>No jobs found.</p>
            : filteredJobs.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <Job job={item} />
                </motion.div>
              ))
          }
        </div>
      </div>
    </>
  )
}