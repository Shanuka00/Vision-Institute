import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import loginImage from '../../images/login_image.png';
import visionLogoT from '../../images/visionLogoT.png';
import Nav from 'react-bootstrap/Nav';
import '../../styles/login_page.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import Swal from 'sweetalert2';

function Login() {

  const [visionId, setVisionId] = useState('');
  const [password, setPassword] = useState('');
 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await authService.login({
        visionId,
        password,
      });
      console.log(response);
  
      if (response && response.token) {
        
        // store the token in local storage
        localStorage.setItem('token', response.token);
        localStorage.setItem('visionId', response.userId);
  
        Swal.fire({
          title: "Login Successful!",
          icon: "success",
          confirmButtonText: "Proceed",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(response.redirect);
          }
        });
      } else {
        throw new Error('Login failed: No token in response');
      }
    } catch (error) {
      console.error("Login failed:", error);
      Swal.fire({
        title: "Login Failed",
        text: "Invalid ID or password. Please try again!",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  const forgotPass = () => {
    Swal.fire({
      title: "Please contact vision administration to reset your password!",
      text: "Contact: 077 41 43 243",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutUp
          animate__faster
        `
      }
    });    
  };
  

  return (
    
    <section className="mx-40 w-70 space-y-20 mt-10 pt-1 mb-10 bg-gray-200 rounded-xl p-10">
      <div className="h-full">

        <div className="flex h-full flex-wrap-reverse items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 pl-10 mt-20">    
            <img
              src={loginImage}
              className="w-full"
              alt="A classroom" />  

            <div className="text-center">
              <label className="inline-block text-lg font-bold italic text-indigo-900 hover:cursor-pointer mt-4">
                "දක්ෂ පලපුරුදු ගුරු මඩුල්ලක්<br/>ඔබ ප්‍රදේශයේ<br/>ඔබත් සම්බන්ධ වන්න"
              </label>
            </div>


          </div>


          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 pr-10">

            <form onSubmit={handleSubmit} className="form">

            <div className="text-center mb-3 w-40 ml-auto mr-auto mt-2">
              <Nav.Link as={Link} to="/">
                <img src={visionLogoT} alt="Vision Logo" />
              </Nav.Link>
            </div>

              <div>
                <Link to="/std_registration">
                  <button className="inline-block w-full rounded px-7 pb-3 pt-3 text-sm font-medium leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out bg-indigo-900 hover:bg-indigo-950 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                  👉 New Registration 👈<br/>(අලුතින් ලියාපදිංචි වන්න)</button>
                </Link>
              </div>

                <div className="relative mb-6 bg-white rounded mt-4" data-twe-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded-xl border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-black dark:text-black dark:placeholder:text-gray-500 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                    id="visionid"
                    placeholder="Vision ID"
                    value={visionId}
                    onChange={(e) => setVisionId(e.target.value)}
                    required
                  />
                </div>

                <div className="relative mb-6 bg-white rounded mt-4" data-twe-input-wrapper-init>
                  <input
                    type="password"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-black dark:text-black dark:placeholder:text-gray-500 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>


              <div className="mb-3 -mt-2 items-center justify-between">
                
                <label onClick={forgotPass} className='text-sm text-blue-600 hover:font-semibold hover:cursor-pointer ml-40 nounderline'>Forgot password?</label>
              </div>

              
              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="submit-button inline-block w-full rounded mt-0 px-7 pb-3 pt-3 text-base font-medium leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out bg-indigo-900 hover:bg-indigo-950 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  data-twe-ripple-init
                  data-twe-ripple-color="light">
                  Login
                </button>

                <div>
                  <Link to="/already_reg">
                    <button className="inline-block w-full rounded mt-4 px-7 pb-3 pt-3 text-sm font-medium leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out bg-indigo-900 hover:bg-indigo-950 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                    If you are already a student attending<br/>classes in the institute<br/>(ඔබ දැනටමත් ආයතනයේ පන්ති<br/>පැමිණෙන සිසුවෙක් නම්)</button>
                  </Link>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

  );
}

export default Login;
