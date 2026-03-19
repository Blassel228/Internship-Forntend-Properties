import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import AppButton from "../Components/Ui/AppButton.tsx";
import routers from "../Constants/routers.tsx";
import useVerifyAndCreate from "../Hooks/useVerifyAndCreate.tsx";

const VerificationConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const {
    mutate: verifyAndCreate,
    isSuccess,
    isError,
    error,
    isPending: isLoading,
  } = useVerifyAndCreate();

  useEffect(() => {
    if (token) {
      verifyAndCreate(token);
    }
  }, [token]);

  const handleGoToLogin = () => {
    navigate(routers.login);
  };

  const handleGoToRegister = () => {
    navigate(routers.register);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-orange-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your email...</p>
        </div>
      </div>
    );
  }

  const errorMessage =
    isError
      ? (error as any)?.response?.data?.detail ||
        "Invalid or expired verification link."
      : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <div className="mb-6">
          {isSuccess ? (
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          ) : (
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          )}

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {isSuccess ? "✅ Account Created!" : "❌ Verification Failed"}
          </h1>

          <p className="text-gray-600 leading-relaxed">
            {isSuccess
              ? "Your account has been successfully created!"
              : errorMessage}
          </p>
        </div>

        {isSuccess ? (
          <p className="text-sm text-gray-500 mb-6">
            You can now log in with your credentials.
          </p>
        ) : (
          <p className="text-sm text-gray-500 mb-6">
            Please try registering again.
          </p>
        )}

        <AppButton
          onClick={isSuccess ? handleGoToLogin : handleGoToRegister}
          className="w-full py-3"
        >
          {isSuccess ? "Go to Login" : "Go to Register"}
        </AppButton>
      </div>
    </div>
  );
};

export default VerificationConfirmationPage;