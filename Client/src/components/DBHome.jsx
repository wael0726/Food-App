import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productActions';

const DBHome = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
        console.log(data);
      })
    }
  }, [])
  return (
    <div>DBHome</div>
  )
}

export default DBHome