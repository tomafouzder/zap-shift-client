import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useLoaderData } from 'react-router';
import riderImg from '../../assets/agent-pending.png'
import Swal from 'sweetalert2';

const Rider = () => {
    const {
        register,
        handleSubmit,
        control,
        // formState: { errors }
    } = useForm();

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const serviceCenter = useLoaderData();
    const regionDuplicate = serviceCenter.map(c => c.region);
    const region = [...new Set(regionDuplicate)];

    // watch receiver and sender region:
    const riderRegion = useWatch({ control, name: 'region' });

    const districtByRegion = region => {
        const regionDistrict = serviceCenter.filter(c => c.region === region);
        const districts = regionDistrict.map(d => d.district);
        return districts;
    }



    const handleRiderApplication = (data) => {
        console.log(data);

        axiosSecure.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your application has been submitted. We will reach out to you in 45 days!",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    return (
        <div>
            <h2 className="text-4xl text-secondary font-bold text-center">Be a Rider</h2>
            <form onSubmit={handleSubmit(handleRiderApplication)}
                className='mt-12 p-4 text-black'>

                {/* two column */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 '>

                    {/* sender Details */}
                    <fieldset className="fieldset order-2 md:order-1">
                        <h4 className="text-2xl font-semibold">Tell us about yourself</h4>

                        {/* Your name */}
                        <label className="label">Your Name</label>
                        <input type="text"
                            {...register('name')}
                            defaultValue={user?.displayName}
                            className="input w-full"
                            placeholder="Your Name"
                        />

                        {/* Driving License Number */}
                        <label className="label">Driving License Number</label>
                        <input type="number"
                            {...register('drivingNumber')}
                            className="input w-full"
                            placeholder="Driving License Number"
                        />


                        {/* Your email */}
                        <label className="label">Your Email</label>
                        <input type="text"
                            {...register('email')}
                            defaultValue={user?.email}
                            className="input w-full"
                            placeholder="Your Email"
                        />


                        {/* Your region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Your Regions</legend>
                            <select
                                {...register('region')}
                                defaultValue="Pick your region"
                                className="select w-full">

                                <option disabled={true}>Pick your region</option>
                                {
                                    region.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>


                        {/* Your districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Your Districts</legend>
                            <select
                                {...register('district')}
                                defaultValue="Pick your district"
                                className="select w-full">

                                <option disabled={true}>Pick your district</option>
                                {
                                    districtByRegion(riderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>


                        {/* NID Number */}
                        <label className="label">NID Number </label>
                        <input type="number"
                            {...register('nidNumber')}
                            className="input w-full"
                            placeholder="Your NID Number"
                        />


                        {/* Your Number */}
                        <label className="label">Your Phone Number </label>
                        <input type="number"
                            {...register('phoneNumber')}
                            className="input w-full"
                            placeholder="Your Phone Number"
                        />


                        {/* Bike Brand Model and Year */}
                        <label className="label mt-4">Bike Brand Model and Year</label>
                        <input type="text"
                            {...register('bikeModel')}
                            className="input w-full"
                            placeholder="Bike Brand Model and Year"
                        />


                        {/* Bike Registration Number */}
                        <label className="label mt-4">Bike Registration Number</label>
                        <input type="text"
                            {...register('bikeRegistrationNo')}
                            className="input w-full"
                            placeholder="Bike Registration Number"
                        />



                        {/* Tell Us About Yourself */}
                        <label className="label mt-4">Tell Us About Yourself</label>
                        <textarea type="text"
                            {...register('tellYourSelf')}
                            className=" textarea w-full"
                            placeholder="Tell Us About Yourself" >
                        </textarea>

                    </fieldset>


                    {/* rider image */}
                    <figure className='order-1 md:order-2 flex justify-center items-center md:block'>
                        <img src={riderImg}
                            className='flex justify-center items-center md:block'
                            alt="riderImg" />
                    </figure>

                </div>


                <input type="submit" className='btn btn-primary w-full mt-8 text-black' value="Sent Rider Request" />
            </form>
        </div>
    );
};

export default Rider;