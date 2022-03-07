import { useReducer } from "react";

const useFilter = (initialState) => {
  const reducer = (state, action) => ({
    ...state,
    [action.type]: action.value,
  });
  const [filterState, dispatch] = useReducer(reducer, initialState);
  const filterActions = {
    change(type, e) {
      dispatch({
        type,
        value: e.target.value,
      });
    },
  };
  return {
    filterState,
    filterActions,
  };
};

export default useFilter;
