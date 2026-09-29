import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import Login from "../Pages/Login";
import { AuthContext } from "../Context/AuthContext";
import { ToastProvider } from "../Components/UI/Toast";

const mockNavigate = jest.fn();

jest.mock("../Router", () => () => null);
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

const renderLogin = (login = jest.fn()) =>
  render(
    <AuthContext.Provider value={{ login }}>
      <ToastProvider>
        <Login />
      </ToastProvider>
    </AuthContext.Provider>,
  );

beforeEach(() => {
  mockNavigate.mockReset();
});

test("renders the app shell", () => {
  const { container } = render(<App />);

  expect(container.querySelector(".App")).toBeInTheDocument();
});

test("shows required-field errors when the login form is submitted empty", () => {
  renderLogin();

  fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

  expect(screen.getByText("Email is required")).toBeInTheDocument();
  expect(screen.getByText("Password is required")).toBeInTheDocument();
});

test("shows validation errors for an invalid email and a short password", () => {
  renderLogin();

  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: "not-an-email" },
  });
  fireEvent.change(screen.getByLabelText(/^password$/i), {
    target: { value: "123" },
  });
  fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

  expect(screen.getByText("Enter a valid email address")).toBeInTheDocument();
  expect(
    screen.getByText("Password must be at least 6 characters"),
  ).toBeInTheDocument();
});

test("toggles password visibility", () => {
  renderLogin();

  const passwordInput = screen.getByLabelText(/^password$/i);
  expect(passwordInput).toHaveAttribute("type", "password");

  fireEvent.click(screen.getByRole("button", { name: /show password/i }));

  expect(passwordInput).toHaveAttribute("type", "text");
});

test("logs in and navigates to the user list after valid credentials", async () => {
  const login = jest.fn().mockResolvedValue({
    token: "test-token",
    user: { id: 1, name: "Jane Doe" },
  });
  renderLogin(login);

  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: "jane@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/^password$/i), {
    target: { value: "secret123" },
  });
  fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

  await waitFor(() => {
    expect(login).toHaveBeenCalledWith("jane@example.com", "secret123");
    expect(mockNavigate).toHaveBeenCalledWith("/user");
  });
});
