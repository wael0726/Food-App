import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productActions';
import { FaUtensils } from 'react-icons/fa'; 
import { CChart } from "@coreui/react-chartjs";

const DBHome = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const drinks = products?.filter(item => item.product_category === "drinks");
  const deserts = products?.filter(item => item.product_category === "deserts");
  const burgers = products?.filter(item => item.product_category === "burgers");
  const rice = products?.filter(item => item.product_category === "rice");
  const curry = products?.filter(item => item.product_category === "curry");
  const chinese = products?.filter(item => item.product_category === "chinese");
  const bread = products?.filter(item => item.product_category === "bread");

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
        console.log(data);
      });
    }
  }, [products, dispatch]);

  return (
    <div className='flex flex-col items-center justify-center w-full pt-6 px-4 md:px-24'>
      <div className='bg-gray-200 rounded-md p-6 md:p-12 w-full max-w-7xl shadow-md'>
        <h2 className='text-2xl font-bold text-green-900 mb-6 text-center md:text-left'>
          Welcome to the Dashboard
        </h2>
        <p className='text-gray-700 text-lg leading-relaxed text-center md:text-left'>
          This is where, as an administrator, you can track everything happening in the application. 
          Whether it's managing products, users, or transactions, you will find all the necessary information 
          to make informed decisions. Use the various sections to quickly navigate through the data and get 
          a comprehensive view of the application's activity. This dashboard is designed to provide you with 
          a clear and intuitive interface, making every management task smoother and more accessible.
        </p>
      </div>

      {/* Product widget */}
      <div className='mt-8 w-full max-w-7xl bg-white p-6 shadow-md rounded-lg flex flex-col items-center'>
        {/* Icon for restaurant */}
        <div className='bg-blue-100 p-4 rounded-full'>
          <FaUtensils size={32} className='text-blue-600' />
        </div>

        {/* Total Number of Products */}
        <h3 className='text-xl font-semibold text-gray-900 mt-4'>{products ? products.length : 'loading...'}</h3>
        <p className='text-gray-500'>
          Total Number of Products 
        </p>
      </div>

      <div className='flex items-center justify-center flex-col pt-6 w-full'>
        <div className='grid w-full grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex items-center justify-center w-full h-96'>
            <CChart
              type="bar"
              data={{
                labels: [
                  'drinks', 
                  'deserts', 
                  'burgers', 
                  'rice', 
                  'curry', 
                  'chinese', 
                  'bread'],
                datasets: [
                  {
                    label: 'Category Count',
                    backgroundColor: '#f87979',
                    data: [
                      drinks?.length,
                      deserts?.length,
                      burgers?.length,
                      rice?.length,
                      curry?.length,
                      chinese?.length,
                      bread?.length,
                    ],
                  },
                ],
              }}
              labels="months"
              style={{ height: '100%', width: '100%' }}
            />
          </div>

          <div className='flex items-center justify-center'>
            <div className='w-400 h-400'> 
              <CChart
                type="doughnut"
                data={{
                  labels: [
                    "Delivered",
                    "Cancelled",
                    "Paid",
                    "Not Paid",
                    "Orders",
                  ],
                  datasets: [
                    {
                      backgroundColor: ['#00FF00', '#FFA726', '#388E3C', '#D32F2F', '#1E88E5'],
                      data: [40, 20, 80, 10, 40],
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBHome;
