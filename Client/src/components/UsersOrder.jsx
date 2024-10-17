import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaDollarSign } from 'react-icons/fa'; // Assurez-vous d'importer FaDollarSign ici
import { CartItemCard } from './Cart'; // Importation de CartItemCard pour réutiliser le même composant

const UsersOrder = () => {
  const cart = useSelector((state) => state.cart); // Récupérer les articles du panier
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let tot = 0;
    if (cart) {
      cart.forEach((item) => {
        tot += item.product_price * item.quantity;
      });
      setTotal(tot);
    }
  }, [cart]);

  return (
    <div className="w-screen min-h-screen flex items-start flex-col bg-primary px-6 md:px-24 2xl:px-96 py-12">
      <h1 className="text-4xl text-headingColor font-bold mb-4">Your Orders</h1>

      {cart && cart.length > 0 ? (
        <div className="flex flex-col w-full items-start justify-start gap-3 h-[65%] overflow-y-scroll scrollbar-none">
          {cart.map((item, index) => (
            <CartItemCard key={index} index={index} data={item} />
          ))}

          <div className="w-full flex justify-between mt-4 bg-lightOverlay drop-shadow-md rounded-md p-4 border border-gray-300">
            <p className="text-3xl text-headingColor font-semibold">Total</p>
            <p className="text-3xl text-orange-500 font-semibold flex items-center gap-1">
              <FaDollarSign className="text-primary" />
              {total.toFixed(2)}
            </p>
          </div>
        </div>
      ) : (
        <h2 className="text-3xl text-primary font-bold">No Orders Found</h2>
      )}
    </div>
  );
};

export default UsersOrder;
