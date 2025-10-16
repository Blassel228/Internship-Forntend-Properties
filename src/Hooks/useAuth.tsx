import {
  clearAuthorizedUser,
  setAuthorizedUser,
  setAuthorizedUserImage,
} from "../Store/slices/authorizedUserSlice";
import { loginGetToken, loginGetUserByToken } from "../Api/apiAuth.tsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeItem, setItem } from "../Utils/localstorage.tsx";
import { Token } from "../Types/Token.tsx";
import { User } from "../Types/User.tsx";
import { getImage } from "../Api/apiImage.tsx";
import { ImageGet } from "../Types/Image.tsx";

export default function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function login(username: string, password: string): Promise<void> {
    try {
      const response: Token = await loginGetToken(username, password);
      const token = response.access_token;

      const user: User = await loginGetUserByToken(token);
      setItem("token", token);
      dispatch(setAuthorizedUser(user));

      const image: ImageGet = await getImage();
      console.log("IMAGE:", image);
      console.log("IMAGE_DATA", image?.image_data && image?.image_data);

      if (image?.image_data) {
        dispatch(setAuthorizedUserImage({ image_data: image.image_data }));
      }
    } catch (error) {
      console.error("Login error:", error);
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
