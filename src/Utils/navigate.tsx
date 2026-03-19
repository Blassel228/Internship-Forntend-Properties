import { NavigateOptions, useNavigate } from "react-router-dom";

const useNavigation = () => {
  const navigate = useNavigate();

  function goTo(path: string, options?: NavigateOptions | undefined) {
    navigate(path, options);
  }

  const goBack = () => {
    navigate(-1);
  };

  const replace = (path: string) => {
    navigate(path, { replace: true });
  };

  return { goTo, goBack, replace };
};

export default useNavigation;
