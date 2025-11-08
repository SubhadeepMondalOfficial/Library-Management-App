import axios from "axios";
import { API_BASE_URL } from "../config/env";

export const verifyToken = async () => {

  try {
    const res = await axios.get(`${API_BASE_URL}/v1/auth/verify-token`, {
      withCredentials: true
    });

    return { valid: true, user: res.data.user };
  } catch (error) {
    console.error("Token Verification failed: ", error);
    return { valid: false };
  }
};
