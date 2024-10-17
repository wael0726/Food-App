import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { avatar, imgLogo } from '../assets';
import { isActiveStyles, isNotActiveStyles } from '../utils/style';
import { motion } from 'framer-motion';
import { buttonclick, slideTop } from '../animations';
import { MdLogout, MdShoppingCart } from '../assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';
import { app } from '../config/firebase.config';
import { setUserNull } from '../context/actions/userActions';
import {setCartOn} from "../context/actions/displayCartAction"


const Header = () => {
    const cart = useSelector((state) => state.cart)
    const user = useSelector((state) => state.user);
    const [isMenu, setIsMenu] = useState(false);
    const firebaseAuth = getAuth(app);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signOut = () => {
        firebaseAuth.signOut().then(() => {
            dispatch(setUserNull())
            navigate("/login", {replace : true});
        })
        .catch((err) => console.log(err));
    }
    return (
        <header className='fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-6 bg-green-50'>
            <NavLink to={"/"} className={"flex items-center justify-center gap-4"}>
                <img src={imgLogo} className='w-12' alt="" />
                <p className='font-semibold text-xl'>Kapelka</p>
            </NavLink>

            <nav className='flex items-center justify-center gap-8'>
                <ul className='hidden md:flex items-center justify-center gap-16'>
                    <NavLink className={({ isActive }) => (isActive ? isActiveStyles : isNotActiveStyles)} to={"/"}>Home</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? isActiveStyles : isNotActiveStyles)} to={"/Menu"}>Menu</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? isActiveStyles : isNotActiveStyles)} to={"/services"}>Services</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? isActiveStyles : isNotActiveStyles)} to={"/aboutus"}>About Us</NavLink>
                </ul>
                <motion.div {...buttonclick} onClick={() => dispatch(setCartOn())} 
                className='relative cursor-pointer'>
                    <MdShoppingCart className='text-3xl text-textColor' />
                    {cart?.lenght > 1 && (
                        <div className='w-6 h-6 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 -right-1'>
                        <p className='text-primary text-base font-semibold'>{cart?.lenght}</p>
                    </div>
                    )}
                </motion.div>

                {user ? ( 
                    <>
                        <div className='relative cursor-pointer' 
                        onMouseEnter={() => setIsMenu(true) }
                        
                        >
                            <div className='w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center'>
                                <motion.img className='w-full h-full object-cover' 
                                    src={user?.picture ? user?.picture : avatar} 
                                    whileHover={{ scale: 1.15 }} 
                                    referrerPolicy='no-referrer'
                                />
                            </div>

                            {isMenu && (
                                <motion.div {...slideTop} onMouseLeave={() => setIsMenu(false)} className='px-6 py-4 w-48 bg-LightOverlay backdrop-blur-md rounded-md shadow-md absolute top-16 right-0 flex-col gap-8'>
                                <Link className="hover:text-red-500 text-xl text-textColor block py-1" to={"/dashboard/home"}>
                                    Dashboard
                                </Link>
                                <Link className="hover:text-red-500 text-xl text-textColor block py-1" to={"/profile"}>
                                    My Profile
                                </Link>
                                <Link className="hover:text-red-500 text-xl text-textColor block py-1" to={"/user-orders"}>
                                    Orders
                                </Link>
                                <hr />


                                <motion.div {...buttonclick}
                                onClick={signOut}
                                 className='group flex items-center justify-center px-3 py-2 rounded-md shadow-md
                                 bg-gray-100 hover:bg-gray-200 gap-3 '> 
                                    <MdLogout className='text-2xl text-textColor
                                    group-hover::text-headingColor'/>
                                    <p className='text-textColor text-xl group-hover:text-headingColor'>
                                        Sign Out
                                        </p>
                                </motion.div>

                            </motion.div>
                            )}
                        </div>
                    </> 
                ) : ( 
                    <NavLink to={"/login"}>
                        <motion.button 
                            {...buttonclick} 
                            className='px-4 py-2 rounded-md shadow-md bg-lightOverlay border border-red-300 cursor-pointer'
                        >
                            Login
                        </motion.button>
                    </NavLink>
                )}
            </nav>
        </header>
    );
}

export default Header;
