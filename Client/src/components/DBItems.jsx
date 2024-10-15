import React from 'react';
import {DataTable} from '../components';
import {FaDollarSign} from "../assets/icons"
import { useDispatch, useSelector } from 'react-redux';
import { deleteAProduct } from '../api';
import { getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productActions';
import { alertNull, alertSuccess } from '../context/actions/alertActions';

const DBItems = () => {
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();
  return (
    <div className='flex items-center justify-center w-full gap-4 pt-6'>
        <DataTable columns={[
          {title : "Image", field : "imageURL", render: (rowData) => (
            <img
            src={rowData.imageURL}
            className='w-32 h-16 object-contain rounded-md'
            />
          ),},{
            title : "Name",
            field: "product_name",
          },
          {
            title : "Category",
            field : "product_category",
          },
          {
            title : "Price",
            field : "product_price",
            render:(rowData) => (
              <p className='text-xl font-semibold text-textColor flex items-center'>
                <FaDollarSign className='text-red-400'/>
                {parseFloat(rowData.product_price).toFixed(2)}
              </p>
            )
          },
        ]}
        data={products} 
        title={"List of Products"}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit",
            onClick: (event, rowData) => { 
              alert("You want to edit " + rowData.productId);
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Data",
            onClick: (event, rowData) => { 
              if (window.confirm(
                "Are you sure you want to perform this action ?")
              ) {
                deleteAProduct(rowData.productId).then(res => {
                  dispatch(alertSuccess("Product deleted"));
                  setInterval(() => {
                    dispatch(alertNull());
                  }, 3000);
                  getAllProducts().then((data) => {
                    dispatch(setAllProducts(data));
                  });
                })
              }
            },
          },
        ]}
      />
      </div>
  )
}

export default DBItems;