import { enableAllConsent } from "../store/consent/consentSlice";
import { useAppDispatch } from "../store/hooks";

export const AppRouter = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <button
        onClick={() => {
          dispatch(enableAllConsent());
        }}
      >
        1
      </button>
    </div>
  );
};
