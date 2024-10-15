import React, { useEffect, useState } from "react";
import { imgbg, imgLogo } from "../assets";
import { Logininput } from "../components";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons";
import { motion } from "framer-motion";
import { buttonclick, fadeInOut } from "../animations";
import {getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {app} from "../config/firebase.config";
import { validateUserJWTToken } from "../api";
import {useNavigate} from "react-router-dom";
import {setUserDetails} from "../context/actions/userActions";
import { useDispatch, useSelector } from 'react-redux';
import { alertInfo, alertWarning } from "../context/actions/alertActions";


const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  // ENLEVER CA PCQ CA PUSH LE LOGIN DANS LE MAIN DIRECT DONC JE PEUT PAS AVOIR ACCES AU LOGIN ET TESTER
  useEffect(() => {
    if(user){
      navigate("/", { replace : true });
    }
  }, [user, navigate]);
  // VOILA

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if(cred){
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              dispatch(setUserDetails(data));
            });
            navigate("/", { replace: true });
          });        
        }
      });    
    });
  };

  const signUpWithEmailPassword = async () => {
    if((userEmail === "" || password === "" || confirmationPassword === "")){
      dispatch(alertInfo("Required fields should not be empty"));
    } else {
      if(password === confirmationPassword){
        setUserEmail("");
        setPassword("");
        setConfirmationPassword("");
        await createUserWithEmailAndPassword(firebaseAuth, userEmail, password).then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if(cred){
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });        
            }
          });
        })
      } else {
        dispatch(alertWarning("Password does not match"));
      }
    }
  };



  const handleSignInWithEmailAndPassword = async () => {
    if(userEmail !== "" && password !== "") {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then((userCred) => {
        firebaseAuth.onAuthStateChanged((cred) => {
          if(cred){
            cred.getIdToken().then((token) => {
              validateUserJWTToken(token).then((data) => {
                dispatch(setUserDetails(data));
              });
              navigate("/", { replace: true });
            });        
          }
        });
      })
    } else {
      dispatch(alertWarning("Password does not match"));
    }
  }

  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      {/* Background image */}
      <img src={imgbg} className="w-full h-full object-cover absolute" alt="" />

      {/* Content box */}
      <div className="flex flex-col items-center bg-gray-300 bg-opacity-70 w-[80%] md:w-508 h-full z-10 p-5 rounded-lg backdrop-blur-sm p-4 px-4 py-12">
        {/* Top logo */}
        <div className="flex items-center justify-start gap-4 w-full">
          <img src={imgLogo} className="w-20" alt="" />
          <p className="text-headingColor font-semibold text-4xl">
            Kapelka Restaurant
          </p>
        </div>
        {/* Welcome text */}
        <p className="text-3xl font-semibold text-headingColor mt-16">
          Welcome Back
        </p>
        <p className="text-xl text-textColor -mt-1">
            {isSignUp ? "Sign Up" : "Sign In"} with following
        </p>

        {/* Input section */}
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <Logininput
            placeholder={"Email Here"}
            icon={<FaEnvelope className="text-xl text-textColor" />}
            inputState={userEmail}
            inputStateFunc={setUserEmail}
            type="email"
            isSignUp={isSignUp}
          />

          <Logininput
            placeholder={"Password Here"}
            icon={<FaLock className="text-xl text-textColor" />}
            inputState={password}
            inputStateFunc={setPassword}
            type="password"
            isSignUp={isSignUp}
          />

          {isSignUp && (
            <Logininput
              placeholder={"Please confirm your password"}
              icon={<FaLock className="text-xl text-textColor" />}
              inputState={confirmationPassword}
              inputStateFunc={setConfirmationPassword}
              type="password"
              isSignUp={isSignUp}
            />
          )}

          {isSignUp ? (
            <p>
              Already have an account?{" "}
              <motion.button
                {...buttonclick}
                onClick={() => setIsSignUp(false)}
                className="text-red-500 underline cursor-pointer bg-transparent"
              >
                Sign in
              </motion.button>
            </p>
          ) : (
            <p>
              Doesn't have an account?{" "}
              <motion.button
                {...buttonclick}
                onClick={() => setIsSignUp(true)}
                className="text-red-500 underline cursor-pointer bg-transparent"
              >
                Create one
              </motion.button>
            </p>
          )}

          {/* Boutton Sign In/Up Section */}
          {isSignUp ? <motion.button 
          {...buttonclick} 
          className=" w-full px-4 py-2 rounded-none bg-red-500 cursor-pointer text-white text-xl capitalize hover:bg-red-700 transition-all duration-150"
          onClick={signUpWithEmailPassword}
          >
            Sign Up 
          </motion.button> : <motion.button 
          {...buttonclick} 
          className=" w-full px-4 py-2 rounded-none bg-red-500 cursor-pointer text-white text-xl capitalize hover:bg-red-700 transition-all duration-150"
          onClick={handleSignInWithEmailAndPassword}
          >
            Sign In 
          </motion.button>}
        </div>
        
        {/*Ligne avant Google*/}
        <div className="flex items-center justify-between gap-14 mt-5">
            <div className="w-24 h-[1px] rounder-md bg-white"></div>
            <p className="text-white"> Or </p>
            <div className="w-24 h-[1px] rounder-md bg-white"></div>
        </div>

        <motion.div
         {...buttonclick} 
         {...fadeInOut}
         className="flex items-center justify-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-8 mt-6"
         onClick={loginWithGoogle}
         >
            <FcGoogle className="text-3xl"/>
            <p className="capitalize text-base text-headingColor"> Sign In with Google</p>
        </motion.div>

      </div>
    </div>
  );
};

export default Login;
