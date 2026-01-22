import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import AppButton from "../Components/Ui/AppButton.tsx";
import routers from "../Constants/routers.tsx";
import { useVerifyEmail } from "../Hooks/useEmail.tsx";

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const {
    mutate: verifyEmailMutation,
    isSuccess,
    isError,
    error,
    isPending: isLoading
  } = useVerifyEmail();

  useEffect(() => {
    if (token) {
      verifyEmailMutation(token);
    }
  }, [token, verifyEmailMutation]);

  const handleGoHome = () => {
    navigate(routers.home);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-orange-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying email...</p>
        </div>
      </div>
    );
  }

  const errorMessage = isError
    ? (error as any)?.response?.data?.detail || "Invalid or expired verification token"
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
            {isSuccess ? "✅ Success!" : "❌ Error"}
          </h1>

          <p className="text-gray-600 leading-relaxed">
            {isSuccess
              ? "Your email has been successfully verified!"
              : errorMessage}
          </p>
        </div>

        {isSuccess ? (
          <p className="text-sm text-gray-500 mb-6">
            You will now receive email notifications about your bookings.
          </p>
        ) : (
          <p className="text-sm text-gray-500 mb-6">
            Please request a new verification link.
          </p>
        )}

        <AppButton
          onClick={handleGoHome}
          className="w-full py-3"
        >
          Go back to homepage
        </AppButton>
      </div>
    </div>
  );
};

export default EmailVerificationPage;