import { useKeycloak } from "@react-keycloak/web";

export const AppRouter = () => {
  const { keycloak } = useKeycloak();
  const isLoggedIn = keycloak.authenticated;

  return isLoggedIn && <></>;
};
