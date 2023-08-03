import { useRollbar } from "@rollbar/react";
import { useMemo } from "react";
import { ENV } from "../config/constants";

export const useLogger = (context) => {
  if (!context) {
    throw new Error("Logger context is required on useLogger hook");
  }

  const rollbar = useRollbar();

  const error = (error, data = {}) => {
    rollbar.error(context, error, data);
    if (ENV.IS_DEVELOPMENT) console.error(error);
  };

  return useMemo(
    () => ({ error }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};
