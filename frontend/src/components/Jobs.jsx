import React, { useEffect, useState } from 'react'
import { Navbar } from './shared/Navbar'
import FilterComponent from './FilterComponent'
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { setsearchInhome } from '@/redux/jobSlice';
import { motion } from "framer-motion"
import { SlidersHorizontal, X } from 'lucide-react';

export default function Jobs() {
  const { alljob, searchInhome } = useSelector(store => store.job);
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false);

  const filteredJobs = alljob.filter((job) => {
    if (!searchInhome) return true;
    return (
      job?.title?.toLowerCase().includes(searchInhome.toLowerCase()) ||
      job?.description?.toLowerCase().includes(searchInhome.toLowerCase()) ||
      job?.location?.toLowerCase().includes(searchInhome.toLowerCase()) ||
      job?.salary?.toString().toLowerCase().includes(searchInhome.toLowerCase())
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
      <div className='max-w-7xl mx-auto px-4 mt-6'>

        {/* Mobile Filter Toggle Button */}
        <div className='flex items-center justify-between mb-4 md:hidden'>
          <span className='text-sm text-gray-500'>
            {filteredJobs.length} jobs found
          </span>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className='flex items-center gap-2 border px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50'
          >
            {showFilter ? <X size={16} /> : <SlidersHorizontal size={16} />}
            {showFilter ? 'Close' : 'Filters'}
          </button>
        </div>

        {/* Mobile Filter Dropdown */}
        {showFilter && (
          <div className='mb-4 md:hidden border rounded-xl p-4 bg-white shadow-sm'>
            <FilterComponent />
          </div>
        )}

        <div className='flex gap-5'>
          {/* Desktop Sidebar Filter */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <FilterComponent />
          </div>

          {/* Job Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 flex-1'>
            {filteredJobs.length <= 0
              ? <span className='text-gray-500 col-span-full text-center mt-10'>No Job Available</span>
              : filteredJobs.map((job) => (
                  <motion.div
                    key={job?._id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))
            }
          </div>
        </div>

      </div>
    </>
  )
}