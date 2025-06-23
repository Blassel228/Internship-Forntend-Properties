import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input.tsx";
import Label from "./Label.tsx";
import { UserCreate } from "../Types/types.tsx";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'libphonenumber-js';
import useCreateUser from "../Hooks/useUserRegister.tsx";
import routers from "../Constants/routers.tsx";
import RegistrationFormError from "./RegistrationFormError.tsx";

const RegistrationForm: React.FC = () => {
  const { mutate: createUserMutation, error } = useCreateUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState<string>("");
  const [country, setCountry] = useState<string>("GB");

  useEffect(() => {
    if (error && error.response?.data?.detail) {
      const fieldErrors = error.response.data.detail;

      Object.entries(fieldErrors).forEach(([field, message]) => {
        setError(field as keyof UserCreate, {
          type: "manual",
          message: message as string,
        });
      });
    }
  }, [error, setError]);

  const onSubmit = async (data: any) => {
    clearErrors();

    if (!isValidPhoneNumber(phone)) {
      setError("phone_number", {
        type: "manual",
        message: "Please enter a valid phone number",
      });
      return;
    }

    const submitData: UserCreate = {
      ...data,
      phone_number: phone,
      country: country,
    };

    try {
      await createUserMutation(
        { user: submitData },
        {
          onSuccess: () => {
            navigate(routers.home);
          },
        }
      );
    } catch (err: any) {
      if (!error) {
        setError("root.serverError", {
          type: "manual",
          message: "Registration failed. Please try again.",
        });
      }
    }
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
          <RegistrationFormError error={errors.name}>
            {errors.name?.message || "\u00A0"}
          </RegistrationFormError>
        </div>

        <div>
          <Label htmlFor="surname">Surname</Label>
          <Input
            type="text"
            id="surname"
            {...register("surname", { required: "Surname is required" })}
            placeholder="Enter your surname"
          />
          <RegistrationFormError error={errors.surname}>
            {errors.surname?.message || "\u00A0"}
          </RegistrationFormError>
        </div>

        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            {...register("username", { required: "Username is required" })}
            placeholder="Enter your username"
          />
          <RegistrationFormError error={errors.username}>
            {errors.username?.message || "\u00A0"}
          </RegistrationFormError>
        </div>

        <div>
          <Label htmlFor="phone_number">Phone Number</Label>
          <PhoneInput
            international
            defaultCountry="GB"
            value={phone}
            onCountryChange={(country: string) => setCountry(country)}
            onChange={(phone: string) => {
              setPhone(phone);
              clearErrors("phone_number");
            }}
            className={`w-full border ${errors.phone_number ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
          />
          <RegistrationFormError error={errors.phone_number}>
            {errors.phone_number?.message || "\u00A0"}
          </RegistrationFormError>
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
          />
          <RegistrationFormError error={errors.email}>
            {errors.email?.message || "\u00A0"}
          </RegistrationFormError>
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
          <RegistrationFormError error={errors.password}>
            {errors.password?.message || "\u00A0"}
          </RegistrationFormError>
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
          <RegistrationFormError error={errors.confirmPassword}>
            {errors.confirmPassword?.message || "\u00A0"}
          </RegistrationFormError>
        </div>

        {errors.root?.serverError && (
          <RegistrationFormError error={errors.root}>
            {errors.root.serverError.message}
          </RegistrationFormError>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;