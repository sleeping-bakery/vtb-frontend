import { useKeycloak } from "@react-keycloak/web";
import { Settings } from "../../features/Settings/Settings";
import { Routes, Route } from "react-router-dom";
import { NavigationMenu } from "../../features/NavigationMenu/NavigationMenu";
import { Container } from "../../ui/Fields/Fields.styled";

export const AppRouter = () => {
  const { keycloak } = useKeycloak();
  const isLoggedIn = keycloak.authenticated;

  const routes = [
    {
      path: "/settings",
      element: <Settings />,
    },
  ];

  return (
    isLoggedIn && (
      <Container>
        <NavigationMenu />
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path.replace("/", "")}
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
      </Container>
    )
  );
};
