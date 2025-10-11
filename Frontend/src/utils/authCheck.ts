import axios from "axios";
import { API_BASE_URL } from "../config/env";

export const verifyToken = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return { valid: false };
  }

  try {
    const res = await axios.get(`${API_BASE_URL}/v1/auth/verify-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { valid: true, user: res.data.user };
  } catch (error) {
    console.error("Token Verification failed: ", error);
    return { valid: false };
  }
};
