import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEye, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    })

    // update rider status
    const updateRiderStatus = (rider, status) => {
        const updateInfo = { status: status, email: rider.email }
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rider status is set to ${status}.`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }


    // approved rider
    const handleApproval = rider => {
        updateRiderStatus(rider, 'approved');
    }

    // rejection
    const handleRejection = (rider) => {
        updateRiderStatus(rider, 'rejected')
    }

    return (
        <div>
            <h1 className='text-4xl '>Total Pending Approval Riders : {riders.length}</h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            riders.map((rider, index) => <tr key={rider._id}>
                                <th>{index + 1}</th>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.district}</td>

                                {/* status */}
                                <td>
                                    <p className={`${rider.status === 'approved' ? 'text-green-800' : 'text-red-500'}`}>{rider.status}</p>
                                </td>

                                {/* action button */}
                                <td className='flex  items-center gap-1'>
                                    <button
                                        className='btn'>
                                        <FaEye />
                                    </button>
                                    <button
                                        onClick={() => handleApproval(rider)} className='btn'>
                                        <FaUserCheck />
                                    </button>

                                    <button
                                        onClick={() => handleRejection(rider)}
                                        className='btn'>
                                        <IoPersonRemoveSharp />
                                    </button>

                                    <button className='btn'>
                                        <FaTrashCan />
                                    </button>
                                </td>
                            </tr>)
                        }




                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveRiders;