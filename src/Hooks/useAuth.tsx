import {
  clearAuthorizedUser,
  setAuthorizedUser,
} from "../Store/slices/authorizedUserSlice";
import { loginGetToken, loginGetUserByToken } from "../Api/apiAuth.tsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {getItem, removeItem, setItem} from "../Utils/localstorage.tsx";
import { Token } from "../Types/Token.tsx";
import { User } from "../Types/User.tsx";

export default function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function login(
    username_or_email: string,
    password: string,
  ): Promise<void> {
    const response: Token = await loginGetToken(username_or_email, password);
    const token = response.access_token;

    const user: User = await loginGetUserByToken(token);
    setItem("token", token);
    console.log("USER: ", user)
    dispatch(setAuthorizedUser(user));
  }

  async function logout() {
    removeItem("token");
    dispatch(clearAuthorizedUser());
    navigate("/login");
  }

  function isAuthenticated() {
    const token = getItem("token");
    return !!token;
  }

  return { login, logout, isAuthenticated };
}

