"use client"

import { useRouter } from 'next/navigation'
import Image from "next/image";
import styles from "./page.module.css";

import { SignOn } from '@/redux/reducer/user';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';


export default function Home() {
  const dispatch = useDispatch();
  const a = useSelector(state => state.user)
  const login = () => {
    // router.push('/Admin/Official', { scroll: false })
      var User = {
        name:'john',
        lname: 'doe'
      }

      dispatch(SignOn(User))
   
    
  }

  console.log(a, "--> CHECK")

  return (
    <main className={`container-fluid ${styles.fullHeight}`}>
      <div className="row vh-100">

        <div className="col-lg-7 d-flex align-items-center justify-content-center bg-2">
          
        </div>

        <div className="col-lg-5 p-5 d-flex flex-column align-items-center justify-content-center bg-1">

    {/* u */}
          <div>
          <Image
            className='logo-size'
            src={require('../assets/centrallogo.png')}
          />
            <Image
            className='logo-size'
            src={require('../assets/taguiglogo.png')}
          />
            <Image
            className='logo-size'
            src={require('../assets/sklogo.png')}
          />
          </div> 
          
          <h3 className="f-white fw-bold">
            BARANGAY CENTRAL BICUTAN
          </h3>
          <h4 className="f-white">
            DOCUMENT REQUEST SYSTEM
          </h4>

          <h5 className="f-white mt-5">
            Sign in to start your session.
          </h5>

          <div class="mb-3 mt-5 w-100">
            <input type="email" class="form-control rounded-pill" id="exampleFormControlInput1" placeholder="Username" />
          </div>

          <div class="mb-3 w-100">
            <input type="email" class="form-control rounded-pill" id="exampleFormControlInput1" placeholder="Password" />
          </div>

      
          <div className="d-flex flex-column align-items-center" style={{width:"80%"}}>
          <button onClick={() => login()} type="button" class="btn fw-bold f-white w-100" style={{backgroundColor: "yellow"}}>SIGN IN</button>
            <span className="f-white align-self-end">
              Forgot password?
            </span>
          </div>

        </div>


      </div>
    </main>
  );
}
