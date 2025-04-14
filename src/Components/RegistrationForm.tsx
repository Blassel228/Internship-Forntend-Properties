import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input.tsx";
import Label from "./Label.tsx";
import {UserCreate} from "../Types/types.tsx";

const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const onSubmit = (data: UserCreate) => {
    console.log("Registering with:", data);
    navigate("/home");
  };

  return (
    <div className="w-[30%] border border-gray-300 rounded-lg mt-10 mx-auto p-8 shadow-md mb-20">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            {...register("name", { required: "Full name is required" })}
            placeholder="Enter your full name"
          />
          <p
            className={`text-red-500 text-sm ${
              errors.name ? "visible" : "invisible"
            }`}
          >
            {errors.name?.message || "\u00A0"}
          </p>
        </div>

        <div>
          <Label htmlFor="surname">Surname</Label>
          <Input
            type="text"
            id="surname"
            {...register("surname", { required: "Surname is required" })}
            placeholder="Enter your surname"
          />
          <p
            className={`text-red-500 text-sm ${
              errors.surname ? "visible" : "invisible"
            }`}
          >
            {errors.surname?.message || "\u00A0"}
          </p>
        </div>

        <div>
          <Label htmlFor="Username">Username</Label>
          <Input
            type="text"
            id="username"
            {...register("username", { required: "Username is required" })}
            placeholder="Enter your username"
          />
          <p
            className={`text-red-500 text-sm ${
              errors.username ? "visible" : "invisible"
            }`}
          >
            {errors.username?.message || "\u00A0"}
          </p>
        </div>

        <div>
          <Label htmlFor="phone_number">Phone Number</Label>
          <Input
            type="tel"
            id="phone_number"
            {...register("phone_number", {
              required: "Phone number is required",
              pattern: {
                value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
                message: "Please enter a valid phone number",
              },
              validate: (value: string) => {
                const digitsOnly = value.replace(/[^0-9]/g, "");
                return (
                  digitsOnly.length >= 7 ||
                  "Phone number must have at least 7 digits"
                );
              },
            })}
            placeholder="Enter your phone number"
          />
          <p
            className={`text-red-500 text-sm ${
              errors.phone_number ? "visible" : "invisible"
            }`}
          >
            {errors.phone_number?.message || "\u00A0"}
          </p>
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
          />
          <p
            className={`text-red-500 text-sm ${
              errors.email ? "visible" : "invisible"
            }`}
          >
            {errors.email?.message || "\u00A0"}
          </p>
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <p
            className={`text-red-500 text-sm ${
              errors.password ? "visible" : "invisible"
            }`}
          >
            {errors.password?.message || "\u00A0"}
          </p>
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            placeholder="Confirm your password"
          />
          <p
            className={`text-red-500 text-sm ${
              errors.confirmPassword ? "visible" : "invisible"
            }`}
          >
            {errors.confirmPassword?.message || "\u00A0"}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
