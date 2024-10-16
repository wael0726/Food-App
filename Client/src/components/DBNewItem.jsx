import React, { useState } from 'react';
import { statuses } from '../utils/style';
import { FaCloudUploadAlt, MdDelete } from '../assets/icons';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../config/firebase.config';
import { useDispatch, useSelector } from 'react-redux';
import { alertDanger, alertNull, alertSuccess } from '../context/actions/alertActions';
import { motion } from 'framer-motion';
import { buttonclick } from '../animations';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import { addNewProduct, getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productActions';

const MIN = 0;
const MAX = 100;

const normalise = (value) => ((value - MIN) * 100) / (MAX - MIN);

const DBNewItem = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0); 
  const [category, setCategory] = useState(null);
  const [imageDownloadURL, setimageDownloadURL] = useState(null);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const upladImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}_${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on("state_changed", 
      (snapshot) => {
        const progressValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressValue);
      }, 
      (error) => {
        dispatch(alertDanger(`Error : ${error}`));
        setTimeout(() => {
          dispatch(alertNull());
        }, 3000);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimageDownloadURL(downloadURL);
          setIsLoading(false);
          setProgress(0);
          dispatch(alertSuccess('Image uploaded to the cloud'));
          setTimeout(() => {
            dispatch(alertNull());
          }, 3000);
        });
      })
  };

  const deleteImageFromFirebase = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageDownloadURL)
    deleteObject(deleteRef).then(() => {
      setimageDownloadURL(null);
      setIsLoading(false);
      dispatch(alertSuccess('Image removed from the cloud'));
          setTimeout(() => {
            dispatch(alertNull());
          }, 3000);
    });
  };

  const submitNewData = () => {
    const data = {
      product_name: itemName,
      product_category: category,
      product_price: price,
      imageURL: imageDownloadURL, 
    };
    addNewProduct(data).then((res) => {
      console.log(res);
      dispatch(alertSuccess("New item added"))
      setTimeout(() => {
        dispatch(alertNull());
      }, 3000);
      setimageDownloadURL(null);
      setItemName("");
      setPrice("");
      setCategory(null);
    });
    getAllProducts().then((data) => {
      dispatch(setAllProducts(data));
    });
  };

  return (
    <div className='flex items-center justify-center flex-col pt-6 px-24 w-full'>
      <div className='border border-gray-300 rounded-md p-4 w-full flex flex-col
      items-center justify-center gap-4'>
        <InputValueField
        type="text"
        placeHolder={"Item name"}
        stateFunc={setItemName}
        stateValue={itemName}
        />

        <div className='w-full flex items-center justify-around gap-3 
        flex-wrap'>
          {statuses && 
          statuses.map((data) => {
            return (
            <p 
            key={data.id} 
            onClick={() => setCategory(data.category)}
            className={`px-4 py-3 rounded-md text-xl text-textColor font-semibold
              cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md ${data.category === category 
                ? "bg-green-900 text-white"
                : "bg-transparent"
              }`}
              > 
              {data.title} 
              </p>
              );
            })
            }
          </div>
          <InputValueField
        type="number"
        placeHolder={"Item price"}
        stateFunc={setPrice}
        stateValue={price}
        /> 

        <div className='w-full bg-card backdrop-blur-md h-370 rounded-md
        border-2 border-dotted border-gray-300 cursor-pointer'>
          {isLoading ? ( 
          <div className='w-full h-full flex flex-col items-center justify-evenly px-24'> 
            {progress > 0 && (
              <React.Fragment>
                <CircularProgress variant="determinate" value={normalise(progress)} />
                <LinearProgress variant="determinate" value={normalise(progress)} />
              </React.Fragment>
            )}
          </div> 
          ) : (
            <>
            {!imageDownloadURL ? (
              <>
            <label>
              <div className='flex flex-col items-center
              justify-center h-full w-full cursor-pointer'>
                <div className='flex flex-col items-center
                justify-center cursor-pointer'>
                  <p className='font-bold text-4xl'>
                    <FaCloudUploadAlt className='-rotate-0' /> 
                  </p>
                  <p className='text-lg text-textColor'>
                    Click to upload an image
                  </p>
                </div>
              </div>
              <input
              type="file"
              name = "upload-image"
              accept = "image/*"
              onChange ={upladImage}
              className="w-0 h-0"
              />
            </label>
              </> 
             ) : (
               <>
               <div className='relative w-full h-full overflow-hidden rounded-md'>
                <motion.img
                whileHover={{scale: 1.15}}
                src={imageDownloadURL}
                className='w-full h-full object-cover'
                />

                <motion.button
                {...buttonclick}
                type="button"
                className='absolute top-3 right-3 p-3 rounded-full
                bg-green-900 text-xl cursor-pointer outline-none
                hover:shadow-md duration-500 transition-all ease-in-out'
                onClick={() => deleteImageFromFirebase(imageDownloadURL)}
                >
                  <MdDelete className='-rotate-0'/>
                </motion.button>

               </div>
               </>
               )}
            </>
          )}
        </div>
        <motion.button onClick={submitNewData} {...buttonclick} className="w-9/12 py-2 rounded-md bg-red-400
        text-primary hover:bg-red-500 cursor-pointer">
          Save
        </motion.button>
      </div>
    </div>
  );
};

export const InputValueField = ({
  type, 
  placeHolder, 
  stateValue, 
  stateFunc,
}) => {
  return <>
  <input
  type={type}
  placeholder={placeHolder}
  className='w-full px-4 py-3 bg-white shadow-md outline-none rounded-md
  border border-gray-200 focus:border-green-900'
  value={stateValue}
  onChange={(e) => stateFunc(e.target.value)}
  />
  </>;
};

export default DBNewItem;
