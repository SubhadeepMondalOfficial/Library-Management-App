import { useRoutes } from "react-router-dom";
import { openRoutes } from "./openRoutes";
import { protectedRoutes } from "./protectedRoutes";

export const AppRoutes = () => {
  const routes = [...openRoutes, ...protectedRoutes];

  return useRoutes(routes);
};
