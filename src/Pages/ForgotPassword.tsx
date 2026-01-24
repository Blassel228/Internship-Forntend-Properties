import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../Components/Ui/Input.tsx";
import Label from "../Components/Ui/Label.tsx";
import AppButton from "../Components/Ui/AppButton.tsx";
import useForgotPassword from "../Hooks/useForgotPassword.tsx";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const { mutate: requestReset, isPending } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestReset(email);
  };

  return (
    <div className="w-[30%] border border-gray-300 rounded-lg mt-10 mx-auto p-8 shadow-md my-40">
      <h2 className="text-2xl font-bold text-center mb-6">Forgot Password?</h2>
      <p className="text-gray-600 text-center mb-6">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <AppButton
          type="submit"
          disabled={isPending}
          className="w-full py-2 px-4"
        >
          {isPending ? "Sending..." : "Send Reset Link"}
        </AppButton>

        <p className="text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;