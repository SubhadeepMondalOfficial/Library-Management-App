import type { RouteObject } from "react-router-dom";
import { HomePage } from "../pages/open/Home";
import { LoginPage } from "../pages/open/Login";
import { OpenLayout } from "../layouts/OpenLayout";
import { OtpPage } from "../pages/open/Otp";

export const openRoutes: RouteObject[] = [
  {
    element: <OpenLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      // { path: "/otp", element: <OtpPage />}
    ],
  },
  {
    element: <OtpPage />,
    path: "login/verify-otp"
  }
];
