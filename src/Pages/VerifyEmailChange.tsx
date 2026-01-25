import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle, Mail } from "lucide-react";
import AppButton from "../Components/Ui/AppButton";
import routers from "../Constants/routers";
import useVerifyEmailChange from "../Hooks/useVerifyEmailChange";

const VerifyEmailChangePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const {
    mutate: verifyEmailChange,
    isSuccess,
    isError,
    error,
    isPending: isLoading,
  } = useVerifyEmailChange();

  useEffect(() => {
    if (token) {
      verifyEmailChange(token);
    }
  }, [token, verifyEmailChange]);

  const handleGoToSettings = () => {
    navigate(routers.personalData);
  };

  const handleGoToLogin = () => {
    navigate(routers.login);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-orange-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your new email...</p>
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
    <div className="min-h-screen bg-gradient-to-br mt-40 from-white to-orange-50 flex items-center justify-center p-4">
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
            {isSuccess ? "✅ Email Changed!" : "❌ Verification Failed"}
          </h1>

          <p className="text-gray-600 leading-relaxed">
            {isSuccess
              ? "Your email address has been successfully updated!"
              : errorMessage}
          </p>
        </div>

        {isSuccess ? (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 justify-center">
              <Mail className="w-4 h-4 text-green-600" />
              <p className="text-sm text-green-700">
                You can now use your new email to log in
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mb-6">
            The verification link may have expired. Please try changing your email again.
          </p>
        )}

        <AppButton
          onClick={isSuccess ? handleGoToSettings : handleGoToLogin}
          className="w-full py-3"
        >
          {isSuccess ? "Go to Settings" : "Go to Login"}
        </AppButton>
      </div>
    </div>
  );
};

export default VerifyEmailChangePage;