import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Input from "../Components/Ui/Input.tsx";
import Label from "../Components/Ui/Label.tsx";
import AppButton from "../Components/Ui/AppButton.tsx";
import useResetPassword from "../Hooks/useResetPassword.tsx";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { mutate: resetPass, isPending } = useResetPassword();

  const validatePassword = (): boolean => {
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePassword() && token) {
      resetPass({ token, new_password: password });
    }
  };

  if (!token) {
    return (
      <div className="w-[30%] border border-gray-300 rounded-lg mt-10 mx-auto p-8 shadow-md mb-20">
        <h2 className="text-2xl font-bold text-center mb-6 text-red-600">Invalid Link</h2>
        <p className="text-center text-gray-600">
          The password reset link is invalid or has expired.
        </p>
        <AppButton
          onClick={() => window.location.href = "/forgot-password"}
          className="w-full mt-4 py-2 px-4"
        >
          Request New Link
        </AppButton>
      </div>
    );
  }

  return (
    <div className="w-[30%] border border-gray-300 rounded-lg mt-10 mx-auto p-8 shadow-md mb-20">
      <h2 className="text-2xl font-bold text-center mb-6">Set New Password</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="password">New Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <AppButton
          type="submit"
          disabled={isPending}
          className="w-full py-2 px-4"
        >
          {isPending ? "Saving..." : "Reset Password"}
        </AppButton>
      </form>
    </div>
  );
};

export default ResetPassword;