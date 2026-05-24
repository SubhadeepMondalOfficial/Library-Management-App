import axios from "axios";
import { API_BASE_URL } from "../config/env";

export const logoutUser = async () => {
  try {
    await axios.post(
      `${API_BASE_URL}/v1/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    return true;
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
};