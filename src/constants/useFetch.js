import { useCallback, useReducer, useState } from "react";
import fetching from "./fetching";

function reducerFunc(state, action) {
  switch (action.type) {
    case "success":
      return {
        ...state,
        data: action.data,
        error: false,
        errorMessage : action.errorMessage
      };
    case "existing":
      return {
        ...state,
        error: true,
        errorMessage: action.errorMessage,
      };
    case "error":
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}

export const useFetch = (method, path) => {
  const [state, dispatch] = useReducer(reducerFunc, {
    data: null,
    error: null,
    errorMessage: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchAPI = useCallback(
    async (databody) => {
      setIsLoading(true); // Show loader
      try {
        const response = await fetching(method, path, databody);

        if (response.status === 402) {
          dispatch({
            type: "existing",
            errorMessage: response.data.result.mes,
          });
        } else if (response.status === 200) {
          dispatch({ type: "success", data: response.data,  errorMessage: response.status, });
        } else {
          dispatch({ type: "error", error: `${response.status}:${error.message}`});
        }
      } catch (error) {
        dispatch({ type: "error", error: error.message });
      } finally {
        setIsLoading(false);
      }
    },
    [method, path]
  );

  return {
    data: state.data,
    error: state.error,
    errorMessage: state.errorMessage,
    loading: isLoading,
    fetchAPI,
  };
};
