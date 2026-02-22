import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Game from "./Game";

// Define mock for unwrap
const mockUnwrap = vi.fn();

// Mock Redux Hook
vi.mock("../../redux/DiscountCodes/apiDiscountCodes", () => ({
  usePostValidateDiscountCodeMutation: vi.fn(() => [
    vi.fn().mockReturnValue({ unwrap: mockUnwrap }), // Returns mutation trigger
    {}, // Result object (not used in this component directly for status)
  ]),
}));

// Mock Framer Motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, onClick, ...props }: any) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("Game Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Default mock implementation for API
    mockUnwrap.mockResolvedValue({
      discountCode: { code: "LIGHTMASTER", discount: 15 },
    });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders the initial game state correctly", () => {
    render(<Game />);

    // Check Static Texts
    expect(
      screen.getByRole("heading", { name: /Stop the Light/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /How to Play/i }),
    ).toBeInTheDocument();

    // Check Level Indicators
    expect(screen.getByText("Level 1 / 3")).toBeInTheDocument();

    // Check Start Button
    const startBtn = screen.getByRole("button", { name: /Start Game/i });
    expect(startBtn).toBeInTheDocument();
  });

  it("calls discount validation API on mount", async () => {
    render(<Game />);
    // API is called in useEffect
    expect(mockUnwrap).toHaveBeenCalled();
  });

  it("starts the game when 'Start Game' is clicked", async () => {
    render(<Game />);

    const startBtn = screen.getByRole("button", { name: /Start Game/i });
    fireEvent.click(startBtn);

    // Button should change to STOP!
    const stopBtn = screen.getByRole("button", { name: /STOP!/i });
    expect(stopBtn).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Start Game/i }),
    ).not.toBeInTheDocument();
  });

  it("handles 'Loss' condition when stopping immediately (outside target)", async () => {
    render(<Game />);

    // Start Game
    fireEvent.click(screen.getByRole("button", { name: /Start Game/i }));

    // Stop Immediately (Position starts at 0, Target is ~40-60)
    // So 0 should be a MISS.
    const stopBtn = screen.getByRole("button", { name: /STOP!/i });
    fireEvent.click(stopBtn);

    // Should show "Missed!" state
    expect(screen.getByText(/Missed!/i)).toBeInTheDocument();
    expect(screen.getByText(/Don't give up, try again/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Try Again/i }),
    ).toBeInTheDocument();
  });

  it("resets game when 'Try Again' is clicked", async () => {
    render(<Game />);

    // Start -> Stop (Loss) -> Try Again
    fireEvent.click(screen.getByRole("button", { name: /Start Game/i }));
    fireEvent.click(screen.getByRole("button", { name: /STOP!/i }));

    const tryAgainBtn = screen.getByRole("button", { name: /Try Again/i });
    fireEvent.click(tryAgainBtn);

    // Should be back to playing state immediately as per logic:
    // Try Again calls `startGame` directly
    expect(screen.getByRole("button", { name: /STOP!/i })).toBeInTheDocument();
  });
});
