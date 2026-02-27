import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import amazon from '../../../assets/brands/amazon.png';
import casio from '../../../assets/brands/casio.png';
import amazonVector from '../../../assets/brands/amazon_vector.png';
import moonstar from '../../../assets/brands/moonstar.png';
import randstad from '../../../assets/brands/randstad.png';
import star from '../../../assets/brands/star.png';
import start_people from '../../../assets/brands/start_people.png';
import { Autoplay } from 'swiper/modules';

const brandLogos = [amazon, casio, amazonVector, moonstar, randstad, star, start_people]

const Brands = () => {
    return (
        <Swiper
            loop={true}
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={30}
            grabCursor={true}
            autoplay={{
                delay: 1000,
                disableOnInteraction: false,
            }}

            modules={[Autoplay]}
        >
            {
                brandLogos.map((logo, index) => <SwiperSlide key={index}>
                    <img src={logo} alt="" />
                </SwiperSlide>)
            }

        </Swiper>
    );
};

export default Brands;