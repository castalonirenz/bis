"use client"

import { useRouter } from 'next/navigation'
import Image from "next/image";
import styles from "./page.module.css";

import { SignOn, loginUser } from '@/redux/reducer/user';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ForgotModal } from '@/components/Modal';

export default function Home() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user)

  const [openForgot, setOpenForgot] = useState(false)
  const login = async () => {

    var User = {
      email, pass
    }

    // keanu@gmail.com
    // secret123

    // dispatch(loginUser(User)).unwrap();

    try {
      const result = await dispatch(loginUser(User)).unwrap();


      router.push('/Admin/Official/Dashboard', { scroll: false })

      // Handle success, e.g., navigate to another page
    } catch (error) {

      // Handle error, e.g., show an error message
    }



    // dispatch(SignOn(User))


  }

  useEffect(() => {


    if (userState.status == "failed") {
      alert("Invalid credentials, please try again.")
    }
    else if (userState.status == "succeeded") {
      router.push('/Admin/Official/Dashboard', { scroll: false })
    }

  }, [userState.status])


  return (
    <main className={`container-fluid ${styles.fullHeight}`}>


      <div className="row vh-100">

        {
          openForgot && <ForgotModal
            close={() => setOpenForgot(false)}
          />
        }

        <div className="col-lg-7 d-flex align-items-center justify-content-center bg-2">


        </div>

        <div className="col-lg-5 p-5 d-flex flex-column align-items-center justify-content-center bg-1">

          {/* u */}
          <div>
            <Image
              className='logo-size'
              src={require('../assets/central.png')}
            />
            <Image
              className='logo-size'
              src={require('../assets/taguig.png')}
            />
            <Image
              className='logo-size'
              src={require('../assets/sk.png')}
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

          <div className="mb-3 mt-5 w-100">
            <input
              value={email}
              onChange={(v) => {
                setEmail(v.target.value)
              }}
              type="email" className="form-control rounded-pill" id="exampleFormControlInput1" placeholder="Username" />
          </div>

          <div className="mb-3 w-100">
            <input
              value={pass}
              type="password"
              onChange={(v) => {
                setPass(v.target.value)
              }} className="form-control rounded-pill" id="exampleFormControlInput1" placeholder="Password" />
          </div>


          <div className="d-flex flex-column align-items-center" style={{ width: "80%" }}>
            <button onClick={() => login()} type="button" className="btn fw-bold f-white w-100 bg-yellow mybutton">SIGN IN</button>

          </div>



          <div 
          
         
          className="d-flex  align-items-center mt-2 justify-content-end" style={{ width: "80%" }}>
           
           <label
             onClick={() => setOpenForgot(true)}
             className='pointer f-white'
           >
            Forgot Password?
           </label>

          </div>


          <div className="d-flex flex-column justify-content-center align-items-center mt-5">

            <button onClick={() => {
              router.push('/Appointment/Resident', { scroll: false })
            }} type="button" className="btn fw-bold f-white w-100 d-flex d-flex align-items-center justify-content-center mybutton">
              <i class="bi bi-calendar-month me-3" style={{ fontSize: "36px" }}></i>
              Resident Appointment
            </button>
          </div>


        </div>


      </div>
    </main>
  );
}
