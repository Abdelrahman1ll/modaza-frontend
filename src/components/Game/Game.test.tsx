import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  beforeAll,
} from "vitest";
import Game from "./Game";

// Mock requestAnimationFrame and cancelAnimationFrame
beforeAll(() => {
  global.requestAnimationFrame = vi.fn(
    (cb) => setTimeout(cb, 0) as unknown as number,
  );
  global.cancelAnimationFrame = vi.fn((id) => clearTimeout(id));
  window.requestAnimationFrame = global.requestAnimationFrame;
  window.cancelAnimationFrame = global.cancelAnimationFrame;
});

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  motion: {
    div: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: unknown;
    }) => {
      // Consume unused props to prevent them from hitting the DOM if necessary,
      // or just pass '...props' if valid attributes.
      // For the mock, we can just return a div with children to be safe and simple.
      return <div {...props}>{children}</div>;
    },
    button: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: unknown;
    }) => {
      return <button {...props}>{children}</button>;
    },
  },
}));

describe("Game Component", () => {
  beforeEach(() => {
    // Mock requestAnimationFrame
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) =>
      setTimeout(cb, 16),
    );
    vi.stubGlobal("cancelAnimationFrame", (id: number) => clearTimeout(id));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("renders the initial state correctly", () => {
    render(<Game />);

    expect(screen.getAllByText(/Stop the/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Light/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/How to Play/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Start Game/i }),
    ).toBeInTheDocument();
  });

  it("starts the game when the Start Game button is clicked", async () => {
    render(<Game />);

    const startButton = screen.getByRole("button", { name: /Start Game/i });
    fireEvent.click(startButton);

    // Initial state change should happen immediately
    expect(screen.getByText(/Level 1/i)).toBeInTheDocument();

    // Check if Stop button appears
    expect(
      await screen.findByRole("button", { name: /STOP!/i }),
    ).toBeInTheDocument();

    // Start button should be gone
    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /Start Game/i }),
      ).not.toBeInTheDocument();
    });
  });

  it("advances level when stopped in the target zone", async () => {
    vi.useFakeTimers();
    render(<Game />);

    const startButton = screen.getByRole("button", { name: /Start Game/i });
    fireEvent.click(startButton);

    // Initial position is 0, win zone is 40-60
    // Advance time to move cursor
    await act(async () => {
      vi.advanceTimersByTime(45 * 16); // ~45 frames
    });

    const stopButton = screen.getByRole("button", { name: /STOP!/i });
    fireEvent.click(stopButton);

    expect(screen.getByText(/Perfect! Moving to Level/i)).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText(/Level 2 \/ 3/i)).toBeInTheDocument();
  });

  it("ends the game with LOSS when stopped outside the target zone", async () => {
    // No fake timers needed for immediate stop
    render(<Game />);

    // Start
    fireEvent.click(screen.getByRole("button", { name: /Start Game/i }));

    // For now, let's just checking if button is clickable.
    const stopButton = screen.getByRole("button", { name: /STOP!/i });
    fireEvent.click(stopButton);

    // Stop button disappears on loss
    expect(
      screen.queryByRole("button", { name: /STOP!/i }),
    ).not.toBeInTheDocument();

    expect(await screen.findByText(/Missed!/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Try Again/i }),
    ).toBeInTheDocument();
  });

  it("shows win reward after completing all levels", async () => {
    vi.useFakeTimers();
    render(<Game />);

    const startButton = screen.getByRole("button", { name: /Start Game/i });
    fireEvent.click(startButton);

    // Level 1
    await act(async () => {
      vi.advanceTimersByTime(50 * 16);
    });
    fireEvent.click(screen.getByRole("button", { name: /STOP!/i }));
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    // Level 2
    expect(screen.getByText(/Level 2 \/ 3/i)).toBeInTheDocument();
    await act(async () => {
      vi.advanceTimersByTime(23 * 16);
    });
    fireEvent.click(screen.getByRole("button", { name: /STOP!/i }));
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    // Level 3
    expect(screen.getByText(/Level 3 \/ 3/i)).toBeInTheDocument();
    await act(async () => {
      vi.advanceTimersByTime(16 * 16);
    });
    fireEvent.click(screen.getByRole("button", { name: /STOP!/i }));

    // Win check
    expect(screen.getByText(/Congratulations!/i)).toBeInTheDocument();
    expect(screen.getByText(/LIGHTMASTER5/i)).toBeInTheDocument();
  });
});
