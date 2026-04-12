import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthProvider } from "./AuthProvider";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";
import { useContext } from "react";

vi.mock("js-cookie", () => ({
  default: {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn(),
  },
}));

// We no longer mock because it's removed from the source

describe("AuthProvider Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const TestConsumer = () => {
    const { user, initializing, setUser, logout } = useContext(AuthContext);
    if (initializing) return <div data-testid="loading">Loading...</div>;
    return (
      <div>
        <div data-testid="user">{user ? user.firstName : "no user"}</div>
        <button
          data-testid="login-btn"
          onClick={() =>
            setUser({
              user: {
                id: 1,
                firstName: "New User",
                email: "test@example.com",
                role: "user",
                createdAt: new Date().toISOString(),
              },
              accessToken: "token",
            })
          }
        >
          Login
        </button>
        <button data-testid="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    );
  };

  it("initializes with null user if no cookie exists", async () => {
    vi.mocked(Cookies.get).mockReturnValue(undefined as any);

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );

    expect(screen.getByTestId("user")).toHaveTextContent("no user");
  });

  it("initializes with user from cookie if it exists (plain JSON)", async () => {
    const mockUser = { user: { id: 1, firstName: "Test" } };
    vi.mocked(Cookies.get).mockReturnValue(JSON.stringify(mockUser) as any);

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );

    expect(screen.getByTestId("user")).toHaveTextContent("Test");
  });

  it("updates state and cookies on setUser (login) with plain JSON", async () => {
    vi.mocked(Cookies.get).mockReturnValue(undefined as any);

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );

    const loginBtn = screen.getByTestId("login-btn");
    await act(async () => {
      loginBtn.click();
    });

    expect(screen.getByTestId("user")).toHaveTextContent("New User");
    
    // Check that Cookies.set was called with a JSON string, not encrypted data
    expect(Cookies.set).toHaveBeenCalledWith(
      "user",
      expect.stringContaining('"firstName":"New User"'),
      expect.any(Object),
    );
  });

  it("clears state and cookies/localStorage on logout", async () => {
    const mockUser = { user: { id: 1, firstName: "Test" } };
    vi.mocked(Cookies.get).mockReturnValue(JSON.stringify(mockUser) as any);
    
    // Mock localStorage
    const clearSpy = vi.spyOn(Storage.prototype, "clear");

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );

    const logoutBtn = screen.getByTestId("logout-btn");
    await act(async () => {
      logoutBtn.click();
    });

    expect(screen.getByTestId("user")).toHaveTextContent("no user");
    expect(Cookies.remove).toHaveBeenCalledWith("user");
    expect(clearSpy).toHaveBeenCalled();
  });
});
