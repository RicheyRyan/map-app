import { renderHook, act } from "@testing-library/react-hooks";
import useAsync from "./useAsync";

describe("useFilter", () => {
  it("returns the expected intial state", async () => {
    let outerResolve;
    const apiResponse = new Promise((resolve) => (outerResolve = resolve));
    const asyncFn = jest.fn(() => apiResponse);
    const { result, waitForNextUpdate } = renderHook(() =>
      useAsync({ asyncFn })
    );

    expect(result.current.status).toBe("loading");
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();

    act(() => outerResolve({ data: "testResponse" }));
    await waitForNextUpdate();
    expect(result.current.status).toBe("complete");
    expect(result.current.data).toBe("testResponse");
    expect(result.current.error).toBeUndefined();
  });
});
