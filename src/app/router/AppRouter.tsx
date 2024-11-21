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
import { Accounts } from "../../features/Accounts/Accounts";
import { PeriodPayment } from "../../features/PeriodPayment/PeriodPayment";
import { UnidentifiedPayment } from "../../features/UnidentifiedPayment/UnidentifiedPayment";
import { Services } from "../../features/Services/Services";
import { Guarantees } from "../../features/Guarantees/Guarantees";
import { LoanCalculator } from "../../features/LoanCalculator/LoanCalculator";
import { InstallmentPlanList } from "../../components/InstallmentPlanList/InstallmentPlanList";
import { Operations } from "../../features/Operations/Operations";
import { Investments } from "../../features/Investments/Investments";
import { Contributions } from "../../features/Contributions/Contributions";
import ChatFloatButton from "../../ui/ChatFloatButton/ChatFloatButton";

export const AppRouter = () => {
  const { keycloak } = useKeycloak();
  const dispatch = useAppDispatch();

  const isLoggedIn = keycloak.authenticated;

  const routes = [
    {
      path: "/period-payments",
      element: <PeriodPayment />,
    },
    {
      path: "/accounts",
      element: <Accounts />,
    },
    {
      path: "/unidentified-payment",
      element: <UnidentifiedPayment />,
    },
    {
      path: "/services",
      element: <Services />,
    },
    {
      path: "/guarantee",
      element: <Guarantees />,
    },
    {
      path: "/loan-calculator",
      element: <LoanCalculator />,
    },
    {
      path: "/installment-plan-list",
      element: <InstallmentPlanList />,
    },
    {
      path: "/operations",
      element: <Operations />,
    },
    {
      path: "/operations",
      element: <Operations />,
    },
    {
      path: "/investments",
      element: <Investments />,
    },
    {
      path: "/contributions",
      element: <Contributions />,
    },
    {
      path: "*",
      element: <Accounts />,
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
      <>
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
        <ChatFloatButton />
      </>
    )
  );
};
