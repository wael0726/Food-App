import { motion } from 'framer-motion';
import React, { useState } from 'react'; 
import { ImgHomeBurger3, devlivery } from '../assets';
import { buttonclick, zoomAnimation, floatAnimation } from '../animations'; 

const Home = () => {
  const [isHovered, setIsHovered] = useState(false); 

  return (
    <motion.div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex flex-col items-start justify-start gap-6 md:ml-[-60px]'>
            <div className='px-4 py-1 flex items-center justify-center gap-2 bg-green-900 rounded-full'>
                <p className='text-lg font-semibold text-white'>Free delivery</p>
                <div className='w-10 h-10 flex items-center justify-center rounded-full bg-primary shadow-md px-1'>
                    <img src={devlivery} alt='' />
                </div>
            </div>
            <p className='text-[40px] text-headingColor md:text-[72px] font-serif font-extrabold tracking-wider'>
                Where variety meets your <span className='text-green-900'>appetite</span>
            </p>
            <p className='text-textColor'>
                At our restaurant, we believe that dining should be an adventure for your taste buds. 
                "Where variety meets your appetite!" perfectly encapsulates our mission to offer an extensive menu brimming with 
                diverse and delicious dishes. From savory starters to decadent desserts, every item is crafted to tantalize your 
                senses and satisfy your cravings. Whether you're in the mood for classic comfort food or exploring international flavors, 
                our wide selection ensures there's something for everyone. Join us and discover a culinary journey that caters to every palate, 
                where each meal is an opportunity to indulge in the richness of variety!
            </p>    
            <motion.button {...buttonclick} className='bg-gradient-to-bl from-green-500 to-green-900 px-4
            py-2 rounded-xl text-black text-base font-semibold'> Order Now !</motion.button>
        </div>
        <div className='flex justify-end'>
            <motion.div className="image" variants={floatAnimation} initial="initial" animate="animate">
                <motion.img
                    src={ImgHomeBurger3}
                    alt="Burger"
                    initial={{ scale: 1.15 }} 
                    animate={{ scale: isHovered ? zoomAnimation.animate.scale : 1 }} 
                    transition={zoomAnimation.transition} 
                    className="w-[250%] mt-8"
                    onMouseEnter={() => setIsHovered(true)} 
                    onMouseLeave={() => setIsHovered(false)} 
                />
            </motion.div>
        </div>
    </motion.div>
  );
};

export default Home;
