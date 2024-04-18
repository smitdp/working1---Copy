import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../Server";
import registrationImage from "../../assets/Images/registrationImage.png";
import Swal from "sweetalert2";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data)
      const response = await axios.post(`${baseURL}/auth/register`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        confirmPassword: data.confirmPassword,
        roleId: 3,
        isApproved: 3,
        isActive: true,
      });
      // alert(response.data);
      const alert = await Swal.fire({
        icon: "success",
        title: "Successfull",
        text: response.data
       
      });
       
      // Navigate to login route after successful registration
      alert.isConfirmed && navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {

        console.log(error);
        if ((error.response.data = "Email already exists.")) {
          setErrorMessage("Email already exists");
        }
      } else {
        console.error("Registration error:", error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
    }
  };

  // Watch the password field to validate confirmPassword
  const password = watch("password");

  return (
    <div className="register-main-container">
      <div className="image-container">
        <img src={registrationImage} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <h2>Register</h2>
        {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
        <div className="flex">
          <div>
            <input
              type="text"
              {...register("firstName", { required: true })}
              placeholder="First name"
              autoFocus
            />
            {errors.firstName && (
              <span style={{ color: "red" }}>First name is required</span>
            )}
          </div>
          <div>
            <input
              type="text"
              {...register("lastName", { required: true })}
              placeholder="Last Name"
            />
            {errors.lastName && (
              <span style={{ color: "red" }}>Last name is required</span>
            )}
          </div>
        </div>
        <div>
          <input
            type="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            placeholder="Email"
          />
          {errors.email && (
            <span style={{ color: "red" }}>
              Please enter a valid email address
            </span>
          )}
        </div>
        <div>
          <input
            type="tel"
            {...register("phoneNumber", {
              required: true,
              pattern: /^\d{10}$/,
            })}
            placeholder="Phone number"
          />
          {errors.phoneNumber && (
            <span style={{ color: "red" }}>Phone number must be 10 digits</span>
          )}
        </div>
        <div>
          <input
            type="password"
            {...register("password", {
              required: true,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            })}
            placeholder="Password"
          />
          {errors.password && (
            <span style={{ color: "red" }}>
              Password must be at least 8 characters long and contain at least
              one uppercase letter, one lowercase letter, one number, and one
              special character
            </span>
          )}
        </div>
        <div>
          <input
            type="password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === password || "The passwords do not match",
            })}
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <span style={{ color: "red" }}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div className="buttons-container">
          <button type="submit">Register</button>
          <button type="reset">Clear</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
