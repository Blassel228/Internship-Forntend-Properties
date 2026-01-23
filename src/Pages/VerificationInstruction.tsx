import routers from "../Constants/routers.tsx";
import AppButton from "../Components/Ui/AppButton.tsx";
import useNavigation from "../Utils/navigate.tsx";

const VerifyEmailInstructionPage: React.FC = () => {
  const { goTo } = useNavigation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Check your email</h2>

      <p className="text-gray-700 text-center mb-6 max-w-md">
        We’ve sent a verification link to your inbox. Please click it to complete your registration.
      </p>

      <AppButton onClick={() => goTo(routers.login)} className="px-6 py-2">
        Go to Login
      </AppButton>
    </div>
  );
};

export default VerifyEmailInstructionPage;
