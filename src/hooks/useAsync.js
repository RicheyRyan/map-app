import noop from "lodash/noop";
import { useState, useRef, useEffect } from "react";

export const state = {
  pending: "pending",
  loading: "loading",
  complete: "complete",
};

const useAsync = ({ asyncFn, params }) => {
  const makeCall = useRef(noop);
  const [response, setResponse] = useState({});
  const [status, setStatus] = useState(state.pending);

  useEffect(() => {
    let mounted = true;
    makeCall.current = async () => {
      setStatus(state.loading);
      const data = await asyncFn(params);
      if (mounted) {
        setResponse(data);
        setStatus(state.complete);
      }
    };
    makeCall.current();
    return () => {
      setStatus(state.pending);
      mounted = false;
      makeCall.current = () => {};
    };
  }, [asyncFn, params]);
  return { status, ...response };
};
export default useAsync;
