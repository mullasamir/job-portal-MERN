import React from 'react'
import { Carousel } from './ui/carousel'
import { CarouselContent } from './ui/carousel'
import { CarouselItem } from './ui/carousel'
import { Button } from './ui/button'
import { CarouselPrevious } from './ui/carousel'
import { CarouselNext } from './ui/carousel'
const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Sceince",
    "Graphic Designer",
    "FullStack Developer"
]
const CategoryCarousel = () => {
    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className="md:basis-1/2 lg-basis-1/3">
                                <Button variant="outline" className="rounded-full">{cat}</Button>

                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    )
}

export default CategoryCarousel