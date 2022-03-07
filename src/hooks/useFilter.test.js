import { renderHook, act } from "@testing-library/react-hooks";
import useFilter from "./useFilter";

describe("useFilter", () => {
  it("returns the expected intial state and actions", async () => {
    const { result } = renderHook(() =>
      useFilter({
        day: "monday",
        month: "june",
      })
    );

    expect(result.current.filterState.day).toBe("monday");
    expect(result.current.filterState.month).toBe("june");
  });

  it("updates the filter data as expected", async () => {
    const { result } = renderHook(() =>
      useFilter({
        day: "monday",
        month: "june",
      })
    );

    expect(result.current.filterState.day).toBe("monday");
    expect(result.current.filterState.month).toBe("june");

    act(() => {
      result.current.filterActions.change("day", {
        target: { value: "tuesday" },
      });
      result.current.filterActions.change("month", {
        target: { value: "july" },
      });
    });

    expect(result.current.filterState.day).toBe("tuesday");
    expect(result.current.filterState.month).toBe("july");
  });
});
