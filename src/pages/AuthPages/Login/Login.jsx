import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import GoogleLogin from '../SocialLogin/GoogleLogin';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signInUser } = useAuth()
    const location = useLocation();
    const navigate = useNavigate();
   


    const handleLogin = (data) => {
        console.log('login ', data)
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result)
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <div className="card bg-base-100 card-body w-full mx-auto max-w-sm shrink-0 shadow-2xl">

                <h3 className="text-center text-3xl">Welcome Back</h3>
                <p className="text-center">Login with ZapShift</p>

                <form className=""
                    onSubmit={handleSubmit(handleLogin)}>
                    <fieldset className="fieldset">
                        {/* Email */}
                        <label className="label">Email</label>
                        <input
                            type="email"
                            className="input"
                            placeholder="Email"
                            {...register('email', {
                                required: true,
                            })}
                        />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                        }

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

                        <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                    <p>New to Zap Shift <Link 
                    to="/register" 
                    state={location.state}
                    className='text-blue-600 underline font-bold'>Register</Link></p>
                </form>

                <GoogleLogin></GoogleLogin>
            </div>
        </div>
    );
};

export default Login;