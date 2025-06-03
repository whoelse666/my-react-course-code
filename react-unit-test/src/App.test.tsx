import { render, fireEvent, waitFor, renderHook, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import Toggle from "./Toggle";
import useCounter from "./useCounter";
import App from "./App";

test("renders Learn react Link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
  // expect(linkElement).not.toBeNull();
  // expect(document.body.contains(linkElement)).toBe(true);
});

test("renders learn react link 2", () => {
  const { container } = render(<App />);
  const linkElement = container.querySelector(".App-link");
  expect(linkElement?.textContent).toMatch(/learn react/i);
});

test("toggle", async () => {
  let { container } = render(<Toggle />);
  expect(container.querySelector("p")?.textContent).toBe("close");
  act(() => {
    fireEvent.click(container.querySelector("button")!);
  });
  await waitFor(() => expect(container.querySelector("p")?.textContent).toBe("open"), {
    timeout: 3000
  });
});

test('useCounter', async () => {
  const hook = renderHook(() => useCounter(3));

  const [count, increment, decrement]  = hook.result.current;

  act(() => {
    increment(2);
  });
  expect(hook.result.current[0]).toBe(5);

  act(() => {
    decrement(3);
  });
  expect(hook.result.current[0]).toBe(2);

  hook.unmount();
});
