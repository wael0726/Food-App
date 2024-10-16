import { motion } from 'framer-motion'
import React from 'react'

const FilterSection = () => {
  return (
    <motion.div className="w-full flex flex-col items-start justify-start pt-6">
      <div className="w-full flex flex-col items-start justify-start mb-4">
        <p className="text-2xl text-headingColor font-bold">
          Our Hot Dishes
        </p>
        <div className="w-40 h-1 rounded-md bg-green-800 mt-2"></div>
      </div>


    </motion.div>
  )
}

export default FilterSection