import type { RouteObject } from "react-router-dom";
import { ProtectedLayout } from "../layouts/ProtectedLayout";
import { Dashboard } from "../pages/protected/Dashboard";
import { CreateUser } from "../pages/protected/CreateUser";
import { Roles } from "../pages/protected/Roles";
import { Books } from "../pages/protected/Books";
import { Transactions } from "../pages/protected/Transactions";

export const protectedRoutes: RouteObject[] = [
  {
    element: <ProtectedLayout />,
    children: [
      {path: "/dashboard", element: <Dashboard />},
      {path: "/dashboard/create-user", element: <CreateUser />},
      {path: "/dashboard/roles", element: <Roles />},
      {path: "/dashboard/books", element: <Books />},
      {path: "/dashboard/transactions", element: <Transactions />}
    ]
  },
];
