import { motion } from "framer-motion";
import React from "react";
import { Slider } from "../components";

const HomeSLider = () => {
  return (
    <motion.div className="w-full flex flex-col items-start justify-start pt-6">
      <div className="w-full flex flex-col items-start justify-start mb-4">
        <p className="text-2xl text-headingColor font-bold">
          Our Nice and Delicious Burgers
        </p>
        <div className="w-40 h-1 rounded-md bg-green-800 mt-2"></div>
      </div>

      <Slider />
    </motion.div>
  );
};

export default HomeSLider;
