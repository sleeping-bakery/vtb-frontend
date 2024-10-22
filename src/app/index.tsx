import { Provider } from "react-redux";
import { AppRouter } from "./router/AppRouter";
import { store } from "./store/store";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";

const App = () => {
  return (
    <Provider store={store}>
      <ReactKeycloakProvider authClient={keycloak}>
        <ConfigProvider>
          <BrowserRouter basename="/">
            <AppRouter />
          </BrowserRouter>
        </ConfigProvider>
      </ReactKeycloakProvider>
    </Provider>
  );
};

export default App;
