import { useKeycloak } from "@react-keycloak/web";
import { Routes, Route } from "react-router-dom";
import { NavigationMenu } from "../../features/NavigationMenu/NavigationMenu";
import { Container } from "../../ui/Fields/Fields.styled";
import { useEffect } from "react";
import { getUser } from "../../shared/api/auth";
import { useAppDispatch } from "../store/hooks";
import { setUserId, setUserLogin, setUserToken } from "../store/user/userSlice";
import { IConsentSlice, IUserResponse } from "../../shared/consts/types";
import { UserSettingsConsents } from "../../shared/consts/enums";
import { changeConsent } from "../store/consent/consentSlice";

export const AppRouter = () => {
  const { keycloak } = useKeycloak();
  const dispatch = useAppDispatch();

  const isLoggedIn = keycloak.authenticated;

  const routes = [
    {
      path: "/settings",
      element: <>123</>,
    },
  ];

  useEffect(() => {
    if (process.env.REACT_APP_BACKEND_URL && keycloak.token) {
      const handleSaveUser = (user: IUserResponse) => {
        dispatch(setUserId(user.id));
        dispatch(setUserLogin(user.login));
        dispatch(setUserToken(keycloak.token));

        user.accountConsents.forEach((item) => {
          dispatch(
            changeConsent({
              key: String(
                Object.keys(UserSettingsConsents)[item - 1]
              ) as keyof IConsentSlice,
              value: true,
            })
          );
        });
      };

      getUser(
        process.env.REACT_APP_BACKEND_URL,
        keycloak.token,
        handleSaveUser
      );
    }
  }, [keycloak.token, dispatch]);

  return (
    isLoggedIn && (
      <Container>
        <NavigationMenu onLogout={keycloak.logout} />
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
