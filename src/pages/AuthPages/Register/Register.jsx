import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import GoogleLogin from '../SocialLogin/GoogleLogin';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();



    const handleRegistration = (data) => {


        const profileImage = data.photo[0]

        registerUser(data.email, data.password)
            .then(() => {

                // store the image in form data 
                const RegisterFormData = new FormData();
                RegisterFormData.append('image', profileImage);

                // send the photo to store and get the photo url
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

                axios.post(image_API_URL, RegisterFormData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        // create user in the database
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user created in the database');
                                }
                            })



                        // update user profile to firebase
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        }

                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log('user profile updated done!')
                                navigate(location?.state || '/')
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    })
                    .catch(err => {
                        console.log(err)
                    })

            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <div>
            <div className="card bg-base-100 card-body w-full mx-auto max-w-sm shrink-0 shadow-2xl">
                <h3 className="text-center text-3xl">Create an Account</h3>
                <p className="text-center">Register with ZapShift</p>
                <form className=""
                    onSubmit={handleSubmit(handleRegistration)}>
                    <fieldset className="fieldset">

                        {/* Name */}
                        <label className="label">Name</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="Your Name"
                            {...register('name', { required: true })}
                        />

                        {errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>}


                        {/* Photo Image field */}
                        <label className="label">Photo URL</label>
                        <input
                            type="file"
                            className="file-input"
                            placeholder="photo url"
                            {...register('photo', { required: true })}
                        />

                        {errors.photo?.type === 'required' && <p className='text-red-500'>Photo is required</p>}


                        {/* Email */}
                        <label className="label">Email</label>
                        <input
                            type="email"
                            className="input"
                            placeholder="Email"
                            {...register('email', { required: true })}
                        />

                        {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}


                        {/* Password */}
                        <label className="label">Password</label>
                        <input
                            type="password"
                            className="input"
                            placeholder="Password"
                            {...register('password', {
                                required: true,
                                minLength: 6,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}<>_\-+=|\\:;"',./~`]).{8,}$/

                            })}
                        />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>
                        }
                        {
                            errors.password?.type === 'pattern' && <p className='text-red-500'>password must be one uppercase , must be one lowercase , must be one number and must be one spacial character</p>
                        }



                        <div><a className="link link-hover">Forgot password?</a></div>

                        <button className="btn btn-neutral mt-4">Register</button>
                    </fieldset>
                    <p>Already have an account, Please <Link
                        state={location.state}
                        to="/login" className='text-blue-600 underline font-bold'>Login</Link></p>
                </form>

                <GoogleLogin></GoogleLogin>
            </div>
        </div>
    );
};

export default Register;