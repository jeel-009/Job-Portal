import React from 'react'
import { Navbar } from './shared/Navbar'
import HeroSec from './HeroSec'
import CategoryCarousel from './CategoryCarousel'
import LatestJob from './LatestJob'
import Footer from './Footer'
import useGetAllJob from './hooks/useGetAllJob'
import {motion} from 'framer-motion'


export default function Home() {
  useGetAllJob()
  return (
    <>
    <Navbar/>
  <motion.div initial={{opacity:0,y:100}}
                animate={{opacity:1,y:0}}
                exit={{opacity:0,y:-100}}
                transition={{duration:0.3}}>
                  <HeroSec/>
  <CategoryCarousel/>
  <LatestJob/>
  <Footer/>
      </motion.div>
                  </>
  )
}
