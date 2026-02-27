import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
    const { userName, review: testimonial, user_photoURL } = review;


    return (
        <div className="flex justify-center items-center">

            <div className="card w-96 bg-base-100 shadow-xl p-6 rounded-2xl border border-dashed border-primary">

                {/* Quote Icon */}
                <FaQuoteLeft className="text-4xl text-primary  mb-4" />

                {/* Text */}
                <p className="text-sm ">
                    {testimonial}
                </p>

                {/* Divider */}
                <div className="divider"></div>

                {/* User Info */}
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className='w-12 h-12 rounded-full bg-primary'>
                        <img src={user_photoURL} className='rounded-full' alt="" />
                    </div>


                    <div>
                        <h3 className="font-semibold text-base">
                            {userName}
                        </h3>
                        <p className="text-sm text-gray-500">
                            Senior Product Designer
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReviewCard;