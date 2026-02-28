import React from 'react';
import { GiToggles } from 'react-icons/gi';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { LuPackageOpen } from 'react-icons/lu';
import { Link, NavLink, Outlet } from 'react-router';

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open max-w-7xl mx-auto">
            {/* horizontal line */}
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">

                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">

                        {/* Sidebar toggle icon */}
                        <div className='font-bold text-lg'>
                            <GiToggles className='font-bold' />
                        </div>

                    </label>
                    <div className="px-4">Zap Shift Dashboard</div>
                </nav>


                {/* Page content here */}

                <Outlet></Outlet>

            </div>


            {/* vertical line */}
            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>

                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">

                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">

                        {/* Home icon */}
                        <li>
                            <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">

                                <div className='font-bold text-lg'>
                                    <IoHomeOutline className='font-bold' />
                                </div>

                                <span className="is-drawer-close:hidden">Homepage</span>
                            </Link>
                        </li>

                        {/* Our Dashboard links */}
                        <li>
                            <NavLink to="/dashboard/my-parcels" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Parcels">

                                <div className='font-bold text-lg'>
                                    <LuPackageOpen className='font-bold' />
                                </div>

                                <span className="is-drawer-close:hidden">My Parcels</span>
                            </NavLink>
                        </li>

                        {/* Settings icon */}
                        <li>
                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">

                                <div className='font-bold text-lg'>
                                    <IoSettingsOutline className='font-bold' />
                                </div>

                                <span className="is-drawer-close:hidden">Settings</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;