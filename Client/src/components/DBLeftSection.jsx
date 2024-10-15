import React from 'react'
import { NavLink } from 'react-router-dom'
import { imgLogo } from '../assets';
import { isActiveStyles, isNotActiveStyles } from '../utils/style';

const DBLeftSection = () => {
  return (
    <div className='h-full py-12 flex flex-col bg-white backdrop-blur-md 
    shadow-md min-w-210 w-300 gap-3'
    >
        <NavLink to={"/"} className={"flex items-center justify-center gap-4"}>
                <img src={imgLogo} className='w-12' alt="" />
                <p className='font-semibold text-xl'>Kapelka</p>
        </NavLink>

        <hr />


        <ul className='flex flex-col gap-4'>
        <NavLink 
        to={"/dashboard/home"}
        className={({ isActive }) =>
         isActive 
            ? `${isActiveStyles} px-4 py-2 border-l-8 border-green-950`
            : isNotActiveStyles
        } 
        >
        Home
        
        </NavLink>

        <NavLink 
        to={"/dashboard/orders"}
        className={({ isActive }) =>
         isActive 
            ? `${isActiveStyles} px-4 py-2 border-l-8 border-green-950`
            : isNotActiveStyles
        } 
        >
        Orders
        
        </NavLink> 

        <NavLink 
        to={"/dashboard/items"}
        className={({ isActive }) =>
         isActive 
            ? `${isActiveStyles} px-4 py-2 border-l-8 border-green-950`
            : isNotActiveStyles
        } 
        >
        Items
        
        </NavLink>

        <NavLink 
        to={"/dashboard/newItem"}
        className={({ isActive }) =>
         isActive 
            ? `${isActiveStyles} px-4 py-2 border-l-8 border-green-950`
            : isNotActiveStyles
        } 
        >
        Add New Item
        
        </NavLink>

        <NavLink 
        to={"/dashboard/users"}
        className={({ isActive }) =>
         isActive 
            ? `${isActiveStyles} px-4 py-2 border-l-8 border-green-950`
            : isNotActiveStyles
        } 
        >
        Users
        
        </NavLink>
        </ul>

        <div className='w-full items-center justify-center flex h-255 mt-auto px-2'>
            <div className='w-full h-full rounded-md bg-green-950 flex
            items-center justify-center flex-col gap-3 px-3 py-3'>
                <div className='w-12 h-12 borde bg-white rounded-full flex
                items-center justify-center py-2'>
                    <p className='text-2xl font-bold text-green-950'>?</p>
                </div>
                <p className='text-xl text-primary font-semibold'>Help Center</p>
                <p className='text-base text-gray-300 text-center'>
                Having trouble placing order ? Please contact us here for more informations</p>
                <p className='px-4 py-2 rounded-full bg-primary text-green-950 cursor-pointer'>Contact Us</p>
            </div>
        </div>
    </div>
  )
}

export default DBLeftSection