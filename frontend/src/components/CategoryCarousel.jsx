import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setsearchInhome } from '@/redux/jobSlice';

export default function CategoryCarousel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = (item) => {
    dispatch(setsearchInhome(item));
    navigate('/browse');
  }

  const category = [
    "Backend Devloper",
    "Fullstack Devloper",
    "Data analyst",
    "Application-Devloper",
    "Ai-Enginner"
  ];

  return (
    <Carousel className='w-full max-w-xs sm:max-w-sm md:max-w-xl mx-auto mt-10 px-8'>
      <CarouselContent>
        {category.map((item, index) => (
          <CarouselItem key={index} className='basis-full sm:basis-1/2 lg:basis-1/3'>
            <div className="flex items-center justify-center py-2">
              <Button
                variant='outline'
                className='rounded-full text-sm px-4 py-2 w-full'
                onClick={() => searchHandler(item)}
              >
                {item}
              </Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}