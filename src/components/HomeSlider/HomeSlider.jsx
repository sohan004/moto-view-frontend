import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
// import 'swiper/css/pagination';
import 'swiper/css/grid';

import img1 from '../../assets/banner/WhatsApp Image 2024-07-15 at 17.57.06_53da291e.jpg'
import img2 from '../../assets/banner/WhatsApp Image 2024-07-15 at 17.57.07_bed286ee.jpg'
import img3 from '../../assets/banner/WhatsApp Image 2024-07-15 at 17.57.07_a3e2cf14.jpg'

// import required modules
import { Autoplay, Pagination, Navigation, Grid } from 'swiper/modules';
const HomeSlider = () => {
    return (
        <div className='max-w-[1280px] mx-auto px-3 md:px-4 mt-2 md:mt-0'>
            <Swiper
                loop={true}
                slidesPerView={1.1}
                breakpoints={{
                    44: {
                        spaceBetween: 10
                    },
                    768: {
                        spaceBetween: 30
                    },
                }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Grid]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={img1}
                        className='w-full h-[200px] rounded-lg md:rounded-xl md:h-[400px] object-cover '
                        alt='bike' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img2}
                        className='w-full h-[200px] rounded-lg md:rounded-xl md:h-[400px] object-cover '
                        alt='bike' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img3}
                        className='w-full h-[200px] rounded-lg md:rounded-xl md:h-[400px] object-cover '
                        alt='bike' />
                </SwiperSlide>
            </Swiper>
        </div >
    );
};

export default HomeSlider;