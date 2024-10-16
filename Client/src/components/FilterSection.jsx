import { motion } from 'framer-motion';
import React, { useState } from 'react';
import {useSelector} from "react-redux";
import {staggerFadeInOut} from "../animations"
import { IoFastFood } from '../assets/icons';
import { statuses } from '../utils/style';
import SliderCard from './SliderCard';

const FilterSection = () => {
  const [category, setCategory] = useState("burgers");
  const products = useSelector((state) => state.products);
  return (
    <motion.div className="w-full flex flex-col items-start justify-start pt-6">
      <div className="w-full flex flex-col items-start justify-start mb-4">
        <div className='flex flex-col items-start justify-start gap-1'></div>
        <p className="text-2xl text-headingColor font-bold">
          Our Hot Dishes
        </p>
        <div className="w-40 h-1 rounded-md bg-green-800 mt-2"></div>
      </div>
      {/*Changer overflow-x-hidden pour overflow-x-scroll si je veux barre en dessous des cartes*/}
      <div className='w-full overflow-x-hidden pt-6 flex items-center justify-center gap-6 py-8'>
        {statuses && 
        statuses.map((data, i) => (
          <FilterCard 
          data={data}
          category={category}
          setCategory={setCategory}
          index={i}
          />
        ))}
      </div>
      <div className='w-full flex items-center justify-evenly flex-wrap gap-4 mt-12'>
        {
          products && products.filter(data => data.product_category === category).map((data, i) => 
          <SliderCard key={i} data={data} index={i}/>)
        }
      </div>
    </motion.div>
  )
}

export const FilterCard = ({data, index, category, setCategory }) => {
  return (
    <motion.div key={index} {...staggerFadeInOut(index)}
    onClick={() => setCategory(data.category)}
    className={`group w-28 main-w-[128px] cursor-pointer rounded-md py-6
    ${category === data.category ? "bg-green-800" : "bg-primary"   
    } hover:bg-green-800 shadow-md flex flex-col items-center justify-center gap-4`}>
      <div className={`w-10 h-10 rounded-full shadow-md flex items-center
        justify-center group-hover:bg-primary 
        ${category === data.category ? "bg-primary" : "bg-green-800"}`}>
          <IoFastFood className={`${category === data.category ? "text-green-800" : "text-primary"} 
          group-hover:text-green-800`}/>
        </div>
        <p className={`text-xl font-semibold ${category === data.category ? "text-primary" : "text-textColor"}
        group-hover:text-primary`}
        >
          {data.title}
        </p>
    </motion.div>
  )
}

export default FilterSection