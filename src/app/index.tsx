import { Provider } from "react-redux";
import { AppRouter } from "./router/AppRouter";
import { store } from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
      main app
    </Provider>
  );
};

export default App;
