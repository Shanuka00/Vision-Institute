import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import loginImage from '../images/login_image.png';
import visionLogoT from '../images/visionLogoT.png';
import Nav from 'react-bootstrap/Nav';

function Login() {
  return (
    
    <section className="mx-40 w-70 space-y-20 mt-10 pt-1 mb-10 bg-gray-200 rounded-xl p-10">
      <div className="h-full">

        <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
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
            <form>

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
                    id="exampleFormControlInput2"
                    placeholder="Vision ID"
                  />
                </div>

                <div className="relative mb-6 bg-white rounded mt-4" data-twe-input-wrapper-init>
                  <input
                    type="password"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-black dark:text-black dark:placeholder:text-gray-500 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                    id="exampleFormControlInput22"
                    placeholder="Password"
                  />
                </div>


              <div className="mb-3 flex items-center justify-between">
               
                <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
                  <input
                    className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
                    type="checkbox"
                    value=""
                    id="exampleCheck2" />
                  <label
                    className="inline-block ps-[0.15rem] hover:cursor-pointer"
                    htmlFor="exampleCheck2">
                    Remember me
                  </label>
                </div>

                
                <a href="#!">Forgot password?</a>
              </div>

              
              <div className="text-center lg:text-left">
                <button
                  type="button"
                  className="inline-block w-full rounded mt-0 px-7 pb-3 pt-3 text-base font-medium leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out bg-indigo-900 hover:bg-indigo-950 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  data-twe-ripple-init
                  data-twe-ripple-color="light">
                  Login
                </button>

                <div>
                  <Link to="/std_registration">
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
