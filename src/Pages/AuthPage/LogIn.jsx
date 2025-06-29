import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import img_1 from "../../assets/form_img.png";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import SocialLogIn from "./SocialLogIn";



const LogIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const {logIn} = useAuth() // context api
  const [showPassword,setshowPassword] = useState(false);


  //   form submit function

  const onsubmit = async (data) => {

   const result =  await logIn(data.email,data.password)
          
  };

  return (
    <div className="primary_bg_color w-full min-h-screen flex justify-center items-center z-0 py-10 md:py-14 lg:py-20 ">

      <div className="bg-white w-[85%]  z-10 shadow-2xl grid grid-cols-1 lg:grid-cols-2">
                        {/* logIn image  */}
        <div className="form_img primary_bg_color w-full flex justify-center items-center py-6 ">
          <img src={img_1} alt="form image" className="w-1/2" />
        </div>
                    {/* log in form  */}
        <div className="form_section p-6">
          <form action="" onSubmit={handleSubmit(onsubmit)}>
        

            <div className="grid grid-cols-1  gap-x-2">
              {/* email */}
              <div>
                <label htmlFor="" className="block font-semibold capitalize">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: "email is Required" })}
                  className="w-full px-3 py-2  "
                  placeholder="Enter Email Adress"
                />

                {errors.email && (
                  <p className="form_error">{errors.email.message} </p>
                )}
              </div>

              {/* password */}
              <div className="relative">
                <label htmlFor="" className="block font-semibold capitalize">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "password is Required",

                    pattern: {
                      value:
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
                      message:
                        "Password Must Contain  1 Uppercase , 1 Lowercase, 1 number , 1 symbol and be at least 6 characters",
                    },
                  })}
                  className="w-full px-3 py-2  "
                  placeholder="Enter Strong password "
                />

                {errors.password && (
                  <p className="form_error">{errors.password.message} </p>
                )}

                <div
                  className="password_toggle_icon absolute top-1/2 right-3 cursor-pointer"
                  onClick={() => setshowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                </div>
              </div>
            </div>


            

            {/* submit button */}

            <button
              type="submit"
              className="primary_btn w-full mt-3 cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Log In "}
            </button>

            <p className="text-base capitalize sm:text-end my-2 font-semibold">
              you don't have an acount ? please{" "}
              <Link to="/sign-up" className="primary_text_color">
                Sign Up
              </Link>
            </p>
          </form>
                            {/* google log in  */}
          <p className="text-lg primary_text_color text-center font-semibold capitalize mb-2">
            or
          </p>

          <div>
            <SocialLogIn></SocialLogIn>
          </div>

          <div>
  
          </div>
        </div>

      </div>
    </div>
  );
};

export default LogIn;
