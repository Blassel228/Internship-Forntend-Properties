import {
  clearAuthorizedUser,
  setAuthorizedUser,
} from "../Store/slices/authorizedUserSlice";
import { loginGetToken, loginGetUserByToken } from "../Api/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Token } from "../Types/types.tsx";
import { UserGet } from "../Types/types.tsx";
import { removeItem, setItem } from "../Utils/localstorage.tsx";

export default function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function login(username: string, password: string): Promise<void> {
    try {
      const response: Token = await loginGetToken(username, password);
      const token = response.access_token;

      const user: UserGet = await loginGetUserByToken(token);
      setItem("token", token);
      dispatch(setAuthorizedUser(user));

      navigate("/home");
    } catch (error) {
      throw new Error(error.message || "Error logging in");
    }
  }

  async function logout() {
    removeItem("token");
    dispatch(clearAuthorizedUser());
    navigate("/login");
  }

  return { login, logout };
}
