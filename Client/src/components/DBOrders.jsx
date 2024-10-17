import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaDollarSign } from "react-icons/fa"; // Assurez-vous d'importer FaDollarSign ici
import { staggerFadeInOut } from "../animations";

const DBOrders = () => {
  // Exemples d'orders ajoutés manuellement
  const exampleOrders = [
    {
      orderId: 1,
      total: "9.99",
      status: "preparing",
      sts: "preparing",
      items: [
        {
          imageURL:
            "https://firebasestorage.googleapis.com/v0/b/food-app-45888.appspot.com/o/Images%2F1728957998083_i2.png?alt=media&token=ae4409bb-6b7a-472d-a038-d88ef938d769",
          product_name: "Vanilla Ice cream",
          product_price: "9.99",
          quantity: 1,
        },
      ],
      shipping_details: {
        name: "John Doe",
        address: {
          line1: "123 Main St",
          line2: "Apt 4B",
          country: "USA",
          state: "NY",
          postal_code: "10001",
        },
      },
      customer: {
        email: "johndoe@example.com",
        phone: "555-555-5555",
      },
    },
    {
      orderId: 2,
      total: "12",
      status: "cancelled",
      sts: "cancelled",
      items: [
        {
          imageURL:
            "https://firebasestorage.googleapis.com/v0/b/food-app-45888.appspot.com/o/Images%2F1729036757305_c3.png?alt=media&token=b6529f1e-cd90-43be-95cf-7c83442319cb",
          product_name: "Chicken for 2",
          product_price: "12",
          quantity: 1,
        },
      ],
      shipping_details: {
        name: "Jane Smith",
        address: {
          line1: "456 Oak St",
          line2: "Apt 2A",
          country: "USA",
          state: "CA",
          postal_code: "90210",
        },
      },
      customer: {
        email: "janesmith@example.com",
        phone: "444-444-4444",
      },
    },
    {
      orderId: 3,
      total: "270",
      status: "delivered",
      sts: "delivered",
      items: [
        {
          imageURL:
            "https://firebasestorage.googleapis.com/v0/b/food-app-45888.appspot.com/o/Images%2F1729052305485_Burger.webp?alt=media&token=e47543b9-745c-4086-a045-9ec1db7df7f7",
          product_name: "Beef Burger",
          product_price: "15",
          quantity: 18,
        },
      ],
      shipping_details: {
        name: "Alice Johnson",
        address: {
          line1: "789 Pine St",
          line2: "",
          country: "USA",
          state: "TX",
          postal_code: "73301",
        },
      },
      customer: {
        email: "alicejohnson@example.com",
        phone: "333-333-3333",
      },
    },
  ];

  const Order = ({ order, index }) => {
    const [status, setStatus] = useState(order.status);

    return (
      <motion.div
        {...staggerFadeInOut(index)}
        className="w-full flex flex-col items-start justify-start px-2 py-1 border relative border-gray-300 bg-lightOverlay drop-shadow-md rounded-md gap-2 mb-4"
      >
        <div className="w-full flex items-center justify-between">
          <h2 className="text-lg font-bold">Order #{order.orderId}</h2>
          <p className="text-sm text-headingColor">
            Status: <span className="font-semibold">{status}</span>
          </p>
        </div>

        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-start gap-3">
            <img
              src={item.imageURL}
              alt={item.product_name}
              className="w-16 h-16 object-cover" // Ajustez la taille de l'image si nécessaire
            />
            <div className="flex items-start flex-col">
              <h3 className="text-base font-semibold text-headingColor">
                {item.product_name}
              </h3>
              <div className="flex items-start gap-1">
                <p className="text-sm text-textColor">Qty: {item.quantity}</p>
                <p className="flex items-center gap-1 text-textColor">
                  <FaDollarSign className="text-base text-red-500" />
                  <span className="text-headingColor font-bold">
                    {parseFloat(item.product_price).toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Conteneur flex pour les boutons de statut et les détails d'expédition */}
        <div className="flex justify-between items-start mt-8 w-full">
          <div className="flex justify-end gap-2">
            <button
              className="text-orange-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer"
              onClick={() => setStatus("preparing")}
            >
              Preparing
            </button>
            <button
              className="text-red-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer"
              onClick={() => setStatus("cancelled")}
            >
              Cancelled
            </button>
            <button
              className="text-emerald-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer"
              onClick={() => setStatus("delivered")}
            >
              Delivered
            </button>
          </div>

          {/* Détails d'expédition alignés à droite */}
          <div className="flex items-start flex-col gap-1 px-4">
            <h1 className="text-lg text-headingColor font-semibold">
              {order.shipping_details.name}
            </h1>
            <p className="text-base text-headingColor -mt-1">
              {order.customer.email} {order.customer.phone}
            </p>
            <p className="text-base text-textColor -mt-1">
              {order.shipping_details.address.line1},{" "}
              {order.shipping_details.address.line2}{" "}
              {order.shipping_details.address.country},{" "}
              {order.shipping_details.address.state} -
              {order.shipping_details.address.postal_code}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full">
      {exampleOrders.map((order, index) => (
        <Order key={order.orderId} order={order} index={index} />
      ))}
    </div>
  );
};

export default DBOrders;
