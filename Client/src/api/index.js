import axios from "axios";

export const baseURL = "http://localhost:5001/food-app-45888/us-central1/app";

export const validateUserJWTToken = async (token) => {
    try{
        const res = await axios.get(`${baseURL}/api/users/jwtVerification`, {
            headers : {Authorization : "Bearer " + token}
        })
        return res.data.data;
    } catch (err) {
        return null;
    }
};

// get new products
export const addNewProduct = async (data) => {
    try {
        const res = await axios.post(`${baseURL}/api/products/create`, {...data});
        return res.data.data;
    } catch (err) {
        return null;
    } 
};


// get all products
export const getAllProducts = async () => {
    try {
        const res = await axios.get(`${baseURL}/api/products/all`);
        return res.data.data;
    } catch (err) {
        return null;
    } 
};

// delete product
export const deleteAProduct = async (productId) => {
    try {
        const res = await axios.delete(`${baseURL}/api/products/delete/${productId}`);
        return res.data.data;
    } catch (err) {
        return null;
    } 
};

export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${baseURL}/api/users/all`);
        return res.data.data;
    } catch (err) {
        return null;
    }
};

export const addNewItemToCart = async (user_id, data) => {
    try {
        const res = await axios.post(
            `${baseURL}/api/products/addToCart/${user_id}`,
            {...data}
        );
        return res.data.data;
    } catch (error) {
        return null;
    }
};

export const getAllCartItems = async (user_id) => {
    try {
        const res = await axios.get(
            `${baseURL}/api/products/getCartItems/${user_id}`
        );
        return res.data.data;
    } catch (error) {
        return null;
    }
};


export const increaseItemQuantity = async (user_id, productId, type) => {
    console.log(user_id, productId, type);
    try {
      const res = await axios.post(
        `${baseURL}/api/products/updateCart/${user_id}`,
        null,
        { params: { productId: productId, type: type } }
      );
      return res.data.data;
    } catch (error) {
      return null;
    }
};

export const getAllOrder = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/products/orders`);
      return res.data.data;
    } catch (error) {
      return null;
    }
};

export const updateOrderSts = async (order_id, sts) => {
    try {
      const res = await axios.post(
        `${baseURL}/api/products/updateOrder/${order_id}`,
        null,
        { params: { sts: sts } }
      );
      return res.data.data;
    } catch (error) {
      return null;
    }
  };
