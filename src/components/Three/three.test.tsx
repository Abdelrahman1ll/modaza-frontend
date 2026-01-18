import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import BackgroundEffect from "./three";

// Mock the THREE.js library
vi.mock("three", () => {
  return {
    Scene: function () {
      return {
        add: vi.fn(),
        children: [],
      };
    },
    PerspectiveCamera: function () {
      return {
        position: { z: 0 },
      };
    },
    WebGLRenderer: function () {
      return {
        domElement: document.createElement("canvas"),
        setSize: vi.fn(),
        render: vi.fn(),
        dispose: vi.fn(),
      };
    },
    BufferGeometry: function () {
      return {
        setAttribute: vi.fn(),
        dispose: vi.fn(),
      };
    },
    BufferAttribute: vi.fn(),
    PointsMaterial: function () {
      return {
        dispose: vi.fn(),
      };
    },
    Points: function () {
      return {
        rotation: { x: 0, y: 0 },
      };
    },
  };
});

describe("BackgroundEffect Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", async () => {
    // Wrap in act because there might be useEffects state updates (though likely not in this simple component)
    // but good practice if it modifies DOM or state.
    // For this simple case, just render is fine.
    const { container } = render(<BackgroundEffect />);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("fixed inset-0 -z-10");
  });

  it("initializes THREE.js scene and renderer", async () => {
    render(<BackgroundEffect />);

    // Check if canvas is in the DOM
    const canvas = document.querySelector("canvas");
    expect(canvas).toBeInTheDocument();
  });
});
