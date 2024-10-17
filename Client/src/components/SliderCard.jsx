import React from 'react';
import { FaDollarSign, IoBasket } from "../assets/icons";
import { motion } from 'framer-motion';
import { buttonclick } from '../animations';
import { addNewItemToCart, getAllCartItems } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { alertNull, alertSuccess } from '../context/actions/alertActions';
import { setCartItems } from '../context/actions/cartAction';

const SliderCard = ({ data }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const sendToCart = () => {
    addNewItemToCart(user?.user_id, data).then((res) => {
      dispatch(alertSuccess("Added to the cart"));
      
      // Récupérer les articles mis à jour
      getAllCartItems(user?.user_id).then((items) => {
        if (items) {
          dispatch(setCartItems(items)); // Assurez-vous que les articles soient dispatchés
        }
      });
      setTimeout(() => {
        dispatch(alertNull());
      }, 3000);
    })
    .catch((err) => {
      console.error("Erreur lors de l'ajout au panier", err);
    });
  };
  

  return (
    <div className='bg-white hover:bg-gray-200 hover:drop-shadow-lg backdrop-blur-md
      rounded-xl flex items-center justify-between relative px-4 py-2 w-full
      md:w-340 md:min-w-350 gap-1 transition-all duration-200 ease-in-out'>
      
      <motion.img 
        src={data.imageURL} 
        className='w-40 h-40 object-contain' 
        alt=""
        whileHover={{ scale: 1.3 }} 
        transition={{ type: "spring", stiffness: 300 }} 
      />

      <div className='relative pt-12'>
        <p className='text-xl text-headingColor font-semibold'>
          {data.product_name}
        </p>
        <p className='text-lg font-semibold text-red-500 flex items-center justify-center gap-1'>
          <FaDollarSign className='text-red-500'/> {parseFloat(data.product_price).toFixed(2)}
        </p>
        <motion.div {...buttonclick}
        onClick={sendToCart}
         className='w-8 h-8 rounded-full bg-red-500
          flex items-center justify-center absolute -top-4 right-2 cursor-pointer'>
          <IoBasket className='text-2xl text-primary'/>
        </motion.div>
      </div>
    </div>
  );
};

export default SliderCard;
